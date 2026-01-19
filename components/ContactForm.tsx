'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle, AlertCircle, Loader2, Mic, X } from 'lucide-react';

interface ContactFormProps {
  initialValues?: {
    name?: string;
    phone?: string;
    message?: string;
    page?: string;
  };
}

const ContactForm: React.FC<ContactFormProps> = ({ initialValues }) => {
  const searchParams = useSearchParams();
  const [showPrefillBanner, setShowPrefillBanner] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse URL params and prefill form
  useEffect(() => {
    const name = searchParams.get('name') || initialValues?.name || '';
    const phone = searchParams.get('phone') || initialValues?.phone || '';
    const message = searchParams.get('message') || initialValues?.message || '';
    const page = searchParams.get('page') || initialValues?.page || '';

    // Determine service from page context
    let service = '';
    if (page) {
      const serviceMatch = page.match(/\/services\/([^/]+)/);
      if (serviceMatch) {
        const serviceSlug = serviceMatch[1];
        // Map URL slugs to form values
        const serviceMap: Record<string, string> = {
          'ac-repair': 'ac-repair',
          'brake-service': 'brakes',
          'brakes': 'brakes',
          'oil-change': 'oil-change',
          'battery': 'battery',
          'car-service': 'car-service',
          'engine': 'engine',
          'electrical': 'electrical',
          'suspension': 'suspension',
          'transmission': 'transmission',
          'tyres': 'tyres',
          'pre-purchase-inspection': 'inspection',
          'fleet': 'fleet',
        };
        service = serviceMap[serviceSlug] || '';
      }
    }

    // Check if any prefill data exists
    const hasPrefillData = name || phone || message;

    if (hasPrefillData) {
      setFormData((prev) => ({
        ...prev,
        name: name || prev.name,
        phone: phone || prev.phone,
        message: message || prev.message,
        service: service || prev.service,
      }));
      setShowPrefillBanner(true);
    }
  }, [searchParams, initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        vehicle: '',
        service: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-500">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Prefill Banner */}
      {showPrefillBanner && (
        <div className="flex items-center gap-3 p-4 bg-power-blue/10 border border-power-blue/20 rounded-xl text-power-blue">
          <Mic className="w-5 h-5 flex-shrink-0" />
          <p className="flex-1 text-sm font-medium">
            Prefilled from Ask Glenn — please check your details.
          </p>
          <button
            type="button"
            onClick={() => setShowPrefillBanner(false)}
            className="text-power-blue/60 hover:text-power-blue transition-colors"
            aria-label="Dismiss prefill notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
            placeholder="050 123 4567"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="vehicle" className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Make & Model</label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
            placeholder="e.g. BMW X5 2020"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">Service Required</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all"
          >
            <option value="">Select a service</option>
            <option value="car-service">Car Service</option>
            <option value="ac-repair">AC Repair</option>
            <option value="oil-change">Oil Change</option>
            <option value="electrical">Electrical Diagnostics</option>
            <option value="brakes">Brake Service</option>
            <option value="suspension">Suspension</option>
            <option value="transmission">Transmission Repair</option>
            <option value="engine">Engine Work</option>
            <option value="battery">Battery Replacement</option>
            <option value="tyres">Tyre Replacement</option>
            <option value="inspection">Pre-Purchase Inspection</option>
            <option value="fleet">Fleet Services</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Tell Us More</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-power-blue focus:border-transparent transition-all resize-none"
          placeholder="Describe the issue or service you need..."
        ></textarea>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-power-red text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={20} className="group-hover:translate-x-1 transition-transform" />
            Send Enquiry
          </>
        )}
      </button>

      <p className="text-sm text-gray-400 text-center">
        Or call us directly at <a href="tel:+971521217425" className="text-power-blue font-semibold hover:underline">052 121 7425</a>
      </p>
    </form>
  );
};

export default ContactForm;
