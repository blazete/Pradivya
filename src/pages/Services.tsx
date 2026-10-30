import React from 'react';
import { useInView } from '../hooks/useInView';
import { Factory, Gauge, HardHat } from 'lucide-react';

const Services: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const solutions = [
    {
      icon: <Gauge className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: 'Predictive Maintenance',
      description: 'Advanced monitoring and prediction systems for industrial equipment.',
      systems: [
        {
          name: 'ARDS (Artificial Intelligence based Rolling Stock Defect Detection & Surveillance System)',
          description: 'ARDS automates Rolling In/Out processes using a patented computer vision solution.',
          features: ['Automated detection of faulty parts using camera technology', 'Real-time alerts, data logging, and issue reporting for quicker response.', 'PMechanic training on-the-job and fast part replacement through integrated workshop and inventory management.']
        },
        {
          name: 'Ballast Hopper Monitoring',
          description: 'PSPL’s Smart Ballast Hopper Unloading Monitoring System combines weight sensing and acoustic analysis to enhance safety and efficiency in ballast refill operations.',
          features: ['Enhanced Safety', 'Efficient Operations', 'Collaborative Development']
        },
        {
          name: 'Rail Fastening System',
          description: 'Our Rail Fastening System offers smart monitoring to ensure the integrity and safety of rail infrastructure. Using IoT sensors and AI analytics, it continuously tracks the condition of fasteners, detects anomalies, and predicts potential failures. This proactive approach helps prevent accidents, reduces maintenance costs, and ensures uninterrupted rail operations through real-time alerts and data-driven insights.',
          features: ['Smart monitoring', 'Real-time detection', 'Predictive maintenance','Data-driven insights']
        },
        {
          name: 'Crowd Monitoring System',
          description: 'Pradivya Software proposes CROWDNET, an AI-based crowd monitoring system using smart CCTV cameras and mmWave radars for real-time crowd estimation and prediction. Integrated with existing railway systems, it offers live dashboards, alerts, and predictive analytics to prevent stampedes, optimize passenger flow, and enhance safety and decision-making.',
          features: ['Real-time crowd estimation', 'Enhanced accuracy ', 'Crowd prediction models','Centralized dashboard ','Improved safety and flow,']
        }
      ]
    },
    {
      icon: <Factory className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: 'Industrial Automation',
      description: 'Automating processes for increased productivity and precision.',
      features: [
        {
          title: 'ARENA Partnership',
          description: 'PSPL has been chosen to join ARENA2036, a prestigious innovation hub based in Stuttgart, Germany. As part of this global initiative, PSPL will collaborate with automotive and industrial technology pioneers like Mercedes-Benz, BMW, Siemens, and Bosch to develop cutting-edge solutions in AI, IoT, and Industry 4.0. This milestone strengthens PSPL’s position as a global innovator in industrial transformation and digital empowerment for the workforce.',
          capabilities: ['ARENA2036 Selection', 'Global Tech Collaboration', 'AI & IoT Innovation']
        },
        {
          title: 'Robotics Projects',
          description: 'Our Robotics Projects deliver tailored automation solutions for manufacturing and logistics sectors. From autonomous material handling to precision assembly, our custom-built robots enhance productivity, reduce labor costs, and ensure operational accuracy. Integrated with AI and IoT, these systems adapt to dynamic environments, streamline workflows, and support scalable, future-ready industrial operations.',
          capabilities: ['Custom robotics solutions', 'Autonomous systems ', 'Precision and efficiency','AI & IoT integration ']
        }
      ]
    },
    {
      icon: <HardHat className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: 'Workplace Safety',
      description: 'IoT-based safety solutions for industrial environments.',
      products: [
        {
          name: 'Worker KAVACH',
          description: 'This advanced IOT wearable, WORKER KAVACH, offers comprehensive monitoring and tracking of both environmental and biological variables, prioritizing the safety and well-being of workers in various operational settings',
          useCases: [
            'Gas Sensor',
            'DHT Sensor',
            'Proximity Sensor',
            'Noise Sensor',
            'Biological Variables Monitoring',
            'Bioimpedance Sensor',
            'Electrodermal Sensor',
            'GPS and RFID Tracking',
            'SOS Communication',
            'Audio/Video Logging'
          ]
        }
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Industrial Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              Innovative technologies for smarter, safer, and more efficient industrial operations
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section ref={ref} className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-24">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 transform ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-8">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    {solution.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
                    {solution.title}
                  </h2>
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                  {solution.description}
                </p>

                {solution.systems && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {solution.systems.map((system, sysIndex) => (
                      <div 
                        key={sysIndex}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {system.name}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {system.description}
                        </p>
                        <ul className="space-y-2">
                          {system.features.map((feature, featIndex) => (
                            <li key={featIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                              <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {solution.features && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {solution.features.map((feature, featIndex) => (
                      <div 
                        key={featIndex}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {feature.description}
                        </p>
                        <ul className="space-y-2">
                          {feature.capabilities.map((capability, capIndex) => (
                            <li key={capIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                              <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {solution.products && (
                  <div className="grid grid-cols-1 gap-8">
                    {solution.products.map((product, prodIndex) => (
                      <div 
                        key={prodIndex}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {product.name}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {product.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {product.useCases.map((useCase, caseIndex) => (
                            <div 
                              key={caseIndex}
                              className="flex items-center p-3 bg-white dark:bg-gray-900 rounded-lg"
                            >
                              <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                              <span className="text-gray-700 dark:text-gray-300">{useCase}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
