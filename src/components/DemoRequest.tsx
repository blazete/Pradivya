import React, { useState } from 'react';
import { Send, Phone, Mail, Calendar, Star, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const DemoRequest: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    solution: '',
    message: ''
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const isSubmitting = false;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const body = Object.entries(formData).filter(([, value]) => value.trim()).map(([key, value]) => `${key}: ${value}`).join('\n');
    window.location.href = `mailto:contact@pradivya.com?subject=${encodeURIComponent('Pradivya '+'demo inquiry')}&body=${encodeURIComponent(body)}`;
    setSubmitSuccess(true);
  };
  return (
    <section
      id="demo"
      ref={ref}
      className="relative py-20 md:py-32 bg-gradient-to-br from-pradivya-primary via-pradivya-primary to-pradivya-accent overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-pradivya-accent/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-48 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-pradivya-accent/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        {/* Geometric patterns */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 border border-white/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Enhanced Header Section */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Sparkles className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-medium">Experience the Future</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Request a <span className="text-yellow-200">Demo</span>
            </h2>

            <p className="text-xl md:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
              Transform your operations with AI-powered solutions. Get a personalized demonstration
              of our revolutionary ARDS, WUS AI Toolkit, and KAVACH systems.
            </p>

          
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Enhanced Contact Info */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 h-full flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center lg:justify-start">
                  <Phone className="h-8 w-8 mr-4 text-yellow-300" />
                  Get in Touch
                </h3>

                <div className="space-y-8">
                  <div className="group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl mr-6 group-hover:scale-110 transition-transform">
                        <Phone size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">Sales Hotline</p>
                        <p className="text-white/80 hover:text-yellow-300 transition-colors text-lg">+91-880-040-8169</p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-4 bg-gradient-to-br from-pradivya-accent to-teal-500 rounded-2xl mr-6 group-hover:scale-110 transition-transform">
                        <Mail size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">Enterprise Solutions</p>
                        <p className="text-white/80 hover:text-yellow-300 transition-colors text-lg">contact@pradivya.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mr-6 group-hover:scale-110 transition-transform">
                        <Calendar size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">Schedule a Call</p>
                        <p className="text-white/80 text-lg">Available 24/7 for enterprise clients</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Content for Better Balance */}
                  <div className="mt-12 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/20">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Star className="h-6 w-6 mr-3 text-yellow-300" />
                      Instant Demo Available
                    </h4>
                    <p className="text-white/90 leading-relaxed">
                      Get immediate access to our AI solutions showcase. Our expert team is ready to demonstrate how Pradivya can transform your operations.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Enhanced Form Section */}
            <div className="">
              {submitSuccess ? (
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl text-center border border-white/20">
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 mb-6 shadow-lg">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>

                  <h4 className="text-3xl font-bold text-pradivya-primary mb-4">Thank You!</h4>
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    Your email draft is ready. Send it from your email app to complete your request. We aim to respond within
                    <span className="font-semibold text-pradivya-accent"> 24 hours</span> to schedule your personalized demonstration.
                  </p>

                  <div className="bg-gradient-to-r from-pradivya-accent/10 to-pradivya-primary/10 rounded-2xl p-6 mb-8">
                    <h5 className="font-semibold text-pradivya-primary mb-3">What happens next?</h5>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-pradivya-accent rounded-full mr-3"></div>
                        <span>Our solution expert will contact you</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-pradivya-accent rounded-full mr-3"></div>
                        <span>Schedule a personalized demo session</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-pradivya-accent rounded-full mr-3"></div>
                        <span>Discuss your specific requirements</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="group bg-gradient-to-r from-pradivya-primary to-pradivya-accent hover:from-pradivya-primary/90 hover:to-pradivya-accent/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center mx-auto"
                  >
                    <ArrowRight className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-pradivya-primary mb-4">
                      Get Your <span className="text-pradivya-accent">Demo</span>
                    </h3>
                    <p className="text-gray-600">Fill out the form below and we'll show you how our AI solutions can transform your business.</p>
                  </div>

                  <form aria-label="Contact request" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-pradivya-primary font-semibold mb-3 group-focus-within:text-pradivya-accent transition-colors" htmlFor="demo-name">
                          Full Name *
                        </label>
                        <input id="demo-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pradivya-accent focus:border-transparent transition-all duration-300 hover:border-pradivya-accent/50 bg-white/80"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-pradivya-primary font-semibold mb-3 group-focus-within:text-pradivya-accent transition-colors" htmlFor="demo-email">
                          Email Address *
                        </label>
                        <input id="demo-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pradivya-accent focus:border-transparent transition-all duration-300 hover:border-pradivya-accent/50 bg-white/80"
                          placeholder="your@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-pradivya-primary font-semibold mb-3 group-focus-within:text-pradivya-accent transition-colors" htmlFor="demo-company">
                          Company *
                        </label>
                        <input id="demo-company"
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                          className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pradivya-accent focus:border-transparent transition-all duration-300 hover:border-pradivya-accent/50 bg-white/80"
                          placeholder="Your company name"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-pradivya-primary font-semibold mb-3 group-focus-within:text-pradivya-accent transition-colors" htmlFor="demo-phone">
                          Phone Number
                        </label>
                        <input id="demo-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pradivya-accent focus:border-transparent transition-all duration-300 hover:border-pradivya-accent/50 bg-white/80"
                          placeholder="+91 xxx xxx xxxx"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-pradivya-primary font-semibold mb-3 group-focus-within:text-pradivya-accent transition-colors" htmlFor="demo-message">
                        Tell us about your requirements
                      </label>
                      <textarea id="demo-message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pradivya-accent focus:border-transparent transition-all duration-300 hover:border-pradivya-accent/50 bg-white/80 resize-none"
                        placeholder="Describe your specific needs, industry challenges, or questions about our AI solutions..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full bg-gradient-to-r from-pradivya-primary to-pradivya-accent hover:from-pradivya-primary/90 hover:to-pradivya-accent/90 text-white px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Processing Request...
                        </>
                      ) : (
                        <>
                          <Send size={24} className="mr-3 group-hover:translate-x-1 transition-transform" />
                          Open email draft
                          <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoRequest;
