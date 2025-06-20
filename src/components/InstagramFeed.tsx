import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import { useInstagramFeed } from '@/hooks/useInstagramFeed';

const InstagramFeed: React.FC = () => {
  const { data: posts, isLoading } = useInstagramFeed();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center mb-8">News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-white bg-opacity-10 backdrop-blur-md border-white border-opacity-20 overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-700 rounded w-16"></div>
                  <div className="h-4 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center mb-8">News</h2>
        <div className="text-center text-white">
          <p>No Instagram posts available yet.</p>
          <p className="text-sm text-gray-400 mt-2">Follow us @nilemgmt</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center mb-8">News</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post) => (
          <Card 
            key={post.id} 
            className="bg-white bg-opacity-10 backdrop-blur-md border-white border-opacity-20 overflow-hidden hover:bg-opacity-20 transition-all duration-300 cursor-pointer group"
            onClick={() => window.open(post.permalink, '_blank')}
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={post.media_url}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {post.media_type === 'VIDEO' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-3">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 space-y-3">
              <p className="text-white text-sm leading-relaxed line-clamp-3">
                {post.caption ? 
                  post.caption.length > 100 ? 
                    `${post.caption.substring(0, 100)}...` : 
                    post.caption 
                  : 'View on Instagram'
                }
              </p>
              
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.like_count?.toLocaleString() || 0}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments_count?.toLocaleString() || 0}</span>
                  </div>
                </div>
                
                <span className="text-xs">
                  {new Date(post.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <a
          href="https://www.instagram.com/nilemgmt/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
        >
          <span>Follow us on Instagram @nilemgmt</span>
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;
