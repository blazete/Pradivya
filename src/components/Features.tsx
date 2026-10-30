import React from 'react';
import { Train, Cog, Shield } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import FeatureCard from './FeatureCard';

const features = [
  {
    title: 'ARDS - Advanced Railways Defect Detection & Surveillance System',
    description: 'Our technology identifies faults using multiple sensors and shares real time alerts to the workshop staff.',
    icon: <Train className="h-8 w-8 text-white" />,
    image: '/img/ards1.png',
    imageAlt: 'AI-powered railway inspection system with component detection'
  },
  {
    title: 'Smart Assembly Inspection and Automation System',
    description: 'Workplace Unified Solutions powered by edge-AI for manufacturing excellence. Integrates robotics, AR/VR interfaces, and predictive analytics to optimize production lines and enhance operational efficiency in automotive and manufacturing sectors.',
    icon: <Cog className="h-8 w-8 text-white" />,
    image: '/img/toolkit.jpg',
    imageAlt: 'Railway maintenance worker performing inspection'
  },
  {
    title: 'Workplace Safety',
    description: 'Real-time monitoring of worker vitals, environmental hazards, and emergency response coordination. Features panic buttons, geofencing, and AI-powered risk assessment for comprehensive workforce protection.',
    icon: <Shield className="h-8 w-8 text-white" />,
    image: '/img/kavach.png',
    imageAlt: 'Smart IoT wearable safety jacket for workers'
  },

];

const Features: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="features" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div ref={ref} className="container mx-auto px-4 md:px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
            Industry-Leading AI Solutions
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            From railway safety to industrial automation, our multimodal fusion technology
            delivers predictive maintenance and safety solutions that protect millions daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              delay={index * 100}
              inView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
