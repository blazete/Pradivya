import React from 'react';
import { useInView } from '../hooks/useInView';
import { Train, Factory, Shield, Brain, Waves, Network, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

const Solutions: React.FC = () => {
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: overviewRef, isInView: overviewInView } = useInView({ threshold: 0.1 });
  const { ref: solutionsRef, isInView: solutionsInView } = useInView({ threshold: 0.1 });

  const platformFeatures = [
    {
      icon: Brain,
      title: 'PDMaaS',
      description: 'Predictive Maintenance as a Service with AI-driven analytics and machine learning models for proactive asset management.'
    },
    {
      icon: Waves,
      title: 'Fusion Sensing',
      description: 'Multimodal sensor integration combining vision, acoustic, vibration, thermal, and electrical signature analysis.'
    },
    {
      icon: Network,
      title: 'Edge-AI',
      description: 'Distributed computing architecture enabling real-time processing and instant decision-making at the edge.'
    }
  ];

  const solutions = [
    {
      id: 'ards',
      icon: Train,
      title: 'Rolling Stock Inspection (ARDS)',
      description: 'Advanced Railway Detection System for comprehensive train inspection',
      problem: 'Manual inspections miss 60% of critical defects, causing safety risks and ₹100+ crore annual losses',
      approach: 'AI-powered multimodal fusion technology detects defects in moving trains with computer vision, acoustic analysis, and vibration monitoring',
      benefits: [
        '85% detection accuracy in moving trains',
        '23M+ daily passengers protected',
        '60% reduction in maintenance costs',
        'Real-time alerts and automated reporting'
      ],
      features: [
        'Automated rolling stock inspection',
        'Real-time defect detection',
        'Integration with workshop management',
        'Predictive maintenance scheduling'
      ]
    },
    {
      id: 'wus',
      icon: Factory,
      title: 'Industrial Automation',
      description: 'WUS AI Toolkit with Robotics and AR/VR Integration',
      problem: 'Manufacturing downtime costs $50,000/hour with 70% of failures being preventable through predictive maintenance',
      approach: 'Integrated robotics, AR/VR interfaces, and AI-powered analytics optimize production lines and prevent failures before they occur',
      benefits: [
        '40% improvement in operational efficiency',
        '75% reduction in unplanned downtime',
        '30% improvement in quality standards',
        'ARENA2036 partnership validation'
      ],
      features: [
        'Custom robotics solutions',
        'AR/VR interfaces for maintenance',
        'AI-powered quality control',
        'Predictive analytics platform'
      ]
    },
    {
      id: 'kavach',
      icon: Shield,
      title: 'Workplace Safety (KAVACH)',
      description: 'Comprehensive IoT wearable safety monitoring system',
      problem: 'Industrial accidents cost companies $170B annually with inadequate real-time worker monitoring and emergency response',
      approach: 'Advanced IoT wearable with environmental and biological monitoring, real-time alerts, and emergency response coordination',
      benefits: [
        '75K+ installations across industries',
        '90% faster emergency response time',
        '50% reduction in workplace incidents',
        'Comprehensive worker health monitoring'
      ],
      features: [
        'Environmental monitoring (gas, noise, temperature)',
        'Biological variables tracking',
        'GPS and RFID location tracking',
        'SOS emergency communication',
        'Audio/video logging capabilities'
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="py-16 md:py-24 bg-gradient-to-br from-pradivya-primary to-pradivya-accent text-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-hero-lg md:text-hero-xl mb-6">
              Industrial AI Solutions
            </h1>
            <p className="text-body-lg mb-8">
              Transforming industries with predictive maintenance, intelligent automation, 
              and comprehensive safety solutions powered by multimodal fusion technology.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section 
        ref={overviewRef}
        className="py-16 md:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            overviewInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              Platform Overview
            </h2>
            <p className="text-body-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform combines three core technologies to deliver 
              unparalleled insights and automation capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    overviewInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-pradivya-accent rounded-2xl">
                      <IconComponent size={40} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-pradivya-primary dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section 
        ref={solutionsRef}
        className="py-16 md:py-24 bg-pradivya-neutral dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            solutionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              Our Solutions
            </h2>
            <p className="text-body-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Each solution addresses specific industry challenges with a structured 
              problem-approach-benefits methodology.
            </p>
          </div>

          <div className="space-y-24">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div 
                  key={solution.id}
                  className={`transition-all duration-1000 transform ${
                    solutionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  {/* Solution Header */}
                  <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-pradivya-primary rounded-2xl">
                        <IconComponent size={48} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-pradivya-primary dark:text-white mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                      {solution.description}
                    </p>
                  </div>

                  {/* Solution Images Gallery */}
                  <div className="mb-16">
                    {solution.id === 'ards' && (
                      <div className="space-y-6">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="group relative overflow-hidden bg-gradient-to-br from-pradivya-primary/5 to-pradivya-accent/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-pradivya-primary/10 to-pradivya-accent/10"></div>
                              <div className="text-center z-10">
                                  <img
                                  src="/img/ards.png"
                                  alt="Real-time Detection"
                                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800">
                              <h5 className="font-bold text-pradivya-primary dark:text-white mb-2">Real-time Detection</h5>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">AI-powered system detecting defects in moving trains with 85% accuracy</p>
                            </div>
                          </div>

                          <div className="group relative overflow-hidden bg-gradient-to-br from-pradivya-accent/5 to-pradivya-primary/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-pradivya-accent/10 to-pradivya-primary/10"></div>
                              <div className="text-center z-10">
                                 <img
                                  src="/img/ards1.png"
                                  alt="Advanced Analytics"
                                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                               
                              </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800">
                              <h5 className="font-bold text-pradivya-primary dark:text-white mb-2">Advanced Analytics</h5>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Comprehensive analysis and reporting for maintenance planning</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {solution.id === 'wus' && (
                      <div className="space-y-6">
                       
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <div className="group relative overflow-hidden bg-gradient-to-br from-pradivya-primary/5 to-pradivya-accent/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-pradivya-primary/10 to-pradivya-accent/10"></div>
                              <div className="text-center z-10">
                                    <img
                                  src="/img/ar1.jpg"
                                  alt="Custom Robotics"
                                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-800">
                              <h5 className="font-bold text-pradivya-primary dark:text-white mb-1 text-sm">Custom Robotics</h5>
                              <p className="text-gray-600 dark:text-gray-400 text-xs">Automated manufacturing solutions</p>
                            </div>
                          </div>

                          <div className="group relative overflow-hidden bg-gradient-to-br from-pradivya-accent/5 to-pradivya-primary/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-pradivya-accent/10 to-pradivya-primary/10"></div>
                              <div className="text-center z-10">
                                     <img
                                  src="/img/ar2.jpg"
                                  alt="Quality Assurance"
                                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-800">
                              <h5 className="font-bold text-pradivya-primary dark:text-white mb-1 text-sm">Quality Assurance</h5>
                              <p className="text-gray-600 dark:text-gray-400 text-xs">AI-powered inspection systems</p>
                            </div>
                          </div>

                          <div className="group relative overflow-hidden bg-gradient-to-br from-pradivya-primary/5 to-pradivya-accent/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:col-span-2 lg:col-span-1">
                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-pradivya-primary/10 to-pradivya-accent/10"></div>
                              <div className="text-center z-10">
                                   <img
                                  src="/img/ar.jpg"
                                  alt="Oject Detection"
                                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-800">
                              <h5 className="font-bold text-pradivya-primary dark:text-white mb-1 text-sm">Oject Detection</h5>
                              <p className="text-gray-600 dark:text-gray-400 text-xs">Machine learning insights</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {solution.id === 'kavach' && (
                      <div className="space-y-6">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="group relative overflow-hidden bg-gradient-to-br from-pradivya-primary/5 to-pradivya-accent/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-pradivya-primary/10 to-pradivya-accent/10"></div>
                              <div className="text-center z-10">
                                     <img
                                  src="/img/toolkit2.webp"
                                  alt="Smart Wearables"
                                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800">
                              <h5 className="font-bold text-pradivya-primary dark:text-white mb-2">Smart Wearables</h5>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced IoT devices monitoring worker safety in real-time</p>
                            </div>
                          </div>

                          <div className="group relative overflow-hidden bg-gradient-to-br from-pradivya-accent/5 to-pradivya-primary/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-pradivya-accent/10 to-pradivya-primary/10"></div>
                              <div className="text-center z-10">
                                    <img
                                  src="/img/toolkit1.webp"
                                  alt="Safety Dashboard"
                                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800">
                              <h5 className="font-bold text-pradivya-primary dark:text-white mb-2">Safety Dashboard</h5>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Comprehensive monitoring with 90% faster emergency response</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Problem → Approach → Benefits Flow */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Problem */}
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg mr-3">
                          <AlertTriangle size={24} className="text-red-600 dark:text-red-400" />
                        </div>
                        <h4 className="text-xl font-bold text-red-800 dark:text-red-300">Problem</h4>
                      </div>
                      <p className="text-red-700 dark:text-red-200">
                        {solution.problem}
                      </p>
                    </div>

                    {/* Approach */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-pradivya-accent rounded-lg mr-3">
                          <ArrowRight size={24} className="text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-pradivya-primary dark:text-pradivya-accent">Approach</h4>
                      </div>
                      <p className="text-pradivya-primary dark:text-blue-200">
                        {solution.approach}
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
                          <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
                        </div>
                        <h4 className="text-xl font-bold text-green-800 dark:text-green-300">Benefits</h4>
                      </div>
                      <ul className="space-y-2">
                        {solution.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-green-700 dark:text-green-200">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-white dark:bg-gray-700 rounded-2xl p-8">
                    <h4 className="text-2xl font-bold text-pradivya-primary dark:text-white mb-6 text-center">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {solution.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="flex items-center p-4 bg-pradivya-neutral dark:bg-gray-800 rounded-lg"
                        >
                          <CheckCircle size={20} className="text-pradivya-accent mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pradivya-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Operations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover how our AI-driven solutions can solve your specific industrial challenges 
            with measurable ROI and proven results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          
            <a href="/contact" className="btn-secondary">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
