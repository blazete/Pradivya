import React from 'react';
import { Star } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Achievements: React.FC = () => {
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: recognitionRef, isInView: recognitionInView } = useInView({ threshold: 0.1 });


  const recognitionAwards = [
    {
      name: 'NASDAQ Entrepreneurial Center',
      type: 'Accelerator Program',
      year: '2021',
      image:'/img/nasdaq.png',
      description: 'Selected (OUT OF 13) from INDIA for MILESTONE MAKER COHORT SPRING 2021 COHORT by Nasdaq Entrepreneurial Centre.',
      icon: Star
    },
    {
      name: 'MOVE+ Accelerator',
      type: 'Innovation Program',
      year: '2021',
      image:'/img/move.png',
      description: 'Part of prestigious move+ Accelerator - a joint initiative of ZF Group Zeppelin University and STADTWERK AM SEE',
      icon: Star
    },
    {
      name: 'Google App Scale',
      type: 'Accelerator Program',
      year: '2023',
      image:'/img/google.png',
      description: 'Selected by GOOGLE for our efforts in social impact , skilling and jobs',
      icon: Star
    },
    {
      name: 'ASEAN startup summit',
      type: 'Government Support',
      year: '2023',
      image:'/img/asean.png',
      description: 'India- ASEAN startup summit 2023 in Kaula Lumpur, Malaysia as member of Department of science and technology, Government of India delegation. ',
      icon: Star
    },
    {
      name: 'Citi Social innovation lab',
      type: 'Selected for prestigious programs',
      year: '2023',
      image:'/img/city.png',
      description: 'Recognized and supported by Small Industries Development Bank of India for technology innovation.',
      icon: Star
    },
    {
      name: 'Arena2036',
      type: 'Research Collaboration',
      year: '2025',
      image:'/img/arena1.png',
      description: 'Selected in ARENA 2036 in Stuttgart(Germany) ',
      icon: Star
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
              Our Achievements
            </h1>
            <p className="text-body-lg mb-8">
              Celebrating milestones in innovation, growth, and impact. From breakthrough technology 
              development to industry recognition, our journey reflects commitment to excellence.
            </p>
          </div>
        </div>
      </section>

     {/* Recognition & Awards */}
      <section 
        ref={recognitionRef}
        className="py-16 md:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            recognitionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              Recognition & Awards
            </h2>
            <p className="text-body-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Industry recognition and prestigious awards that validate our innovation, 
              technology excellence, and positive impact on industrial safety.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${
            recognitionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {recognitionAwards.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-pradivya-neutral dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                > 
                <div className="h-40 bg-gradient-to-br from-pradivya-primary/10 to-pradivya-accent/10 flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                  <div className="flex items-center  p-3">                     
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

export default Achievements;
