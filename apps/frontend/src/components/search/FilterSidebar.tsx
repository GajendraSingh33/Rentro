'use client';

import { useState, useEffect } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  facets?: SearchFacets;
  onClose?: () => void;
  isMobile?: boolean;
}

export interface FilterState {
  min_rent?: number;
  max_rent?: number;
  room_type?: string;
  gender_preference?: string;
  food_type?: string;
  amenities?: string[];
  available_only?: boolean;
  verified_only?: boolean;
  wifi_included?: boolean;
  visitors_allowed?: boolean;
  sharing_capacity?: number;
}

export interface SearchFacets {
  cities: { value: string; count: number }[];
  room_types: { value: string; count: number }[];
  gender_preferences: { value: string; count: number }[];
  food_types: { value: string; count: number }[];
  rent_ranges: { min: number; max: number; count: number }[];
  amenities: { value: string; count: number }[];
}

const ROOM_TYPES = [
  { value: 'single', label: 'Single Room' },
  { value: 'double', label: 'Double Sharing' },
  { value: 'triple', label: 'Triple Sharing' },
  { value: 'dormitory', label: 'Dormitory' },
];

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'any', label: 'Any Gender' },
];

const FOOD_OPTIONS = [
  { value: 'veg', label: 'Vegetarian' },
  { value: 'non_veg', label: 'Non-Vegetarian' },
  { value: 'both', label: 'Both' },
  { value: 'none', label: 'No Food' },
];

const COMMON_AMENITIES = [
  'WiFi',
  'AC',
  'Parking',
  'Laundry',
  'Gym',
  'Power Backup',
  'CCTV',
  'Water Purifier',
  'TV',
  'Fridge',
  'Geyser',
  'Lift',
];

const RENT_RANGES = [
  { min: 0, max: 5000, label: 'Under ₹5,000' },
  { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
  { min: 10000, max: 15000, label: '₹10,000 - ₹15,000' },
  { min: 15000, max: 20000, label: '₹15,000 - ₹20,000' },
  { min: 20000, max: 30000, label: '₹20,000 - ₹30,000' },
  { min: 30000, max: 999999, label: 'Above ₹30,000' },
];

export function FilterSidebar({
  filters,
  onFilterChange,
  facets,
  onClose,
  isMobile = false,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['rent', 'room_type', 'gender'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleAmenity = (amenity: string) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    updateFilter('amenities', updated);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).some((key) => {
    const value = filters[key as keyof FilterState];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null;
  });

  return (
    <div
      className={`bg-white ${
        isMobile ? 'h-full overflow-y-auto' : 'rounded-lg shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Price Range */}
        <FilterSection
          title="Price Range"
          isExpanded={expandedSections.has('rent')}
          onToggle={() => toggleSection('rent')}
        >
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.min_rent || ''}
                onChange={(e) =>
                  updateFilter('min_rent', e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <span className="py-2">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.max_rent || ''}
                onChange={(e) =>
                  updateFilter('max_rent', e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {RENT_RANGES.map((range) => (
                <button
                  key={range.label}
                  onClick={() => {
                    updateFilter('min_rent', range.min);
                    updateFilter('max_rent', range.max);
                  }}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filters.min_rent === range.min && filters.max_rent === range.max
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Room Type */}
        <FilterSection
          title="Room Type"
          isExpanded={expandedSections.has('room_type')}
          onToggle={() => toggleSection('room_type')}
        >
          <div className="space-y-2">
            {ROOM_TYPES.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="room_type"
                  checked={filters.room_type === type.value}
                  onChange={() => updateFilter('room_type', type.value)}
                  className="text-blue-600"
                />
                <span className="text-sm">{type.label}</span>
                {facets?.room_types && (
                  <span className="text-xs text-gray-400">
                    ({facets.room_types.find((r) => r.value === type.value)?.count || 0})
                  </span>
                )}
              </label>
            ))}
            {filters.room_type && (
              <button
                onClick={() => updateFilter('room_type', undefined)}
                className="text-xs text-blue-600 hover:underline"
              >
                Clear selection
              </button>
            )}
          </div>
        </FilterSection>

        {/* Gender Preference */}
        <FilterSection
          title="Gender Preference"
          isExpanded={expandedSections.has('gender')}
          onToggle={() => toggleSection('gender')}
        >
          <div className="space-y-2">
            {GENDER_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender_preference"
                  checked={filters.gender_preference === option.value}
                  onChange={() => updateFilter('gender_preference', option.value)}
                  className="text-blue-600"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Food Options */}
        <FilterSection
          title="Food Options"
          isExpanded={expandedSections.has('food')}
          onToggle={() => toggleSection('food')}
        >
          <div className="space-y-2">
            {FOOD_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="food_type"
                  checked={filters.food_type === option.value}
                  onChange={() => updateFilter('food_type', option.value)}
                  className="text-blue-600"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection
          title="Amenities"
          isExpanded={expandedSections.has('amenities')}
          onToggle={() => toggleSection('amenities')}
        >
          <div className="flex flex-wrap gap-2">
            {COMMON_AMENITIES.map((amenity) => (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity.toLowerCase())}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  filters.amenities?.includes(amenity.toLowerCase())
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Additional Filters */}
        <FilterSection
          title="Other Filters"
          isExpanded={expandedSections.has('other')}
          onToggle={() => toggleSection('other')}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.available_only || false}
                onChange={(e) => updateFilter('available_only', e.target.checked)}
                className="text-blue-600 rounded"
              />
              <span className="text-sm">Available now</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verified_only || false}
                onChange={(e) => updateFilter('verified_only', e.target.checked)}
                className="text-blue-600 rounded"
              />
              <span className="text-sm">Verified listings only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.wifi_included || false}
                onChange={(e) => updateFilter('wifi_included', e.target.checked)}
                className="text-blue-600 rounded"
              />
              <span className="text-sm">WiFi included</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.visitors_allowed || false}
                onChange={(e) => updateFilter('visitors_allowed', e.target.checked)}
                className="text-blue-600 rounded"
              />
              <span className="text-sm">Visitors allowed</span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2"
      >
        <span className="font-medium text-sm">{title}</span>
        {isExpanded ? (
          <FiChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <FiChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {isExpanded && <div className="pt-2">{children}</div>}
    </div>
  );
}

export default FilterSidebar;
