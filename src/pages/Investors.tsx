import React from 'react';
import { Award, Users, Trophy } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Investors: React.FC = () => {
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: acceleratorsRef, isInView: acceleratorsInView } = useInView({ threshold: 0.1 });

  const acceleratorsAwards = [
    {
      name: 'NASDAQ Entrepreneurial Center',
      type: 'Accelerator',
      year: '2020',
      description: 'Selected for exclusive mentorship and growth program with Silicon Valley leaders.',
      icon: Trophy
    },
    {
      name: 'MOVE+',
      type: 'Accelerator',
      year: '2021',
      description: 'Automotive innovation program with access to OEM partnerships and pilot opportunities.',
      icon: Award
    },
    {
      name: ' Google Social Impact',
      type: 'Award',
      year: '2022',
      description: 'Google Social Impact Challenge winner for AI-driven railway safety solutions.',
      icon: Users
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
              Achievements
            </h1>
            <p className="text-body-lg mb-8">
              Join leading investors backing the future of industrial AI and predictive maintenance. 
              Proven technology, enterprise traction, and massive market opportunity.
            </p>
            

          </div>
        </div>
      </section>



      {/* Accelerators & Awards */}
      <section 
        ref={acceleratorsRef}
        className="py-16 md:py-24 bg-pradivya-neutral dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            acceleratorsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              Accelerators & Awards
            </h2>
            <p className="text-body-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Recognition from global technology leaders and participation in prestigious 
              accelerator programs validate our market position and growth potential.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${
            acceleratorsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {acceleratorsAwards.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-pradivya-accent rounded-lg mr-4">
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-pradivya-primary dark:text-white">
                        {item.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-sm text-pradivya-accent font-semibold mr-2">
                          {item.type}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  </div>  
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Investors;
