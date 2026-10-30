import React from 'react';
import { useInView } from '../hooks/useInView';
import { Brain, Camera, Wifi, Shield, Zap } from 'lucide-react';

const TechnologyShowcase: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const technologies = [
    {
      title: 'Edge AI Railway Processing',
      description: 'AI cameras perform video processing on edge itself and send processed data with error logs to server through 5G',
      image: '/img/ards3.webp',
      icon: <Brain className="h-6 w-6" />,
     // stats: '23M+ Daily Passengers Protected'
    },
    {
      title: 'Smart IoT Workplace Safety',
      description: 'Intelligent wearable systems with panic buttons, geofencing, and environmental monitoring',
      image: '/img/iot3.jpg',
      icon: <Shield className="h-6 w-6" />,
     // stats: '75K+ Installations Worldwide'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-pradivya-primary/5 to-pradivya-accent/5 dark:from-gray-900 dark:to-gray-800">
      <div ref={ref} className="container mx-auto px-4 md:px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
            Technology in Action
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            See how our AI solutions transform industries and protect millions of people daily
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all duration-700 transform hover:scale-105 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tech.image}
                  alt={tech.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Floating Icon */}
                <div className="absolute top-4 right-4 bg-pradivya-accent/20 backdrop-blur-sm p-3 rounded-full border border-white/20">
                  <div className="text-white">
                    {tech.icon}
                  </div>
                </div>

                {/* Stats Badge */}
              {/*  <div className="absolute bottom-4 left-4 bg-pradivya-accent/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <p className="text-white text-sm font-medium"> */}
                   {/* {tech.stats}*/}
                  {/*  </p>
                </div>*/}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-pradivya-primary dark:text-white mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Visual Elements */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`text-center transition-all duration-700 transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="bg-pradivya-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Camera className="h-8 w-8 text-pradivya-accent" />
            </div>
            <h4 className="font-semibold text-pradivya-primary dark:text-white mb-2">Computer Vision</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced image processing and defect detection</p>
          </div>

          <div className={`text-center transition-all duration-700 transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '500ms' }}>
            <div className="bg-pradivya-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Wifi className="h-8 w-8 text-pradivya-primary" />
            </div>
            <h4 className="font-semibold text-pradivya-primary dark:text-white mb-2">IoT Integration</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Real-time sensor data and connectivity</p>
          </div>

          <div className={`text-center transition-all duration-700 transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="bg-pradivya-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-pradivya-accent" />
            </div>
            <h4 className="font-semibold text-pradivya-primary dark:text-white mb-2">Edge AI</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Fast processing with minimal latency</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
