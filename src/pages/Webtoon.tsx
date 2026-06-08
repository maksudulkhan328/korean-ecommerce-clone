import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/portal/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Star } from 'lucide-react';

const Webtoon = () => {
  const { t } = useLanguage();

  const webtoons = [
    {
      id: '1',
      title: 'Tower of God',
      author: 'SIU',
      genre: 'Action, Fantasy',
      rating: 4.8,
      episodes: 500,
      status: 'ongoing',
      thumbnail: '🗼',
      subscribers: '2.5M',
    },
    {
      id: '2',
      title: 'The Beginning After The End',
      author: 'TurtleMe',
      genre: 'Fantasy, Adventure',
      rating: 4.9,
      episodes: 180,
      status: 'ongoing',
      thumbnail: '⚔️',
      subscribers: '3.2M',
    },
    {
      id: '3',
      title: 'Solo Leveling',
      author: 'Chugong',
      genre: 'Action, Fantasy',
      rating: 4.95,
      episodes: 179,
      status: 'completed',
      thumbnail: '👤',
      subscribers: '5.1M',
    },
    {
      id: '4',
      title: 'Omniscient Reader',
      author: 'singNsong',
      genre: 'Action, Fantasy',
      rating: 4.85,
      episodes: 150,
      status: 'ongoing',
      thumbnail: '📖',
      subscribers: '4.3M',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('webtoon')}</h1>
          <p className="text-muted-foreground">
            Read the latest webtoons and manhwa
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">{t('all')}</TabsTrigger>
            <TabsTrigger value="ongoing">{t('ongoing')}</TabsTrigger>
            <TabsTrigger value="completed">{t('completed')}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {webtoons.map((webtoon) => (
                <Card key={webtoon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                    {webtoon.thumbnail}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="line-clamp-1">{webtoon.title}</CardTitle>
                      <Badge variant={webtoon.status === 'ongoing' ? 'default' : 'secondary'}>
                        {webtoon.status}
                      </Badge>
                    </div>
                    <CardDescription>by {webtoon.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{webtoon.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{webtoon.episodes} {t('episodes')}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {webtoon.genre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {webtoon.subscribers} subscribers
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">{t('readNow')}</Button>
                      <Button variant="outline">{t('subscribe')}</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ongoing" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {webtoons.filter(w => w.status === 'ongoing').map((webtoon) => (
                <Card key={webtoon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                    {webtoon.thumbnail}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{webtoon.title}</CardTitle>
                    <CardDescription>by {webtoon.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{webtoon.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{webtoon.episodes} {t('episodes')}</span>
                      </div>
                    </div>
                    <Button className="w-full">{t('readNow')}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {webtoons.filter(w => w.status === 'completed').map((webtoon) => (
                <Card key={webtoon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                    {webtoon.thumbnail}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{webtoon.title}</CardTitle>
                    <CardDescription>by {webtoon.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{webtoon.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{webtoon.episodes} {t('episodes')}</span>
                      </div>
                    </div>
                    <Button className="w-full">{t('readNow')}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Webtoon;
