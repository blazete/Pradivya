import React from 'react';

interface BlogPostProps {
  post: {
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string;
    category: string;
  };
  delay: number;
  inView: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, delay, inView }) => {
  return (
    <article 
      className={`bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-500 transform ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } hover:shadow-lg hover:-translate-y-1`}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover" 
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {post.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {post.excerpt}
        </p>
        <a 
          href="#" 
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Read More →
        </a>
      </div>
    </article>
  );
};

export default BlogPost;