import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  imageAlt?: string;
}

interface FeatureCardProps {
  feature: Feature;
  delay: number;
  inView: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, delay, inView }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
        inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {feature.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={feature.image}
            alt={feature.imageAlt || feature.title}
            className="w-full h-full object-contain object-center transform hover:scale-105 transition-transform duration-300 bg-gray-100 dark:bg-gray-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <div className="rounded-full bg-pradivya-accent/20 backdrop-blur-sm p-3 inline-flex border border-white/20">
              {feature.icon}
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {!feature.image && (
          <div className="rounded-full bg-pradivya-accent/10 p-3 inline-flex mb-5">
            {feature.icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-pradivya-primary dark:text-white mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
