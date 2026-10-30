import React from 'react';
import { useInView } from '../hooks/useInView';

const partners = [

  {
    name: 'IIT Kanpur',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/IIT.png',
    category: 'incubation'
  },
  {
    name: 'IIM Lucknow',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/IIM.png',
    category: 'incubation'
  },
  {
    name: 'NASDAQ',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/nasdaq.png',
    category: 'accelerator'
  },
  {
    name: 'C3i',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/c3i.png',
    category: 'partner'
  },
  {
    name: 'NCFE',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/NCFE.jpeg',
    category: 'investor'
  },
  {
    name: 'DSCI',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/dsci.png',
    category: 'accelerator'
  },
  {
    name: 'milestone',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/milestone.jpg',
    category: 'investor'
  },
   {
    name: 'arena2036',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/arena.png',
    category: 'investor'
  },
   {
    name: 'google',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/google.png',
    category: 'investor'
  },
  {
    name: 'rail',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/rail.png',
    category: 'investor'
  },
  {
    name: 'sidbi',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/sidbi.png',
    category: 'investor'
  },
  {
    name: 'pentland',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/pentland.png',
    category: 'investor'
  },
  {
    name: 'ONDC',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/ondc.png',
    category: 'client'
  },
  {
    name: 'Wadhwani',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/wadhwani.png',
    category: 'partner'
  },
  {
    name: 'hdfc',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/hdfc.png',
    category: 'investor'
  },
  {
    name: 'kotak',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/kotak.png',
    category: 'accelerator'
  },
  {
    name: 'teamlease',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/teamlease.png',
    category: 'accelerator'
  },
  {
    name: 'magicbillion',
    logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/magicbillion.png',
    category: 'accelerator'
  }
];

const Partners: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div ref={ref} className="container mx-auto px-4 md:px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
            Trusted Partners & Investors
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Backed by leading VCs, accelerators, and deployed across enterprise clients
            including Indian Railways and global automotive leaders.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`transition-all duration-500 transform ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-12 w-auto mx-auto filter dark:invert dark:brightness-0 dark:opacity-75 hover:opacity-80 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
