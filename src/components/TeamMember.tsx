import React from 'react';
import { Github, Linkedin, Twitter, Award, Briefcase } from 'lucide-react';

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
    social: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
    achievements?: string[];
    expertise?: string[];
  };
  delay: number;
  inView: boolean;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member, delay, inView }) => {
  return (
    <div
      className={`group relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden transition-all duration-700 transform ${
        inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      } hover:shadow-2xl hover:-translate-y-4 border border-gray-100 dark:border-gray-800 hover:border-pradivya-accent/30`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Decorative corner gradient */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pradivya-accent/20 to-transparent rounded-bl-full"></div>

      {/* Image Section with Enhanced Overlay */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-80 object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pradivya-primary/95 via-pradivya-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        {/* Animated Social Links Overlay */}
        <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-pradivya-accent hover:scale-125 transition-all duration-300 hover:rotate-12"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <Linkedin size={18} />
              </a>
            )}
            {member.social.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-pradivya-accent hover:scale-125 transition-all duration-300 hover:rotate-12"
                aria-label={`${member.name}'s Twitter`}
              >
                <Twitter size={18} />
              </a>
            )}
            {member.social.github && (
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-pradivya-accent hover:scale-125 transition-all duration-300 hover:rotate-12"
                aria-label={`${member.name}'s GitHub`}
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Enhanced Role Badge */}
        <div className="absolute top-4 left-4 transform group-hover:scale-105 transition-transform duration-300">
          <div className="bg-gradient-to-r from-pradivya-accent to-pradivya-primary backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-white text-sm font-semibold">{member.role}</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="p-8 relative">
        {/* Name and Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-pradivya-primary dark:text-white mb-2 group-hover:text-pradivya-accent transition-colors duration-300">
            {member.name}
          </h3>
          {/* Decorative underline */}
          <div className="w-16 h-1 bg-gradient-to-r from-pradivya-accent to-pradivya-primary rounded-full mx-auto mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>

        {/* Bio */}
        {member.bio && (
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 text-center">
            {member.bio}
          </p>
        )}

        {/* Enhanced Achievements */}
        {member.achievements && (
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-pradivya-accent/10 rounded-full p-2 mr-2">
                <Award className="h-4 w-4 text-pradivya-accent" />
              </div>
              <h4 className="text-sm font-semibold text-pradivya-primary dark:text-pradivya-accent">Key Achievements</h4>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.achievements.map((achievement, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gradient-to-r from-pradivya-accent/10 to-pradivya-accent/5 text-pradivya-accent text-xs rounded-full font-medium border border-pradivya-accent/20 hover:border-pradivya-accent/40 transition-all duration-300 hover:scale-105"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Expertise */}
        {member.expertise && (
          <div className="mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-pradivya-primary/10 rounded-full p-2 mr-2">
                <Briefcase className="h-4 w-4 text-pradivya-primary" />
              </div>
              <h4 className="text-sm font-semibold text-pradivya-primary dark:text-pradivya-accent">Core Expertise</h4>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gradient-to-r from-pradivya-primary/10 to-pradivya-primary/5 text-pradivya-primary text-xs rounded-full font-medium border border-pradivya-primary/20 hover:border-pradivya-primary/40 transition-all duration-300 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Connection indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-pradivya-accent rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-2 h-2 bg-pradivya-primary rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
            <div className="w-2 h-2 bg-pradivya-accent rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
