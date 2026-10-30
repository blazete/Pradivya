import React, { useState } from 'react';
import { Train, Factory, Car, TrendingUp, Shield } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const UseCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState('railways');
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: casesRef, isInView: casesInView } = useInView({ threshold: 0.1 });
  const { ref: testimonialsRef, isInView: testimonialsInView } = useInView({ threshold: 0.1 });

  const useCases = {
    railways: {
      title: 'Railway Operations',
      icon: Train,
      painPoint: 'Manual train inspections miss 60% of critical defects, leading to safety risks and unexpected breakdowns costing ₹100+ crores annually.',
      solution: 'ARDS (Advanced Railway Detection System) uses AI-powered multimodal fusion to automatically detect defects in moving trains with 85% accuracy.',
      benefits: [
        { metric: '85%', label: 'Detection Accuracy', description: 'Industry-leading precision in moving-train inspection' },
        { metric: '23M+', label: 'Passengers Protected', description: 'Daily safety coverage across Indian Railways' },
        { metric: '60%', label: 'Cost Reduction', description: 'Decreased maintenance and operational costs' },
        { metric: '40%', label: 'Faster Inspections', description: 'Real-time detection vs. manual processes' }
      ],
      testimonial: {
        quote: "Pradivya's ARDS system has revolutionized our rolling stock inspection process. The real-time defect detection has significantly improved our safety standards.",
        author: "Chief Engineer",
        company: "Indian Railways",
        logo: "/img/partners/indian-railways.png"
      }
    },
    manufacturing: {
      title: 'Manufacturing Excellence',
      icon: Factory,
      painPoint: 'Unplanned equipment downtime costs manufacturers $50,000 per hour, with 70% of failures being preventable through predictive maintenance.',
      solution: 'WUS AI Toolkit combines robotics, AR/VR interfaces, and predictive analytics to optimize production lines and prevent failures before they occur.',
      benefits: [
        { metric: '40%', label: 'Efficiency Gain', description: 'Improved operational efficiency through automation' },
        { metric: '75%', label: 'Downtime Reduction', description: 'Predictive maintenance prevents failures' },
        { metric: '30%', label: 'Quality Improvement', description: 'Consistent production quality standards' },
        { metric: '50%', label: 'Maintenance Savings', description: 'Optimized maintenance schedules and costs' }
      ],
      testimonial: {
        quote: "The WUS AI Toolkit has transformed our manufacturing processes. We've seen unprecedented efficiency gains and quality improvements.",
        author: "Plant Manager",
        company: "ARENA2036 Partner",
        logo: "/img/partners/arena2036.png"
      }
    },
    automotive: {
      title: 'Automotive Innovation',
      icon: Car,
      painPoint: 'Quality control issues in automotive manufacturing lead to 15% rework rates and $2.5M annual losses due to defective components reaching customers.',
      solution: 'Integrated AI-powered quality assurance with computer vision and predictive analytics ensures zero-defect manufacturing and supply chain optimization.',
      benefits: [
        { metric: '95%', label: 'Quality Score', description: 'Near-perfect defect detection and prevention' },
        { metric: '80%', label: 'Rework Reduction', description: 'Significantly reduced manufacturing rework' },
        { metric: '25%', label: 'Faster TTM', description: 'Accelerated time-to-market for new models' },
        { metric: '35%', label: 'Cost Savings', description: 'Reduced quality-related operational costs' }
      ],
      testimonial: {
        quote: "Our partnership with Pradivya has enabled us to achieve automotive industry 4.0 standards with significant quality and efficiency improvements.",
        author: "Quality Director",
        company: "ZF Group Partner",
        logo: "/img/partners/zf-group.png"
      }
    }
  };

  const currentCase = useCases[activeTab as keyof typeof useCases];
  const IconComponent = currentCase.icon;

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
              Real-World Impact Across Industries
            </h1>
            <p className="text-body-lg mb-8">
              Discover how Pradivya's AI-driven solutions solve critical challenges 
              in railways, manufacturing, and automotive sectors with measurable ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Tabs */}
      <section 
        ref={casesRef}
        className="py-16 md:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Tab Navigation */}
          <div className={`flex justify-center mb-16 transition-all duration-1000 transform ${
            casesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-pradivya-neutral dark:bg-gray-800 rounded-2xl p-2 flex space-x-2">
              {Object.entries(useCases).map(([key, useCase]) => {
                const TabIcon = useCase.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === key
                        ? 'bg-pradivya-primary text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <TabIcon size={20} className="mr-2" />
                    <span className="font-semibold">{useCase.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Use Case Content */}
          <div className={`max-w-6xl mx-auto transition-all duration-500 transform ${
            casesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Problem → Solution → Benefits Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Pain Point */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg mr-3">
                    <Shield size={24} className="text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-300">Pain Point</h3>
                </div>
                <p className="text-red-700 dark:text-red-200">
                  {currentCase.painPoint}
                </p>
              </div>

              {/* Solution */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-pradivya-accent rounded-lg mr-3">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-pradivya-primary dark:text-pradivya-accent">PSPL Solution</h3>
                </div>
                <p className="text-pradivya-primary dark:text-blue-200">
                  {currentCase.solution}
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
                    <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300">Quantified ROI</h3>
                </div>
                <p className="text-green-700 dark:text-green-200 text-sm">
                  Measurable business impact with guaranteed performance metrics
                </p>
              </div>
            </div>

            {/* ROI Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {currentCase.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-3xl font-bold text-pradivya-accent mb-2">
                    {benefit.metric}
                  </div>
                  <h4 className="font-semibold text-pradivya-primary dark:text-white mb-2">
                    {benefit.label}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        ref={testimonialsRef}
        className="py-16 md:py-24 bg-pradivya-neutral dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
            testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
                Client Success Stories
              </h2>
              <p className="text-body-lg text-gray-700 dark:text-gray-300">
                Hear from industry leaders who have transformed their operations with our solutions
              </p>
            </div>

            {/* Active Testimonial */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={currentCase.testimonial.logo} 
                  alt={currentCase.testimonial.company}
                  className="h-16 w-auto filter dark:invert dark:brightness-0 dark:opacity-75"
                />
              </div>
              
              <blockquote className="text-xl text-gray-700 dark:text-gray-300 text-center mb-6 italic">
                "{currentCase.testimonial.quote}"
              </blockquote>
              
              <div className="text-center">
                <div className="font-bold text-pradivya-primary dark:text-pradivya-accent">
                  {currentCase.testimonial.author}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {currentCase.testimonial.company}
                </div>
              </div>
            </div>

            {/* Partner Logos */}
            <div className="grid grid-cols-3 gap-8 mt-16 items-center justify-items-center">
              <img 
                src="/img/partners/indian-railways.png" 
                alt="Indian Railways"
                className="h-12 w-auto filter dark:invert dark:brightness-0 dark:opacity-75 opacity-60 hover:opacity-100 transition-opacity"
              />
              <img 
                src="/img/partners/arena2036.png" 
                alt="ARENA2036"
                className="h-12 w-auto filter dark:invert dark:brightness-0 dark:opacity-75 opacity-60 hover:opacity-100 transition-opacity"
              />
              <img 
                src="/img/partners/sidbi.png" 
                alt="SIDBI"
                className="h-12 w-auto filter dark:invert dark:brightness-0 dark:opacity-75 opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pradivya-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Operations?</h2>
          <p className="text-xl mb-8">
            Join industry leaders who trust Pradivya for their critical infrastructure needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#demo" className="btn-secondary">
              Schedule a Demo
            </a>
            <a href="/contact" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-pradivya-primary">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCases;
