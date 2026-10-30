import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, FileText, Users, Gavel, ArrowUp, Info, Scale, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const sections = [
    { id: 'overview', title: 'Overview', icon: <Info className="h-5 w-5" /> },
    { id: 'accuracy', title: 'Information Accuracy', icon: <CheckCircle className="h-5 w-5" /> },
    { id: 'sources', title: 'Information Sources', icon: <FileText className="h-5 w-5" /> },
    { id: 'liability', title: 'No Liability for Decisions', icon: <Shield className="h-5 w-5" /> },
    { id: 'advice', title: 'No Legal Advice', icon: <Gavel className="h-5 w-5" /> },
    { id: 'changes', title: 'Changes to Disclaimer', icon: <Scale className="h-5 w-5" /> }
  ];

const Legal: React.FC = () => {
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
            <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
              <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
              <span className="text-orange-600 font-medium">Legal Notice</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-pradivya-primary dark:text-white mb-6">
              Legal Disclaimer
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Important legal information regarding the use of Pradivya's products and services
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Scale className="h-6 w-6 text-pradivya-primary mr-3" />
                <h3 className="text-lg font-semibold text-pradivya-primary dark:text-white">
                  Pradivya Software Pvt Ltd
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                This document serves as a legal disclaimer for all products and services offered by Pradivya Software Pvt Ltd.
              </p>
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
                  Document Sections
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
                
                {/* Quick Reference */}
                <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Key Points
                  </h4>
                  <ul className="text-xs text-orange-600 dark:text-orange-400 space-y-2">
                    <li>• Information subject to change</li>
                    <li>• No guarantee of accuracy</li>
                    <li>• Final decisions by authorities</li>
                    <li>• Not professional advice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                
                {/* Overview Section */}
                <section id="overview" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-pradivya-primary/10 p-3 rounded-lg mr-4">
                      <Info className="h-6 w-6 text-pradivya-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Disclaimer Overview
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Purpose of This Document</h4>
                      <p className="text-blue-600 dark:text-blue-200 text-sm">
                        This legal disclaimer applies to all products and services offered by Pradivya Software Pvt Ltd, 
                        including but not limited to ARDS (Advanced Railway Detection System), WUS AI Toolkit, and KAVACH IoT solutions.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Shield className="h-8 w-8 text-pradivya-primary mx-auto mb-3" />
                        <h4 className="font-semibold text-pradivya-primary mb-2">Legal Protection</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Defines company liability limitations</p>
                      </div>
                      <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Users className="h-8 w-8 text-pradivya-accent mx-auto mb-3" />
                        <h4 className="font-semibold text-pradivya-accent mb-2">User Responsibility</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Clarifies user obligations and risks</p>
                      </div>
                      <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-orange-600 mb-2">Information Use</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Guidelines for information usage</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information Accuracy Section */}
                <section id="accuracy" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Information Accuracy
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 mb-6">
                      <div className="flex items-start">
                        <AlertTriangle className="h-6 w-6 text-yellow-600 mr-4 mt-1" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Important Notice</h4>
                          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-3">
                            Pradivya provides information on various government schemes and technical solutions through our platforms. 
                            While we make every effort to ensure accuracy and timeliness, please note:
                          </p>
                          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                            <li>• Eligibility criteria and details are subject to change</li>
                            <li>• We do not guarantee completeness or accuracy</li>
                            <li>• Information may become outdated</li>
                            <li>• Technical specifications may vary</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-semibold text-pradivya-primary mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Our Commitment
                        </h4>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                          <li>• Regular information updates</li>
                          <li>• Verification from official sources</li>
                          <li>• Quality assurance processes</li>
                          <li>• Timely correction of errors</li>
                        </ul>
                      </div>
                      
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-semibold text-orange-600 mb-4 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          User Responsibility
                        </h4>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                          <li>• Verify information independently</li>
                          <li>• Check with relevant authorities</li>
                          <li>• Stay updated on policy changes</li>
                          <li>• Use information at own discretion</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information Sources Section */}
                <section id="sources" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-pradivya-accent/10 p-3 rounded-lg mr-4">
                      <FileText className="h-6 w-6 text-pradivya-accent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Information Sources
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      The information available on Pradivya platforms is sourced from publicly available data and third-party sources. 
                      We make reasonable efforts to ensure currency and accuracy at the time of publication.
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-4">Source Categories</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Government Sources</h5>
                          <ul className="text-sm text-blue-600 dark:text-blue-200 space-y-1">
                            <li>• Official government websites</li>
                            <li>• Regulatory body publications</li>
                            <li>• Public policy documents</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Technical Sources</h5>
                          <ul className="text-sm text-blue-600 dark:text-blue-200 space-y-1">
                            <li>• Industry standards</li>
                            <li>• Technical specifications</li>
                            <li>• Research publications</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* No Liability Section */}
                <section id="liability" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mr-4">
                      <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      No Liability for Authority Decisions
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
                      <h4 className="font-semibold text-red-700 dark:text-red-300 mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Critical Disclaimer
                      </h4>
                      <p className="text-red-600 dark:text-red-200 text-sm mb-4">
                        The final decision regarding eligibility for government schemes, benefits, or any related matters 
                        is solely at the discretion of the relevant assessing authorities.
                      </p>
                      <div className="bg-white dark:bg-red-800/20 rounded-lg p-4">
                        <p className="text-red-700 dark:text-red-200 text-sm font-medium">
                          Pradivya Software Pvt Ltd is not responsible for decisions made by authorities. 
                          Users acknowledge that any reliance on our information is at their own risk.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* No Legal Advice Section */}
                <section id="advice" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mr-4">
                      <Gavel className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      No Legal Advice
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-4">Professional Advice Recommendation</h4>
                      <p className="text-purple-600 dark:text-purple-200 text-sm mb-4">
                        The information provided on Pradivya platforms is not intended to constitute legal, financial, or professional advice.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">We Recommend</h5>
                          <ul className="text-sm text-purple-600 dark:text-purple-200 space-y-1">
                            <li>• Seek professional advice</li>
                            <li>• Verify with relevant authorities</li>
                            <li>• Consult qualified experts</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Before You</h5>
                          <ul className="text-sm text-purple-600 dark:text-purple-200 space-y-1">
                            <li>• Make important decisions</li>
                            <li>• Submit applications</li>
                            <li>• Invest resources</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Changes Section */}
                <section id="changes" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="bg-pradivya-primary/10 p-3 rounded-lg mr-4">
                      <Scale className="h-6 w-6 text-pradivya-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-pradivya-primary dark:text-white">
                      Changes to This Disclaimer
                    </h2>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      Pradivya Software Pvt Ltd reserves the right to modify, amend, or update this disclaimer at any time without prior notice.
                    </p>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h4 className="font-semibold text-pradivya-primary mb-4">User Responsibility</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                        Users are advised to review this disclaimer periodically for any changes. 
                        Continued use of Pradivya services constitutes acceptance of any modifications.
                      </p>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>By using Pradivya services, users acknowledge they have read, understood, and agreed to this legal disclaimer.</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section className="scroll-mt-24">
                  <div className="bg-gradient-to-r from-pradivya-primary/10 to-pradivya-accent/10 rounded-lg p-8">
                    <h3 className="text-xl font-bold text-pradivya-primary dark:text-white mb-4 flex items-center">
                      <Users className="h-6 w-6 mr-3" />
                      Legal Questions?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      For questions about this disclaimer or legal matters related to our services, please contact our legal team.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                      <a 
                        href="mailto:legal@pradivya.com"
                        className="inline-flex items-center px-6 py-3 bg-pradivya-primary text-white rounded-lg hover:bg-pradivya-primary/90 transition-colors"
                      >
                        <Gavel className="h-5 w-5 mr-2" />
                        Legal Department
                      </a>
                      <a 
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border-2 border-pradivya-accent text-pradivya-accent rounded-lg hover:bg-pradivya-accent hover:text-white transition-colors"
                      >
                        <Users className="h-5 w-5 mr-2" />
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

export default Legal;
