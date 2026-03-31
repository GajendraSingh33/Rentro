'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import Link from 'next/link';

interface Notification {
  id: number;
  type: 'inquiry' | 'response' | 'listing_approved' | 'listing_rejected';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  link?: string;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: () => api.get('/notifications').then((r) => r.data?.data || []),
    refetchInterval: 30000, // Poll every 30 seconds
  });

  const unreadCount = notifications?.filter((n) => !n.read).length || 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              notifications?.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            )}
          </div>
          <div className="p-3 border-t text-center">
            <Link href="/notifications" className="text-indigo-600 text-sm hover:underline">
              View All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const icons = {
    inquiry: '📩',
    response: '💬',
    listing_approved: '✅',
    listing_rejected: '❌',
  };

  return (
    <Link
      href={notification.link || '#'}
      className={`block p-4 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
    >
      <div className="flex gap-3">
        <span className="text-xl">{icons[notification.type]}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${!notification.read ? 'font-semibold' : ''}`}>
            {notification.title}
          </p>
          <p className="text-sm text-gray-500 truncate">{notification.message}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(notification.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
