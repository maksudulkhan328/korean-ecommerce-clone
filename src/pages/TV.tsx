import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/portal/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, ThumbsUp, Eye, Share2, Bookmark, Clock } from 'lucide-react';

const TV = () => {
  const { t } = useLanguage();

  const videos = [
    {
      id: '1',
      title: 'Understanding React Server Components',
      channel: 'Tech Academy',
      views: '1.2M',
      likes: '45K',
      duration: '15:32',
      thumbnail: '⚛️',
      category: 'Technology',
      uploadDate: '2 days ago',
    },
    {
      id: '2',
      title: 'Top 10 Travel Destinations 2026',
      channel: 'Travel Vlog',
      views: '850K',
      likes: '32K',
      duration: '12:45',
      thumbnail: '✈️',
      category: 'Travel',
      uploadDate: '1 week ago',
    },
    {
      id: '3',
      title: 'Cooking the Perfect Steak',
      channel: 'Chef\'s Kitchen',
      views: '2.1M',
      likes: '78K',
      duration: '8:20',
      thumbnail: '🥩',
      category: 'Food',
      uploadDate: '3 days ago',
    },
    {
      id: '4',
      title: 'Morning Yoga Routine',
      channel: 'Fitness Daily',
      views: '456K',
      likes: '18K',
      duration: '20:15',
      thumbnail: '🧘',
      category: 'Health',
      uploadDate: '5 days ago',
    },
    {
      id: '5',
      title: 'Latest Smartphone Reviews',
      channel: 'Tech Reviews',
      views: '3.2M',
      likes: '125K',
      duration: '18:50',
      thumbnail: '📱',
      category: 'Technology',
      uploadDate: '1 day ago',
    },
    {
      id: '6',
      title: 'Beautiful Nature Documentary',
      channel: 'Nature HD',
      views: '5.4M',
      likes: '210K',
      duration: '45:00',
      thumbnail: '🌿',
      category: 'Documentary',
      uploadDate: '2 weeks ago',
    },
  ];

  const categories = ['All', 'Technology', 'Travel', 'Food', 'Health', 'Documentary'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('tv')} - Videos</h1>
          <p className="text-muted-foreground">
            Watch trending videos and discover new content
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm">
              {category}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList>
            <TabsTrigger value="trending">{t('trendingNow')}</TabsTrigger>
            <TabsTrigger value="watchlist">{t('watchlist')}</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl cursor-pointer">
                    {video.thumbnail}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <Play className="h-16 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{video.title}</CardTitle>
                    <CardDescription>
                      <span>{video.channel}</span>
                      <br />
                      <Badge variant="secondary" className="mt-2">{video.category}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{video.views} {t('views')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Play className="mr-2 h-4 w-4" />
                        {t('watch')}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.uploadDate}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="watchlist" className="mt-6">
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Bookmark className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                  <h3 className="text-xl font-semibold mb-2">Your Watchlist is Empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Save videos to watch later
                  </p>
                  <Button>Explore Videos</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-6">
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Play className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                  <h3 className="text-xl font-semibold mb-2">No Subscriptions Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Subscribe to channels to see their latest videos
                  </p>
                  <Button>Browse Channels</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TV;
