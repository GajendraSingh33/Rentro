'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

type FAQByCategory = Record<string, FAQ[]>;

export default function FAQPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQByCategory>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const [faqsResponse, categoriesResponse] = await Promise.all([
          axios.get(`${API_URL}/content/faqs`),
          axios.get(`${API_URL}/content/faq-categories`),
        ]);
        setFaqs(faqsResponse.data);
        setCategories(['All', ...categoriesResponse.data]);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load FAQs');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filterFAQs = () => {
    let filtered = faqs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = { [selectedCategory]: faqs[selectedCategory] || [] };
    }

    // Filter by search term
    if (searchTerm) {
      const result: FAQByCategory = {};
      Object.entries(filtered).forEach(([category, items]) => {
        const matchedItems = items.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (matchedItems.length > 0) {
          result[category] = matchedItems;
        }
      });
      return result;
    }

    return filtered;
  };

  const filteredFAQs = filterFAQs();
  const totalFAQs = Object.values(filteredFAQs).reduce((sum, items) => sum + items.length, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            Rentro
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Back
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about Rentro
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {searchTerm && (
          <p className="text-sm text-gray-600 mb-4">
            Found {totalFAQs} {totalFAQs === 1 ? 'result' : 'results'}
          </p>
        )}

        {/* FAQ List */}
        {totalFAQs === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No FAQs found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(filteredFAQs).map(([category, items]) => (
              <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
                </div>
                <div className="divide-y">
                  {items.map((faq) => (
                    <div key={faq.id} className="p-6">
                      <button
                        onClick={() => toggleExpand(faq.id)}
                        className="w-full flex justify-between items-start text-left"
                      >
                        <h3 className="text-base font-medium text-gray-900 flex-1 pr-4">
                          {faq.question}
                        </h3>
                        {expandedItems.has(faq.id) ? (
                          <FiChevronUp className="flex-shrink-0 text-blue-600 mt-1" />
                        ) : (
                          <FiChevronDown className="flex-shrink-0 text-gray-400 mt-1" />
                        )}
                      </button>
                      {expandedItems.has(faq.id) && (
                        <div
                          className="mt-4 text-gray-600 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for? Please get in touch with our support team.
          </p>
          <button
            onClick={() => router.push('/contact')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <button onClick={() => router.push('/terms')} className="hover:text-blue-600">
              Terms & Conditions
            </button>
            <button onClick={() => router.push('/privacy')} className="hover:text-blue-600">
              Privacy Policy
            </button>
            <button onClick={() => router.push('/refund-policy')} className="hover:text-blue-600">
              Refund Policy
            </button>
            <button onClick={() => router.push('/contact')} className="hover:text-blue-600">
              Contact Us
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} Rentro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
