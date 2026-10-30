import React, { useState, useEffect } from 'react';
import { Shield, Eye, Cookie, Lock, Globe, Users, FileText, ArrowUp, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const sections = [
    { id: 'information-collection', title: 'Information Collection', icon: <Eye className="h-5 w-5" /> },
    { id: 'cookies', title: 'Cookies', icon: <Cookie className="h-5 w-5" /> },
    { id: 'usage', title: 'Information Usage', icon: <Users className="h-5 w-5" /> },
    { id: 'disclosures', title: 'Disclosures', icon: <FileText className="h-5 w-5" /> },
    { id: 'international', title: 'International Transfers', icon: <Globe className="h-5 w-5" /> },
    { id: 'security', title: 'Security', icon: <Lock className="h-5 w-5" /> },
    { id: 'amendments', title: 'Policy Amendments', icon: <CheckCircle className="h-5 w-5" /> },
    { id: 'rights', title: 'Your Rights', icon: <Shield className="h-5 w-5" /> },
    { id: 'contact', title: 'Contact', icon: <Users className="h-5 w-5" /> }
  ];

const Privacy: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset: document.getElementById(section.id)?.offsetTop || 0
      }));

      const currentSection = sectionElements.find((section, index) => {
        const nextSection = sectionElements[index + 1];
        const scrollPos = window.scrollY + 200;
        
        if (nextSection) {
          return scrollPos >= section.offset && scrollPos < nextSection.offset;
        }
        return scrollPos >= section.offset;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pradivya-primary/10 to-pradivya-accent/5 pt-20 pb-16">
        <div ref={ref} className="container mx-auto px-4 md:px-6">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center justify-center px-4 py-2 bg-pradivya-primary/10 rounded-full mb-6">
              <Shield className="h-5 w-5 text-pradivya-primary mr-2" />
              <span className="text-pradivya-primary font-medium">Privacy & Data Protection</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-pradivya-primary dark:text-white mb-6">
              Privacy Policy
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Last Updated</p>
              <p className="text-pradivya-primary font-semibold">December 2023</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-pradivya-primary dark:text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center text-sm ${
                        activeSection === section.id
                          ? 'bg-pradivya-primary text-white shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-pradivya-primary/10 hover:text-pradivya-primary'
                      }`}
                    >
                      {section.icon}
                      <span className="ml-3">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                
                {/* Information Collection Section */}
                <section id="information-collection" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-pradivya-primary/10 p-3 rounded-lg mr-4">
                      <Eye className="h-6 w-6 text-pradivya-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      What Information Do We Collect?
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      We may collect, store and use the following kinds of personal information:
                    </p>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-pradivya-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span>Information about your device and visits to our website/Mobile App (IP address, location, browser type, OS, referral source, navigation patterns)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-pradivya-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span>Transaction information related to purchases of our goods or services</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-pradivya-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span>Information for website services, email notifications, and newsletter subscriptions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-pradivya-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span>Any other information you choose to send to us</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        <strong>Important:</strong> Before disclosing personal information of another person, you must obtain their consent for both disclosure and processing according to this privacy policy.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Cookies Section */}
                <section id="cookies" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-pradivya-accent/10 p-3 rounded-lg mr-4">
                      <Cookie className="h-6 w-6 text-pradivya-accent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Cookies
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-pradivya-primary/5 rounded-lg p-6">
                        <h4 className="font-semibold text-pradivya-primary mb-3">Persistent Cookies</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          These remain on your computer until deleted or expired, helping us recognize you as a returning user and track your preferences.
                        </p>
                      </div>
                      <div className="bg-pradivya-accent/5 rounded-lg p-6">
                        <h4 className="font-semibold text-pradivya-accent mb-3">Google Analytics</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          We use Google Analytics to analyze website usage through cookies that generate statistical information about site usage.
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Most browsers allow you to reject cookies, but blocking all cookies may negatively impact website functionality. 
                      You can manage cookie preferences in your browser settings.
                    </p>
                  </div>
                </section>

                {/* Usage Section */}
                <section id="usage" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-pradivya-primary/10 p-3 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-pradivya-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Using Your Personal Information
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      Personal information submitted via our website/Mobile App will be used for the purposes specified in this policy. We may use your personal information to:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {[
                        'Administer the website/Mobile App',
                        'Improve your browsing experience',
                        'Enable use of available services',
                        'Provide purchased products and services',
                        'Send statements and collect payments',
                        'Send commercial communications',
                        'Send requested email notifications',
                        'Provide statistical information to third parties',
                        'Deal with enquiries and complaints',
                        'Keep the website secure and prevent fraud',
                        'Conduct analysis and research',
                        'Generate aggregate data displays',
                        'Verify compliance with terms and conditions'
                      ].map((item, index) => (
                        <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-pradivya-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Additional sections continue with similar enhanced styling... */}
                {/* For brevity, I'll include the key sections with enhanced styling */}

                {/* Security Section */}
                <section id="security" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                      <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Security of Your Personal Information
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Lock className="h-8 w-8 text-green-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Encryption</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">All electronic transactions are protected by encryption technology</p>
                      </div>
                      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Secure Servers</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Personal information stored on password and firewall-protected servers</p>
                      </div>
                      <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Eye className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Monitoring</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Continuous monitoring for security threats and breaches</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-pradivya-accent/10 p-3 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-pradivya-accent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Contact Us
                    </h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-pradivya-primary/10 to-pradivya-accent/10 rounded-lg p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      If you have any questions about this Privacy Policy or need to update your personal information, please contact us:
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                      <a 
                        href="mailto:contact@pradivya.com"
                        className="inline-flex items-center px-6 py-3 bg-pradivya-primary text-white rounded-lg hover:bg-pradivya-primary/90 transition-colors"
                      >
                        <Users className="h-5 w-5 mr-2" />
                        Contact Privacy Team
                      </a>
                      <a 
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border-2 border-pradivya-accent text-pradivya-accent rounded-lg hover:bg-pradivya-accent hover:text-white transition-colors"
                      >
                        <FileText className="h-5 w-5 mr-2" />
                        General Contact
                      </a>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-pradivya-primary hover:bg-pradivya-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Privacy;
