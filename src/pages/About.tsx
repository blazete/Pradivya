import React from 'react';
import { useInView } from '../hooks/useInView';
import { Award, Target, Users, Star, Heart, Eye, Zap } from 'lucide-react';
import Team from '../components/Team';
  interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  isFoundingEvent?: boolean;
  position: 'top' | 'bottom';
}

const timelineData: TimelineEvent[] = [
  {
    date: "July 2020",
    title: "Founded",
    description: "",
    isFoundingEvent: true,
    position: "top"
  },
  {
    date: "Oct, 2021",
    title: "Featured on",
    description: "NASDAQ Tower",
    position: "top"
  },
  {
    date: "Sept, 2022",
    title: "GOI TIDE",
    description: "Go To market Funds",
    position: "top"
  },
  {
    date: "Nov, 2023",
    title: "Funded by Pentaland",
    description: "And IIM-Lucknow",
    position: "top"
  },
  {
    date: "Apr, 2025",
    title: "Funded by SIDBI",
    description: "",
    position: "top"
  },
  {
    date: "Mar, 2021",
    title: "Received GOI",
    description: "TIDE Grant",
    position: "bottom"
  },
  {
    date: "Aug, 2022",
    title: "Patent granted",
    description: "on AI Solution",
    position: "bottom"
  },
  {
    date: "Aug, 2023",
    title: "Project Received from",
    description: "Indian Railways for ARDS",
    position: "bottom"
  },
  {
    date: "Dec, 2023",
    title: "IOT KAVACH",
    description: "featured in India Mobile Congress and got MSME 5G design grant",
    position: "bottom"
  },
  {
    date: "Mar, 2025",
    title: "ARENA2036 and MOVE+(ZF.group)",
    description: "Part of prestigious German Accelerator programs ARENA2036 and MOVE+(ZF.group)",
    position: "bottom"
  }
];
const About: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { ref: valuesRef, isInView: valuesInView } = useInView({ threshold: 0.1 });
  const { ref: partnershipsRef, isInView: partnershipsInView } = useInView({ threshold: 0.1 });


  const coreValues = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Innovation',
      description: 'We continuously push boundaries and pioneer new solutions in AI and industrial automation.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty, transparency, and ethical practices in all our endeavors.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and foster strong partnerships with clients, academia, and industry leaders.'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Excellence',
      description: 'We are committed to delivering exceptional quality and exceeding expectations in every project.'
    }
  ];

  const incubationPartners = [
    {
      name: 'IIT Kanpur',
      type: 'Startup Incubation and Innovation Center',
      description: 'Premier technology incubator providing world-class facilities and mentorship.',
      logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/IIT.png'
    },
    {
      name: 'IIM Lucknow',
      type: 'Business Incubation & Funding',
      description: 'Strategic business guidance and investment support for scaling operations.',
      logo: 'https://wusadmin.workerunionsupport.com/WebsiteContent/Supporters/IIM.png'
    },
    {
      name: 'ZF Group',
      type: 'Accelerator & Technology Partnership',
      description: 'Global automotive technology collaboration for innovative mobility solutions.',
      logo: '/img/zf.jpg'
    },
    {
      name: 'ARENA2036',
      type: 'Research Collaboration',
      description: 'Advanced automotive research platform for future mobility concepts.',
      logo: '/img/arena1.png'
    }
  ];



  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F694e8def24d74ae3b899c6185f4b4349%2Faf9ba7b8c53e4b1db159759dd05dcbfe?format=webp&width=800"
            alt="Person working on laptop with digital analytics charts"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pradivya-primary/85 via-pradivya-primary/70 to-pradivya-primary/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About Pradivya
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Pioneering industrial innovation through advanced AI and technology solutions
            </p>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Pradivya Software Pvt Ltd (PSPL) is a startup incubated at SIIC & C3i IIT Kanpur, NASDAQ Entrepreneurial Center, NASSCOM Data Security Council of India and funded through grants from MEITY, DST and CITI Bank. We have developed patent technologies in Artificial Intelligence, Machine Learning, Natural Language Processing, Cyber Security and IoT.
            </p>
          </div>
        </div>
      </section>


      {/* Mission, Vision & Values */}
      <section ref={valuesRef} className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
            valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              Mission, Vision & Values
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our guiding principles that drive everything we do
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className={`transition-all duration-700 delay-100 transform ${
              valuesInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="bg-pradivya-accent/10 p-3 rounded-lg mr-4">
                    <Target className="h-8 w-8 text-pradivya-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-pradivya-primary dark:text-white">
                    Our Mission
                  </h3>
                </div>
                <div className="mb-6">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F694e8def24d74ae3b899c6185f4b4349%2F56df380a8b724cc498b32710a897abf4?format=webp&width=800"
                    alt="AI and industrial automation technology illustration"
                    className="w-full h-32 md:h-40 object-cover rounded-lg"
                  />
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Pradivya is a leading tech startup specializing in advanced AI solutions for predictive maintenance, industrial automation, workplace safety, scalable infrastructure, real-time collaboration, and time-saving automation. Our cutting-edge technologies are designed to revolutionize industries, boost operational efficiency, and drive sustainable growth.
                </p>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 transform ${
              valuesInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="bg-pradivya-primary/10 p-3 rounded-lg mr-4">
                    <Eye className="h-8 w-8 text-pradivya-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-pradivya-primary dark:text-white">
                    Our Vision
                  </h3>
                </div>
                <div className="mb-6">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F694e8def24d74ae3b899c6185f4b4349%2Fc2926660056b4d4a961923a64a67baae?format=webp&width=800"
                    alt="Futuristic technology and innovation visualization"
                    className="w-full h-32 md:h-40 object-cover rounded-lg"
                  />
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  At Pradivya, we envision ourselves as a pioneering force in AI-driven technologies, setting new standards for innovation and excellence. Our goal is to revolutionize industries, streamline processes, and catalyze positive change through intelligent solutions, shaping a brighter and more prosperous future for all.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 ${
                  valuesInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${300 + index * 100}ms`,
                }}
              >
                <div className="text-pradivya-accent mb-4">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-pradivya-primary dark:text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incubation & Collaborations */}
      <section ref={partnershipsRef} className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
            partnershipsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
              Incubation & Collaborations
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Strategic partnerships with world-class institutions driving our innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {incubationPartners.map((partner, index) => (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform hover:shadow-xl hover:-translate-y-2 ${
                  partnershipsInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="h-40 bg-gradient-to-br from-pradivya-primary/10 to-pradivya-accent/10 flex items-center justify-center p-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-pradivya-primary dark:text-white mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-pradivya-accent text-sm font-medium mb-3">
                    {partner.type}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Enhanced Company Timeline */}
      <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-pradivya-neutral via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pradivya-accent rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-24 h-24 bg-pradivya-primary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-pradivya-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Frame Container */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pradivya-accent/20 dark:border-pradivya-accent/30">
            <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-700 transform ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center justify-center px-4 py-2 bg-pradivya-accent/10 rounded-full mb-6">
              <Target className="h-5 w-5 text-pradivya-accent mr-2" />
              <span className="text-pradivya-accent font-medium">Innovation Timeline</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-pradivya-primary dark:text-white mb-6">
              Our <span className="text-pradivya-accent">Journey</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              From founding to industry leadership - key milestones in our innovation journey
            </p>
          </div>

          {/* Enhanced Horizontal Timeline */}
          <div className="relative overflow-x-auto pb-8">
            <div className="min-w-max px-8">
              {/* Timeline container with horizontal scroll */}
              <div className="relative flex items-center space-x-8 min-w-fit">
                {/* Horizontal timeline line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pradivya-accent via-pradivya-primary to-pradivya-accent rounded-full opacity-30 transform -translate-y-1/2"></div>

                {timelineData.map((event, index) => (
                  <div
                    key={index}
                    className={`group relative transition-all duration-700 transform ${
                      isInView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-12'
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Timeline card */}
                    <div className="flex flex-col items-center w-80">
                      {/* Top content (alternating) */}
                      <div className={`${index % 2 === 0 ? 'order-1' : 'order-3'} mb-6`}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 group-hover:border-pradivya-accent/50 group-hover:-translate-y-2">
                          {/* Date Badge */}
                          <div className={`bg-gradient-to-r ${
                            event.isFoundingEvent
                              ? 'from-yellow-400 to-orange-500'
                              : 'from-pradivya-primary to-pradivya-accent'
                          } p-3 text-center relative`}>
                            <span className="text-white font-bold text-base">{event.date}</span>
                            {event.isFoundingEvent && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
                            )}
                          </div>

                          <div className="p-6">
                            <div className="text-center">
                              <h3 className="text-lg font-bold text-pradivya-primary dark:text-white mb-3 group-hover:text-pradivya-accent transition-colors">
                                {event.title}
                              </h3>
                              {event.description && (
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                                  {event.description}
                                </p>
                              )}
                            </div>

                            {/* Progress indicator */}
                            <div className="mt-4 flex items-center justify-center space-x-2">
                              <div className="w-16 h-1 bg-gradient-to-r from-pradivya-accent/20 to-pradivya-primary/20 rounded-full group-hover:from-pradivya-accent group-hover:to-pradivya-primary transition-all duration-500"></div>
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Central Timeline Node */}
                      <div className="order-2 relative z-10">
                        {event.isFoundingEvent ? (
                          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-yellow-400/30 group-hover:ring-8 transition-all duration-500">
                            <Star className="h-8 w-8 text-white" />
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-pradivya-accent to-pradivya-primary rounded-full flex items-center justify-center shadow-xl ring-4 ring-pradivya-accent/30 group-hover:ring-8 transition-all duration-500">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                        )}

                        {/* Connecting line to content */}
                        <div className={`absolute ${
                          index % 2 === 0 ? 'top-full' : 'bottom-full'
                        } left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-pradivya-accent to-pradivya-primary opacity-60`}></div>
                      </div>

                      {/* Bottom spacer for alternating layout */}
                      <div className={`${index % 2 === 0 ? 'order-3' : 'order-1'} h-6`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {timelineData.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isInView
                      ? 'bg-pradivya-accent'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      <Team />

      
      {/* Achievements  <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Achievements & Recognition
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our commitment to innovation has earned us numerous accolades
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                      <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>*/}
     


     
    </div>
  );
};

export default About;
