import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/portal/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const Music = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);

  const songs = [
    {
      id: '1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      duration: '5:55',
      cover: '👑',
    },
    {
      id: '2',
      title: 'Imagine',
      artist: 'John Lennon',
      album: 'Imagine',
      duration: '3:03',
      cover: '🕊️',
    },
    {
      id: '3',
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      album: 'Thriller',
      duration: '4:54',
      cover: '🕺',
    },
    {
      id: '4',
      title: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California',
      duration: '6:30',
      cover: '🏨',
    },
    {
      id: '5',
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV',
      duration: '8:02',
      cover: '🎸',
    },
  ];

  const playlists = [
    { id: '1', name: 'My Favorites', count: 45, icon: '❤️' },
    { id: '2', name: 'Workout Mix', count: 32, icon: '💪' },
    { id: '3', name: 'Chill Vibes', count: 28, icon: '🌊' },
    { id: '4', name: 'Road Trip', count: 56, icon: '🚗' },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('music')} - Vibe</h1>
          <p className="text-muted-foreground">
            Your personal music streaming service
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Now Playing */}
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5">
              <CardHeader>
                <CardTitle>{t('nowPlaying')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center text-6xl">
                    {songs[currentSong].cover}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{songs[currentSong].title}</h3>
                    <p className="text-lg text-muted-foreground mb-1">{songs[currentSong].artist}</p>
                    <p className="text-sm text-muted-foreground">{songs[currentSong].album}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Queue */}
            <Card>
              <CardHeader>
                <CardTitle>Up Next</CardTitle>
                <CardDescription>Your current queue</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {songs.map((song, index) => (
                      <div
                        key={song.id}
                        onClick={() => setCurrentSong(index)}
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                          index === currentSong
                            ? 'bg-primary/10 border border-primary'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center text-2xl">
                          {song.cover}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{song.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{song.duration}</span>
                        <Button variant="ghost" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('playlist')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="text-3xl">{playlist.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium">{playlist.name}</p>
                        <p className="text-sm text-muted-foreground">{playlist.count} songs</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Create Playlist
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {songs.slice(0, 3).map((song) => (
                    <div key={`rec-${song.id}`} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center text-2xl">
                        {song.cover}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{song.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Fixed Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider defaultValue={[33]} max={100} step={1} />
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
              <span>1:23</span>
              <span>{songs[currentSong].duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Song Info */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center text-2xl">
                {songs[currentSong].cover}
              </div>
              <div className="hidden sm:block">
                <p className="font-medium">{songs[currentSong].title}</p>
                <p className="text-sm text-muted-foreground">{songs[currentSong].artist}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="h-10 w-10"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Repeat className="h-4 w-4" />
              </Button>
            </div>

            {/* Volume */}
            <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
              <Volume2 className="h-4 w-4" />
              <Slider defaultValue={[70]} max={100} step={1} className="w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
