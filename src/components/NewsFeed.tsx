
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Eye } from 'lucide-react';
import { useNews } from '@/hooks/useNews';
import { format } from 'date-fns';

const NewsFeed: React.FC = () => {
  const { data: newsItems, isLoading } = useNews();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white bg-opacity-10 backdrop-blur-md border-white border-opacity-20 overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray-700"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Latest News</h2>
        <div className="text-center text-white">
          <p>No news articles available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Latest News</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <Card 
            key={item.id} 
            className="bg-white bg-opacity-10 backdrop-blur-md border-white border-opacity-20 overflow-hidden hover:bg-opacity-20 transition-all duration-300 cursor-pointer group"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={item.image_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop'}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-gray-400 text-xs">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{format(new Date(item.created_at), 'yyyy-MM-dd')}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{item.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
