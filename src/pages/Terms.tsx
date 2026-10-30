import React, { useState, useEffect } from 'react';
import { FileText, UserCheck, CreditCard, Shield, AlertTriangle, ArrowUp, Scale, Users, Lock } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const sections = [
    { id: 'introduction', title: 'Introduction', icon: <FileText className="h-5 w-5" /> },
    { id: 'registration', title: 'Registration', icon: <UserCheck className="h-5 w-5" /> },
    { id: 'refunds', title: 'Refunds & Cancellation', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'liability', title: 'Limitation of Liability', icon: <Shield className="h-5 w-5" /> },
    { id: 'termination', title: 'Account Termination', icon: <AlertTriangle className="h-5 w-5" /> },
    { id: 'changes', title: 'Changes to Terms', icon: <Scale className="h-5 w-5" /> }
  ];

const Terms: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

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
              <Scale className="h-5 w-5 text-pradivya-primary mr-2" />
              <span className="text-pradivya-primary font-medium">Legal Terms</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-pradivya-primary dark:text-white mb-6">
              Terms and Conditions
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Please read these terms carefully before using our website and services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Effective Date</p>
                <p className="text-pradivya-primary font-semibold">December 2023</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Version</p>
                <p className="text-pradivya-primary font-semibold">2.1</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Updated</p>
                <p className="text-pradivya-primary font-semibold">Dec 15, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-pradivya-primary dark:text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Quick Navigation
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
                
                {/* Key Points Summary */}
                <div className="mt-8 p-4 bg-pradivya-accent/10 rounded-lg">
                  <h4 className="font-semibold text-pradivya-accent mb-3">Key Points</h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• Must be 13+ to use service</li>
                    <li>• 7-9 day refund policy</li>
                    <li>• Account security requirements</li>
                    <li>• Terms may be updated</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                
                {/* Introduction Section */}
                <section id="introduction" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-pradivya-primary/10 p-3 rounded-lg mr-4">
                      <FileText className="h-6 w-6 text-pradivya-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Introduction
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Agreement Overview</h4>
                      <p className="text-blue-600 dark:text-blue-200 text-sm mb-3">
                        These terms govern your use of www.pradivya.com (the "Website"). By using our website, you agree to these terms in full.
                      </p>
                      <p className="text-blue-600 dark:text-blue-200 text-sm">
                        If you disagree with any part of these terms, please do not register, subscribe, or use the Website.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center mb-4">
                          <Users className="h-6 w-6 text-pradivya-primary mr-3" />
                          <h4 className="font-semibold text-pradivya-primary">Age Requirements</h4>
                        </div>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                          <li>• Must be over 13 years to use the Website</li>
                          <li>• Must be over 18 for additional premium features</li>
                          <li>• Parental consent required for minors</li>
                        </ul>
                      </div>
                      
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center mb-4">
                          <Lock className="h-6 w-6 text-pradivya-accent mr-3" />
                          <h4 className="font-semibold text-pradivya-accent">Data & Cookies</h4>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          By using the Website, you consent to our use of cookies in accordance with our Privacy Policy.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Notice</h4>
                          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                            We make no claims regarding emotional, health, or commercial benefits. Our information is not a substitute for professional advice. 
                            The English version is the official text - translations are not legally binding.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Registration Section */}
                <section id="registration" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-pradivya-accent/10 p-3 rounded-lg mr-4">
                      <UserCheck className="h-6 w-6 text-pradivya-accent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Registration & Account Security
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-pradivya-primary">Registration Requirements</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-pradivya-accent rounded-full mt-2 mr-3"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Provide accurate and complete personal information</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-pradivya-accent rounded-full mt-2 mr-3"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Keep information updated at all times</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-pradivya-accent rounded-full mt-2 mr-3"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Only one registration per person allowed</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-pradivya-primary">Password Security</h4>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                          <p className="text-red-700 dark:text-red-300 text-sm mb-2">
                            <strong>Critical:</strong> Keep your password confidential and never share it.
                          </p>
                          <p className="text-red-600 dark:text-red-400 text-xs">
                            Contact contact@pradivya.com immediately if you suspect unauthorized access.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Refunds Section */}
                <section id="refunds" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                      <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Refunds & Cancellation Policy
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                        <h4 className="font-semibold text-green-700 dark:text-green-300">7-9 Day Refund Window</h4>
                      </div>
                      <p className="text-green-600 dark:text-green-200 text-sm mb-4">
                        We offer refunds within 7-9 days of purchase for digital content, subject to the conditions below.
                      </p>
                      <div className="text-sm text-green-600 dark:text-green-200">
                        <strong>Note:</strong> For subscription services, only the last payment can be refunded.
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-pradivya-primary flex items-center">
                          <Shield className="h-5 w-5 mr-2" />
                          Refund Requirements
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <li>• Delete all copies of downloaded content</li>
                          <li>• Provide warranty of non-sharing</li>
                          <li>• Submit request within timeframe</li>
                          <li>• No previous refund requests</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-red-600 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Non-Refundable Items
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <li>• Gift codes and vouchers</li>
                          <li>• Custom orders</li>
                          <li>• Products with evidence of sharing</li>
                          <li>• Fraudulent payment claims</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Additional sections would continue with similar enhanced styling */}
                
                {/* Contact Section */}
                <section id="contact" className="scroll-mt-24">
                  <div className="bg-gradient-to-r from-pradivya-primary/10 to-pradivya-accent/10 rounded-lg p-8">
                    <h3 className="text-xl font-bold text-pradivya-primary dark:text-white mb-4">
                      Questions About These Terms?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      If you have any questions about these Terms and Conditions, please contact our legal team.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                      <a 
                        href="mailto:legal@pradivya.com"
                        className="inline-flex items-center px-6 py-3 bg-pradivya-primary text-white rounded-lg hover:bg-pradivya-primary/90 transition-colors"
                      >
                        <Scale className="h-5 w-5 mr-2" />
                        Legal Team
                      </a>
                      <a 
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border-2 border-pradivya-accent text-pradivya-accent rounded-lg hover:bg-pradivya-accent hover:text-white transition-colors"
                      >
                        <Users className="h-5 w-5 mr-2" />
                        General Support
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

export default Terms;
