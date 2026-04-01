'use client';

import Link from 'next/link';
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'How it Works', href: '/how-it-works' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
  ],
  forSeekers: [
    { label: 'Search PGs', href: '/search' },
    { label: 'Featured Cities', href: '/cities' },
    { label: 'Safety Tips', href: '/safety-tips' },
    { label: 'Tenant Guide', href: '/tenant-guide' },
  ],
  forOwners: [
    { label: 'List Your PG', href: '/owner/listings/new' },
    { label: 'Owner Dashboard', href: '/owner/dashboard' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Owner Resources', href: '/owner-resources' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Report Issue', href: '/report' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: <FiFacebook className="w-5 h-5" />, href: 'https://facebook.com', label: 'Facebook' },
  { icon: <FiTwitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <FiInstagram className="w-5 h-5" />, href: 'https://instagram.com', label: 'Instagram' },
  { icon: <FiLinkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-white">Rentro</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Find your perfect PG accommodation with ease. Trusted by thousands of students and professionals.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:support@rentro.com"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <FiMail className="w-4 h-4" />
                support@rentro.com
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <FiPhone className="w-4 h-4" />
                +91 123 456 7890
              </a>
              <div className="flex items-start gap-2 text-sm">
                <FiMapPin className="w-4 h-4 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Seekers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Seekers</h3>
            <ul className="space-y-2">
              {footerLinks.forSeekers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Owners</h3>
            <ul className="space-y-2">
              {footerLinks.forOwners.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Rentro. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
