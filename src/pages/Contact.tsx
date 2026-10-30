import React, { useState } from 'react';
import { Mail, MapPin, Phone, Globe, Users, Briefcase, MessageCircle, Send, Clock, Building } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Contact: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { ref: mapRef, isInView: mapInView } = useInView({ threshold: 0.1 });
  const { ref: formsRef, isInView: formsInView } = useInView({ threshold: 0.1 });

  const [activeForm, setActiveForm] = useState<'demo' | 'partnership' | 'career'>('demo');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    position: '',
    experience: '',
    partnershipType: '',
    budget: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isSubmitting = false;
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const globalOffices = [
   
    {
      city: 'Noida(Headquarter)',
      country: 'India',
      address: 'C Block, Sector 62, Gautam Buddh Nagar, Noida, Uttar Pradesh, INDIA - 201309',
      phone: '+91-8800408169',
      email: 'contact@pradivya.com',
      timezone: 'IST (UTC+5:30)',
      isHeadquarters: true,
      coordinates: { lat: 28.617791752357764, lng: 77.3674820918256 }
    },
     {
      city: 'Gurgaon ',
      country: 'India',
      address: 'C-277 GF, SUSHANT LOK, PHASE -3, GURGAON SECTOR 45, HARYANA, INDIA - 122003',
      phone: '+91-8800408169',
      email: 'contact@pradivya.com',
      timezone: 'IST (UTC+5:30)',
      isHeadquarters: false,
      coordinates: { lat: 28.448474381126335, lng: 77.06240214291394 }
    }
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (activeForm === 'demo') {
      if (!formData.company.trim()) newErrors.company = 'Company is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    }

    if (activeForm === 'career') {
      if (!formData.position.trim()) newErrors.position = 'Position is required';
      if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    }

    if (activeForm === 'partnership') {
      if (!formData.partnershipType.trim()) newErrors.partnershipType = 'Partnership type is required';
      
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const body = Object.entries(formData).filter(([, value]) => value.trim()).map(([key, value]) => `${key}: ${value}`).join('\n');
    window.location.href = `mailto:contact@pradivya.com?subject=${encodeURIComponent('Pradivya '+activeForm)}&body=${encodeURIComponent(body)}`;
    setSubmitSuccess(true);
  };

  const getFormTitle = () => {
    switch (activeForm) {
      case 'demo': return 'Request a Demo';
      case 'partnership': return 'Partnership Inquiry';
      case 'career': return 'Career Application';
      default: return 'Get in Touch';
    }
  };

  return (
    <div className="pt-20 bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pradivya-primary/10 to-pradivya-accent/5 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-pradivya-primary dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Connect with our team. We're here to help transform your industrial operations with AI.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-pradivya-accent">
                <Clock className="h-5 w-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-pradivya-accent">
                <Globe className="h-5 w-5" />
                <span>Global Presence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices Section */}
      <section ref={ref} className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-12 transition-all duration-700 transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              Our Offices
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Serving Clients Worldwide from Our India Office – Delivering Global Solutions with Local Expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {globalOffices.map((office, index) => (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  office.isHeadquarters ? 'ring-2 ring-pradivya-accent' : ''
                } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {office.isHeadquarters && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pradivya-primary text-white mb-4">
                    <Building className="h-3 w-3 mr-1" />
                    Headquarter
                  </div>
                )}

                <h3 className="text-xl font-bold text-pradivya-primary dark:text-white mb-2">
                  {office.city}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{office.country}</p>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-pradivya-accent mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{office.address}</p>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-pradivya-accent mr-2" />
                    <a href={`tel:${office.phone}`} className="text-gray-700 dark:text-gray-300 text-sm hover:text-pradivya-accent">
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-pradivya-accent mr-2" />
                    <a href={`mailto:${office.email}`} className="text-gray-700 dark:text-gray-300 text-sm hover:text-pradivya-accent">
                      {office.email}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-pradivya-accent mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{office.timezone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map */}
          <div ref={mapRef} className={`bg-gray-50 dark:bg-gray-800 rounded-xl p-8 transition-all duration-700 transform ${
            mapInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-2xl font-bold text-pradivya-primary dark:text-white mb-6 text-center">
              Find Us on the Map
            </h3>
            <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.6576516678706!2d77.06013077544456!3d28.44847409759795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18b82ff4e4ed%3A0x6b7b7b7b7b7b7b7b!2sSector%2045%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1641234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pradivya Office Locations"
                className="rounded-lg"
              ></iframe>

              {/* Overlay with office markers */}
              <div className="relative -mt-96 h-96 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 pointer-events-auto max-w-sm">
                    <h4 className="font-bold text-pradivya-primary dark:text-white mb-2">
                      Our Office Locations
                    </h4>
                    <div className="space-y-2 text-sm">
                      {globalOffices.map((office, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className={`w-3 h-3 rounded-full mt-1 ${
                            office.isHeadquarters ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <div> 
                            <p className="font-medium text-gray-900 dark:text-white">
                              {office.city}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">
                              {office.phone}
                              {office.isHeadquarters && (
                                <span className="text-xs bg-pradivya-accent text-white px-1 py-0.5 rounded ml-1">
                                  HQ
                                </span>
                              )}
                            </p>                         
                            
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => window.open('https://maps.google.com/maps?q=Phase+2,+Industrial+Area,+Sector+62,+Noida,+Uttar+Pradesh', '_blank')}
                      className="mt-3 w-full bg-pradivya-primary hover:bg-pradivya-primary/90 text-white text-xs py-2 px-3 rounded transition-colors"
                    >
                      View in Google Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Forms Section */}
      <section ref={formsRef} className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-12 transition-all duration-700 transform ${
            formsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              How Can We Help?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Choose the type of inquiry that best matches your needs
            </p>
          </div>

          {/* Form Type Selector */}
          <div className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-700 delay-200 transform ${
            formsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button
              onClick={() => setActiveForm('demo')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeForm === 'demo'
                  ? 'bg-pradivya-primary text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Request Demo
            </button>
            <button
              onClick={() => setActiveForm('partnership')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeForm === 'partnership'
                  ? 'bg-pradivya-primary text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              Partnership
            </button>
            <button
              onClick={() => setActiveForm('career')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeForm === 'career'
                  ? 'bg-pradivya-primary text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Briefcase className="h-5 w-5 mr-2" />
              Careers
            </button>
          </div>

          {/* Dynamic Form */}
          <div className={`max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transition-all duration-700 delay-300 transform ${
            formsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-2xl font-bold text-pradivya-primary dark:text-white mb-6">
              {getFormTitle()}
            </h3>

            {submitSuccess ? (
              <div role="status" className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Your email draft is ready. Send it from your email app to complete your request. If your email app did not open, contact contact@pradivya.com.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-pradivya-primary hover:bg-pradivya-primary/90 text-white rounded-lg transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <> <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">This form opens a draft in your email app. Send the draft to complete your inquiry.</p><form id="request" aria-label="Contact request" onSubmit={handleSubmit} className="space-y-6">
                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="contact-name">
                      Full Name *
                    </label>
                    <input autoComplete="name" id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pradivya-accent ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="contact-email">
                      Email Address *
                    </label>
                    <input autoComplete="email" spellCheck={false} id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pradivya-accent ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                      placeholder="your.email@company.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                {/* Form-specific fields */}
                {activeForm === 'demo' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="contact-company">
                        Company *
                      </label>
                      <input autoComplete="organization" id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pradivya-accent ${
                          errors.company ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        placeholder="Your company name"
                      />
                      {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="contact-phone">
                        Phone Number *
                      </label>
                      <input autoComplete="tel" id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pradivya-accent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>
                )}

                {activeForm === 'partnership' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="contact-partnershipType">
                        Partnership Type *
                      </label>
                      <select id="contact-partnershipType"
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pradivya-accent ${
                          errors.partnershipType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                      >
                        <option value="">Select partnership type</option>
                        <option value="technology">Technology Partnership</option>
                        <option value="reseller">Reseller/Distributor</option>
                        <option value="integration">Systems Integration</option>
                        <option value="research">Research Collaboration</option>
                        <option value="investment">Investment Opportunity</option>
                      </select>
                      {errors.partnershipType && <p className="mt-1 text-sm text-red-600">{errors.partnershipType}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="contact-phone">
                        Phone Number *
                      </label>
                      <input autoComplete="tel" id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pradivya-accent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>
                )}

                {activeForm === 'career' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="contact-position">
                        Position of Interest *
                      </label>
                      <input id="contact-position"
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pradivya-accent ${
                          errors.position ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        placeholder="e.g., AI Engineer, Product Manager"
                      />
                      {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="contact-experience">
                        Years of Experience *
                      </label>
                      <select id="contact-experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pradivya-accent ${
                          errors.experience ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                      >
                        <option value="">Select experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="contact-message">
                    Message *
                  </label>
                  <textarea id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pradivya-accent ${
                      errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    placeholder={
                      activeForm === 'demo' ? 'Tell us about your use case and requirements...' :
                      activeForm === 'partnership' ? 'Describe your partnership proposal...' :
                      'Tell us about your background and why you want to join Pradivya...'
                    }
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 bg-pradivya-primary hover:bg-pradivya-primary/90 text-white rounded-lg font-medium transition-all ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      Open email draft
                    </span>
                  )}
                </button>
              </form></>
            )}
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default Contact;