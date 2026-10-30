import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Shield, ArrowDown, Sparkles, Brain, Activity } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import VideoModal from './VideoModal';

const Hero: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const solutions = [
    {
      icon: Shield,
      title: "Predictive Maintenance",
     // subtitle: "Rolling Stock Inspection",
      description: "Anticipating equipment failures to reduce downtime.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Industrial Automation",
      //subtitle: "Industrial Automation",
      description: "Automating processes for increased productivity and precision.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Activity,
      title: "Workplace Safety",
     // subtitle: "Workplace Safety",
      description: "Enhancinng safety measures to protect workers.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Parallax Background Image */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F694e8def24d74ae3b899c6185f4b4349%2F545bef95bf574149a561db93e1ea7439?format=webp&width=1200"
            alt="Industrial robotics and railway automation"
            className="w-full h-full object-cover object-center scale-110 brightness-110 contrast-125"
          />
        </div>

        {/* Advanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-blue-900/40 to-indigo-900/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pradivya-primary/15 via-transparent to-pradivya-accent/15"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pradivya-accent rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 pt-32 md:pt-36 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className={`space-y-8 transition-all duration-1000 transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pradivya-accent/20 to-pradivya-primary/20 backdrop-blur-sm border border-pradivya-accent/30 rounded-full px-4 py-2 text-sm font-medium text-pradivya-accent">
              <Sparkles size={16} className="animate-pulse" />
              <span>AI-Powered Industrial Solutions</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-pradivya-accent to-white bg-clip-text text-transparent">
                  Next-Gen
                </span>
                <br />
                <span className="text-white">Predictive</span>
                <br />
                <span className="bg-gradient-to-r from-pradivya-accent to-pradivya-primary bg-clip-text text-transparent">
                  Maintenance
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                Revolutionizing industrial operations with
                <span className="text-pradivya-accent font-semibold"> multimodal AI fusion</span> technology.
                Protecting millions with unparalleled precision.
              </p>
            </div>

            {/* Stats Bar 
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-pradivya-accent/50 transition-all duration-500 transform hover:scale-105 ${
                    isInView ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-6 h-6 text-pradivya-accent mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>*/}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#demo"
                className="group relative overflow-hidden bg-gradient-to-r from-pradivya-accent to-pradivya-primary hover:from-pradivya-primary hover:to-pradivya-accent text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">
                  Request Demo
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>

              <button
                onClick={handleWatchDemo}
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-pradivya-accent text-white hover:text-pradivya-accent font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <div className="relative">
                  <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-pradivya-accent/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Column - Solutions Cards */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 transform ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${solution.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500`}></div>

                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${solution.color} shadow-lg`}>
                      <solution.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{solution.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <div className="flex flex-col items-center space-y-2 text-white/60">
            <span className="text-sm font-medium">Discover More</span>
            <ArrowDown size={20} className="animate-bounce" />
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-pradivya-accent/30 to-pradivya-primary/30 rounded-full mix-blend-soft-light filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-pradivya-primary/20 to-blue-500/20 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pradivya-accent/20 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId="1cV3-WYoTdI"
        title="Pradivya Demo - AI-Powered Industrial Solutions"
      />
    </section>
  );
};

export default Hero;
