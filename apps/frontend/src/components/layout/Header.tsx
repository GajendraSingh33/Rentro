'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiMenu,
  FiX,
  FiHome,
  FiSearch,
  FiHeart,
  FiUser,
  FiLogIn,
  FiLogOut,
  FiGrid,
  FiSettings,
  FiMessageCircle,
  FiPlusCircle,
  FiShield,
} from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

const publicNavItems: NavItem[] = [
  { label: 'Home', href: '/', icon: <FiHome className="w-5 h-5" /> },
  { label: 'Search PGs', href: '/search', icon: <FiSearch className="w-5 h-5" /> },
];

const seekerNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/seeker/dashboard', icon: <FiGrid className="w-5 h-5" />, roles: ['SEEKER'] },
  { label: 'Favorites', href: '/favorites', icon: <FiHeart className="w-5 h-5" />, roles: ['SEEKER'] },
  { label: 'Inquiries', href: '/seeker/inquiries', icon: <FiMessageCircle className="w-5 h-5" />, roles: ['SEEKER'] },
];

const ownerNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/owner/dashboard', icon: <FiGrid className="w-5 h-5" />, roles: ['OWNER'] },
  { label: 'My Listings', href: '/owner/listings', icon: <FiHome className="w-5 h-5" />, roles: ['OWNER'] },
  { label: 'Add Listing', href: '/owner/listings/new', icon: <FiPlusCircle className="w-5 h-5" />, roles: ['OWNER'] },
  { label: 'Inquiries', href: '/owner/inquiries', icon: <FiMessageCircle className="w-5 h-5" />, roles: ['OWNER'] },
];

const adminNavItems: NavItem[] = [
  { label: 'Admin Panel', href: '/admin', icon: <FiShield className="w-5 h-5" />, roles: ['ADMIN'] },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getNavItems = (): NavItem[] => {
    const items = [...publicNavItems];
    
    if (user?.role === 'SEEKER') {
      items.push(...seekerNavItems);
    } else if (user?.role === 'OWNER') {
      items.push(...ownerNavItems);
    }
    
    if (user?.role === 'ADMIN') {
      items.push(...adminNavItems);
    }
    
    return items;
  };

  const navItems = getNavItems();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-white shadow-md'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">Rentro</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {token ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {user?.first_name?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{user?.first_name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiLogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t my-4 pt-4">
                {token ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                      <FiUser className="w-5 h-5" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                      <FiSettings className="w-5 h-5" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <FiLogOut className="w-5 h-5" />
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                      <FiLogIn className="w-5 h-5" />
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 mt-2"
                    >
                      <FiUser className="w-5 h-5" />
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}

export default Header;
