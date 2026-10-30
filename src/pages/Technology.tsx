import React from 'react';
import { Eye, Brain, Waves, Network, Cpu, Shield } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Technology: React.FC = () => {
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: fusionRef, isInView: fusionInView } = useInView({ threshold: 0.1 });
  const { ref: archRef, isInView: archInView } = useInView({ threshold: 0.1 });
  useInView({ threshold: 0.1 });

  const fusionSensors = [
    {
      name: 'Computer Vision',
      icon: Eye,
      description: 'High-resolution cameras with AI-powered image analysis for visual defect detection',
      applications: ['Crack detection', 'Surface analysis', 'Object recognition']
    },
    {
      name: 'Acoustic Monitoring',
      icon: Waves,
      description: 'Advanced sound pattern recognition for mechanical fault identification',
      applications: ['Bearing analysis', 'Motor diagnostics', 'Noise anomalies']
    },
    {
      name: 'Vibration Analysis',
      icon: Brain,
      description: 'Multi-axis accelerometers detecting structural and mechanical irregularities',
      applications: ['Structural health', 'Imbalance detection', 'Resonance analysis']
    },
    {
      name: 'Thermography',
      icon: Shield,
      description: 'Thermal imaging for temperature-based fault detection and hot-spot identification',
      applications: ['Electrical faults', 'Friction monitoring', 'Heat distribution']
    },
    {
      name: 'Electrical Signature',
      icon: Cpu,
      description: 'Power quality and electrical parameter monitoring for motor and system health',
      applications: ['Motor current analysis', 'Power factor monitoring', 'Phase analysis']
    },
    {
      name: 'Oil Analysis',
      icon: Network,
      description: 'Chemical analysis of lubricants for wear particle detection and contamination',
      applications: ['Wear monitoring', 'Contamination detection', 'Oil degradation']
    }
  ];


  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-16 md:py-24 bg-gradient-to-br from-pradivya-primary to-pradivya-accent text-white relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F694e8def24d74ae3b899c6185f4b4349%2Fc558e2e82dc64119883350ab5e356ee1?format=webp&width=800"
            alt="AI railway processing and edge computing"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pradivya-primary/90 to-pradivya-accent/90"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-hero-lg md:text-hero-xl mb-6">
              Cutting-Edge Technology Stack
            </h1>
            <p className="text-body-lg mb-8">
              Our proprietary multimodal fusion technology combines advanced sensors,
              edge computing, and AI algorithms to deliver unparalleled insights into
              industrial asset health and performance.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-medium mb-2">Edge AI Processing</p>
              <p className="text-white/90">
                AI cameras perform video processing on edge itself and send processed data with error logs to server through 5G
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multimodal Fusion Section */}
      <section
        ref={fusionRef}
        className="py-16 md:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            fusionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              Multimodal Fusion Technology
            </h2>
            <p className="text-body-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Six complementary sensing modalities work together to provide comprehensive
              asset monitoring and predictive maintenance capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fusionSensors.map((sensor, index) => {
              const IconComponent = sensor.icon;
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    fusionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-pradivya-accent rounded-lg mr-4">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-pradivya-primary dark:text-white">
                      {sensor.name}
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {sensor.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-pradivya-primary dark:text-pradivya-accent">
                      Applications:
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400">
                      {sensor.applications.map((app, appIndex) => (
                        <li key={appIndex} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-pradivya-accent rounded-full mr-2"></div>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Architecture */}
      <section
        ref={archRef}
        className="py-16 md:py-24 bg-pradivya-neutral dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            archInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              Platform Architecture
            </h2>
            <p className="text-body-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Edge-to-cloud architecture ensuring real-time processing, data security,
              and seamless integration with existing industrial systems.
            </p>
          </div>
<div className="group relative overflow-hidden bg-gradient-to-br from-pradivya-accent/5 to-pradivya-primary/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="absolute inset-0 bg-gradient-to-br from-pradivya-accent/10 to-pradivya-primary/10"></div>
                              <div className="text-center z-10">
                                   <img
                                  src="/img/plateformarc.webp"
                                  alt="Defect Detection Analysis"
                                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                          </div>
            
        </div>
      </section>

      
    </div>
  );
};

export default Technology;
