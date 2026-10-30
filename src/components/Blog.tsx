import React from 'react';
import { useInView } from '../hooks/useInView';
import BlogPost from './BlogPost';

const posts = [
  {
    title: 'The Future of AI in Enterprise Applications',
    excerpt: 'Explore how artificial intelligence is transforming business operations and decision-making processes.',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 15, 2025',
    author: 'Sarah Williams',
    category: 'Artificial Intelligence',
  },
  {
    title: 'Building Scalable Systems: Best Practices',
    excerpt: 'Learn key architectural patterns and strategies for creating systems that scale with your business needs.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 8, 2025',
    author: 'Michael Chen',
    category: 'Engineering',
  },
  {
    title: 'Data Privacy in the Age of Machine Learning',
    excerpt: 'Understanding the challenges and solutions for maintaining data privacy while leveraging ML capabilities.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'May 1, 2025',
    author: 'Alex Johnson',
    category: 'Data Security',
  },
];

const Blog: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="blog" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div ref={ref} className="container mx-auto px-4 md:px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Insights & News
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Stay updated with our latest thinking, research findings, and company announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogPost 
              key={index}
              post={post}
              delay={index * 100}
              inView={isInView}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View all articles
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;