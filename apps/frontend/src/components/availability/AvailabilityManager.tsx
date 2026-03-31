'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/services/api';

interface Room {
  id: number;
  room_number: string;
  total_beds_in_room: number;
  available_beds_in_room: number;
  status: 'available' | 'occupied' | 'maintenance';
  price_per_bed?: number;
}

interface AvailabilityManagerProps {
  listingId: number;
}

export default function AvailabilityManager({ listingId }: AvailabilityManagerProps) {
  const queryClient = useQueryClient();
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({ room_number: '', total_beds: 1 });

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['availability', listingId],
    queryFn: () => api.get(`/listings/${listingId}/availability`).then((r) => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ roomNumber, data }: { roomNumber: string; data: Partial<Room> }) =>
      api.put(`/listings/${listingId}/availability/${roomNumber}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability', listingId] });
      toast.success('Updated!');
    },
    onError: () => toast.error('Failed to update'),
  });

  const addRoomMutation = useMutation({
    mutationFn: (data: { room_number: string; total_beds: number }) =>
      api.put(`/listings/${listingId}/availability/rooms`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability', listingId] });
      toast.success('Room added!');
      setIsAddingRoom(false);
      setNewRoom({ room_number: '', total_beds: 1 });
    },
    onError: () => toast.error('Failed to add room'),
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading availability...</div>;
  }

  const totalBeds = rooms?.reduce((sum: number, r: Room) => sum + r.total_beds_in_room, 0) || 0;
  const availableBeds = rooms?.reduce((sum: number, r: Room) => sum + r.available_beds_in_room, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{rooms?.length || 0}</p>
            <p className="text-sm text-gray-500">Rooms</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{availableBeds}</p>
            <p className="text-sm text-gray-500">Available Beds</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">{totalBeds}</p>
            <p className="text-sm text-gray-500">Total Beds</p>
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className="space-y-3">
        {rooms?.map((room: Room) => (
          <RoomCard
            key={room.id}
            room={room}
            onUpdate={(data) => updateMutation.mutate({ roomNumber: room.room_number, data })}
            isUpdating={updateMutation.isPending}
          />
        ))}
      </div>

      {/* Add Room */}
      {isAddingRoom ? (
        <div className="border rounded-lg p-4 bg-white">
          <h4 className="font-medium mb-4">Add New Room</h4>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Room number (e.g., A1)"
              value={newRoom.room_number}
              onChange={(e) => setNewRoom({ ...newRoom, room_number: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Number of beds"
              value={newRoom.total_beds}
              onChange={(e) => setNewRoom({ ...newRoom, total_beds: parseInt(e.target.value) || 1 })}
              min={1}
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => addRoomMutation.mutate(newRoom)}
              disabled={!newRoom.room_number || addRoomMutation.isPending}
              className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              Add Room
            </button>
            <button
              onClick={() => setIsAddingRoom(false)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingRoom(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-500 hover:text-indigo-500"
        >
          + Add Room
        </button>
      )}
    </div>
  );
}

function RoomCard({
  room,
  onUpdate,
  isUpdating,
}: {
  room: Room;
  onUpdate: (data: Partial<Room>) => void;
  isUpdating: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [available, setAvailable] = useState(room.available_beds_in_room);

  const statusColors = {
    available: 'bg-green-100 text-green-700',
    occupied: 'bg-red-100 text-red-700',
    maintenance: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-medium">Room {room.room_number}</span>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${statusColors[room.status]}`}>
            {room.status}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {room.available_beds_in_room}/{room.total_beds_in_room} beds available
        </div>
      </div>

      {editing ? (
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAvailable(Math.max(0, available - 1))}
              className="w-8 h-8 rounded-full border flex items-center justify-center"
            >
              -
            </button>
            <span className="w-8 text-center">{available}</span>
            <button
              onClick={() => setAvailable(Math.min(room.total_beds_in_room, available + 1))}
              className="w-8 h-8 rounded-full border flex items-center justify-center"
            >
              +
            </button>
          </div>
          <select
            onChange={(e) => onUpdate({ status: e.target.value as Room['status'] })}
            className="px-3 py-1 border rounded"
            defaultValue={room.status}
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <button
            onClick={() => {
              onUpdate({ available_beds_in_room: available });
              setEditing(false);
            }}
            disabled={isUpdating}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
          >
            Save
          </button>
          <button onClick={() => setEditing(false)} className="px-3 py-1 border rounded text-sm">
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mt-2 text-sm text-indigo-600 hover:underline"
        >
          Edit availability
        </button>
      )}
    </div>
  );
}
