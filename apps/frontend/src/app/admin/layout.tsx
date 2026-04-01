'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FiGrid,
  FiUsers,
  FiHome,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiShield,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin', icon: <FiGrid className="w-5 h-5" /> },
  { label: 'Users', href: '/admin/users', icon: <FiUsers className="w-5 h-5" /> },
  { label: 'Listings', href: '/admin/listings', icon: <FiHome className="w-5 h-5" /> },
  { label: 'Analytics', href: '/admin/analytics', icon: <FiBarChart2 className="w-5 h-5" /> },
  { label: 'Content', href: '/admin/content', icon: <FiFileText className="w-5 h-5" /> },
  { label: 'Settings', href: '/admin/settings', icon: <FiSettings className="w-5 h-5" /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/login?redirect=/admin');
      return;
    }
    
    if (user && user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [token, user, router]);

  if (!token || (user && user.role !== 'ADMIN')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <FiShield className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600"
          >
            {isSidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <FiShield className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-lg">Admin Panel</span>
        </div>

        <nav className="p-4 space-y-1">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <FiHome className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
