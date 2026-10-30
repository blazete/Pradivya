import React from 'react';
import { Award, Users, Target, Star } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import TeamMember from './TeamMember';

const teamMembers = [
 
  {
    name: 'Ruchi Dogra',
    role: 'Team Lead- Software Development',
    bio: '',
    image: '/team/ruchi.jpg?auto=compress&cs=tinysrgb&w=600',
    social: {
    
      linkedin: 'https://www.linkedin.com/in/ruchi-dogra/',
    }  
  },
   {
    name: 'Amit Pal',
    role: 'Project Lead',
    bio: '',
    image: '/team/Amit.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: {
    
      linkedin: 'https://www.linkedin.com/in/amit-p-58042977/',
    }  
  },
  {
    name: 'Tanmay Tandon',
    role: 'Senior Android Developer',
    bio: '',
    image: '/team/Tanmay1.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: {
    
      linkedin: 'https://www.linkedin.com/in/tanmay-tandon-58a741b4/',
    }  
  },
   {
    name: 'Tushar',
    role: 'Technical sales engineer',
    bio: '',
    image: '/team/Tushar.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: {
      linkedin: 'https://www.linkedin.com/in/tushar-pal-85ba2b27a/',
    }
  },
];
const teamLeader = [
  {
    name: 'Prasoon Sharma',
    role: 'CEO & Founder',
    bio: 'Advisory Board Member - Nasdaq Entrepreneurial Center. Visionary leader driving AI innovation and industrial transformation with expertise in strategic partnerships and global market expansion.',
    image: '/team/prasoonS.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: {
      linkedin: 'https://www.linkedin.com/in/prasoon-sharma-nyu/',
   
    },
    achievements: ['Nasdaq Advisory Board', 'AI Innovation Leader', 'Strategic Partnerships'],
    expertise: ['Strategic Leadership', 'AI Strategy', 'Global Partnerships']
  },
  {
    name: 'Ashwani Singh',
    role: 'CTO & Co-Founder',
    bio: '3x Entrepreneur | 3x Corporate Intrapreneur (Intel, Qualcomm, Infosys) | Technology Policy & Frameworks, Startups & Angel Investors Advisor | Product roadmaps',
    image: '/team/ashwani.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: {
      linkedin: 'https://www.linkedin.com/in/singhashwani/',
     
    },
    achievements: ['3x Entrepreneur', 'Intel/Qualcomm Veteran', 'Technology Policy Expert'],
    expertise: ['Technology Architecture', 'Product Development', 'Angel Investment']
  },
  {
    name: 'Dr Divya Sharma',
    role: 'Co-Founder & HR Head',
    bio: 'Business development, training and research specialist with extensive experience in organizational growth, talent management, and strategic human resources.',
    image: '/team/divya.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: {
    
      linkedin: 'https://www.linkedin.com/in/dr-divya-sharma-74b939a/',
    },
    achievements: ['PhD Research', 'Business Development', 'Talent Strategy'],
    expertise: ['Human Resources', 'Business Development', 'Training & Research']
  }
];
const advisorsAndMentors = [
  {
    name: 'Arun Arora',
    role: 'Advisor',
    bio: 'Senior Advisor / Technical, Kolkata Metro Rail Corporation Ltd., Ministry of Rlys',
    image: '/team/arun.jpeg?auto=compress&cs=tinysrgb&w=600',
    social: {
      linkedin: 'https://www.linkedin.com/in/arun-arora-685a6538/',
    }
  },
  {
    name: 'R (SHYAM) Shyamsunder',
    role: 'Mentor',
    bio: 'Ex-Managing Director - Investments, Temasek Holdings',
    image: '/team/r_shyamsunder.jpg?auto=compress&cs=tinysrgb&w=600',
    social: {
      linkedin: 'https://www.linkedin.com/in/r-shyam-shyamsunder-a4b96843/',
    }
  },
  {
    name: 'Satya S. Tripathi',
    role: 'Advisor',
    bio: 'Secretary-General, Global Alliance for a Sustainable Planet',
    image: '/team/satya.jpg?auto=compress&cs=tinysrgb&w=600',
    social: {
      linkedin: 'https://www.linkedin.com/in/satya-s-tripathi-5b9b078a/',
    }
  },
];

const Team: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="team" className="py-20 md:py-32 bg-gradient-to-br from-pradivya-neutral via-white to-pradivya-neutral dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pradivya-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-24 h-24 bg-pradivya-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-pradivya-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div ref={ref} className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Enhanced Advisors & Mentors Section - Now First */}
        <div className="relative mb-24">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-pradivya-accent/5 to-pradivya-primary/5 rounded-3xl"></div>

          <div className="relative p-8 lg:p-12">
            <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-400 transform ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pradivya-primary/10 to-pradivya-accent/10 rounded-full mb-6 border border-pradivya-primary/20">
                <Award className="h-6 w-6 text-pradivya-primary mr-3" />
                <span className="text-pradivya-primary font-semibold text-lg">OUR ADVISORS & MENTORS</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-pradivya-primary dark:text-white mb-6">
                Guided by <span className="text-pradivya-accent">Industry Experts</span>
              </h3>

              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Strategic guidance from seasoned professionals who shape our vision and growth trajectory
              </p>

              {/* Decorative line */}
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-pradivya-accent to-pradivya-primary rounded-full"></div>
              </div>
            </div>

            {/* Enhanced Advisors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
              {advisorsAndMentors.map((advisor, index) => (
                <div
                  key={`advisor-${index}`}
                  className="flex justify-center"
                >
                  <TeamMember
                    member={advisor}
                    delay={index * 200}
                    inView={isInView}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Team Section Header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center justify-center px-4 py-2 bg-pradivya-accent/10 rounded-full mb-6">
            <Users className="h-5 w-5 text-pradivya-accent mr-2" />
            <span className="text-pradivya-accent font-medium">Leadership Team</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-pradivya-primary dark:text-white mb-6">
            Meet Our <span className="text-pradivya-accent">Expert Team</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Visionary leaders driving innovation at the intersection of AI, industrial automation, and safety technology
          </p>
        </div>

        {/* Enhanced Team Grid with Better Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto mb-24">
          {teamLeader.map((Leadermember, index) => (
            <div
              key={index}
              className="flex justify-center"
            >
              <TeamMember
                member={Leadermember}
                delay={(advisorsAndMentors.length + index) * 200}
                inView={isInView}
              />
            </div>
          ))}
        </div>
        {/* Enhanced Team Grid with Better Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto mb-24">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex justify-center"
            >
              <TeamMember
                member={member}
                delay={(advisorsAndMentors.length + index) * 200}
                inView={isInView}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-600 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-pradivya-accent/10 rounded-full p-3">
                <Star className="h-8 w-8 text-pradivya-accent" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-pradivya-primary dark:text-white mb-4">
              Join Our Mission
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We're always looking for talented individuals who share our passion for transforming industries through AI and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-pradivya-primary hover:bg-pradivya-primary/90 text-white rounded-lg font-medium transition-all hover:shadow-lg"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Our Team
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-pradivya-accent text-pradivya-accent hover:bg-pradivya-accent hover:text-white rounded-lg font-medium transition-all"
              >
                <Target className="h-5 w-5 mr-2" />
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
