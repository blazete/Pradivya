import React, { useState } from 'react';
import { Play, Video, Youtube, ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import VideoModal from './VideoModal';

const Media: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);

  const videos = [
    {
      id: 'vHGje0KVRoc',
      title: 'Pradivya Railway Toolkit Demo',
      description: 'Advanced Railway Detection System (ARDS) in action - real-time monitoring and inspection capabilities',
      thumbnail: `https://img.youtube.com/vi/vHGje0KVRoc/maxresdefault.jpg`,
      category: 'Railway Safety'
    },
    {
      id: 'CS1FrgSzlU8',
      title: 'AI-Powered Industrial Solutions',
      description: 'Need voideo Comprehensive overview of Pradivya\'s AI-driven predictive maintenance and safety solutions',
      thumbnail: `https://img.youtube.com/vi/CS1FrgSzlU8/maxresdefault.jpg`,
      category: 'AI Solutions'
    },
    {
      id: '1cV3-WYoTdI',
      title: 'Smart Workplace Safety',
      description: 'KAVACH IoT wearable technology demonstrating real-time worker safety monitoring and alerts',
      thumbnail: `https://img.youtube.com/vi/1cV3-WYoTdI/maxresdefault.jpg`,
      category: 'IoT Safety'
    }
  ];

  const handleVideoClick = (video: { id: string; title: string }) => {
    setSelectedVideo(video);
  };

  const openYouTube = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div ref={ref} className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center justify-center px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
            <Video className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-600 font-medium">Media Gallery</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-pradivya-primary dark:text-white mb-4">
            See Our Technology in Action
          </h2>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Watch demonstrations of our AI-powered solutions transforming railway safety, 
            industrial automation, and workplace protection across various industries.
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Youtube className="h-4 w-4 mr-2 text-red-500" />
              <span>Live Demonstrations</span>
            </div>
            <div className="flex items-center">
              <Play className="h-4 w-4 mr-2 text-pradivya-accent" />
              <span>Real-world Applications</span>
            </div>
            <div className="flex items-center">
              <Video className="h-4 w-4 mr-2 text-pradivya-primary" />
              <span>Technology Showcases</span>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`group bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden cursor-pointer">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to a more reliable thumbnail URL if maxresdefault fails
                    e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                
                {/* Play Overlay */}
                <div 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => handleVideoClick({ id: video.id, title: video.title })}
                >
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-pradivya-accent/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {video.category}
                  </span>
                </div>

                {/* Duration Badge (placeholder) */}
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                    HD
                  </span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-pradivya-primary dark:text-white mb-3 group-hover:text-pradivya-accent transition-colors">
                  {video.title}
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {video.description}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleVideoClick({ id: video.id, title: video.title })}
                    className="flex-1 bg-pradivya-primary hover:bg-pradivya-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Watch Now
                  </button>
                  
                  <button
                    onClick={() => openYouTube(video.id)}
                    className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                    title="Open in YouTube"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-pradivya-accent/10 rounded-full p-3">
                <Youtube className="h-8 w-8 text-pradivya-accent" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-pradivya-primary dark:text-white mb-4">
              Want to See More?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Subscribe to our YouTube channel for the latest technology demonstrations, 
              case studies, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://youtube.com/@workersupport"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                <Youtube className="h-5 w-5 mr-2" />
                Subscribe on YouTube
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-pradivya-accent text-pradivya-accent hover:bg-pradivya-accent hover:text-white rounded-lg font-medium transition-colors"
              >
                <Video className="h-5 w-5 mr-2" />
                Request Custom Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoId={selectedVideo.id}
          title={selectedVideo.title}
        />
      )}
    </section>
  );
};

export default Media;
