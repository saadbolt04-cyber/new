import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Phone, Mail, MapPin, Send, Clock, Globe } from 'lucide-react';
import SEOHead from './SEOHead';

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("xrblwwyy"); // Contact us - SFS endpoint
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'sales',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object for Formspree
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('department', formData.department);
    formDataToSubmit.append('message', formData.message);
    formDataToSubmit.append('_subject', `New Contact Form Submission from ${formData.name}`);
    
    // Submit to Formspree
    const result = await handleSubmit(formDataToSubmit);
    
    if (state.succeeded) {
      setFormData({ name: '', email: '', department: 'sales', message: '' });
      alert('Thank you for your message! We\'ll get back to you soon.');
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us | Get in Touch | Saher Flow Solutions"
        description="Contact Saher Flow Solutions in Thuwal, Saudi Arabia. Get expert consultation on multiphase flow measurement technology. Phone: +966 54 286 2009"
        keywords="contact Saher Flow, Thuwal Saudi Arabia, KAUST office, flow measurement consultation, oil gas technology support, multiphase flow meter contact"
        url="/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Saher Flow Solutions",
          "description": "Get in touch with our team of flow measurement experts",
          "url": "https://saherflow.com/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Saher Flow Solutions",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "KAUST, Office 2112, Olayan Building 40",
              "addressLocality": "Thuwal",
              "postalCode": "23955",
              "addressCountry": "SA"
            },
            "telephone": "+966-54-286-2009",
            "email": "contact@saherflow.com"
          }
        }}
      />
    <section id="contact" className="py-24 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-800 dark:from-gray-800 dark:to-gray-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team of experts in Thuwal, Saudi Arabia
          </p>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-4">Send us a message</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your full name"
                    />
                    <ValidationError 
                      prefix="Name" 
                      field="name"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your.email@company.com"
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                     <option value="RFT">Request For Quote</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                  </select>
                  <ValidationError 
                    prefix="Department" 
                    field="department"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent transition-colors duration-200 resize-vertical bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tell us about your project or inquiry..."
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-navy-900 dark:bg-yellow-500 text-white dark:text-navy-900 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-navy-800 dark:hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {state.succeeded && (
                  <div className="bg-green-100 dark:bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center">
                    <p className="text-green-800 dark:text-green-400 font-medium">
                      ✅ Message sent successfully! We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}
                
                {state.errors && state.errors.length > 0 && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-center">
                    <p className="text-red-800 dark:text-red-400 font-medium">
                      ❌ There was an error sending your message. Please try again.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Info - Updated for Saudi Arabia */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <MapPin className="text-yellow-600 dark:text-yellow-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-white mb-1">Headquarters</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        King Abdullah University of Science and Technology (KAUST) Building 1, Office 2204 Thuwal 23955, Saudi Arabia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Phone className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-white mb-1">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-300">+966 12 808 0900</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sun-Thu 8:00 AM - 5:00 PM GMT+3</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Mail className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-white mb-1">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300">contact@saherflow.com</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Clock className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-white mb-1">Business Hours</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Sunday - Thursday: 8:00 AM - 5:00 PM GMT+3<br />
                        Friday - Saturday: Emergency support only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Map - Updated for Saudi Arabia */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-[4/3]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.755308536956!2d39.10441331495915!3d22.30868398532059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c204b74c5c3db3%3A0x3d1c8b0a87d9ba2b!2sKing%20Abdullah%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2ssa!4v1735123456789!5m2!1sen!2ssa"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location - KAUST, Thuwal"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;