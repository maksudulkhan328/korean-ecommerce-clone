import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/portal/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Book, Bookmark, Star } from 'lucide-react';

const Series = () => {
  const { t } = useLanguage();

  const books = [
    {
      id: '1',
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      rating: 4.9,
      pages: 1178,
      cover: '📖',
      progress: 65,
      status: 'reading',
    },
    {
      id: '2',
      title: 'Harry Potter Series',
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      rating: 4.8,
      pages: 4224,
      cover: '🪄',
      progress: 100,
      status: 'completed',
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      rating: 4.7,
      pages: 328,
      cover: '👁️',
      progress: 0,
      status: 'not-started',
    },
    {
      id: '4',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      rating: 4.5,
      pages: 180,
      cover: '🎩',
      progress: 45,
      status: 'reading',
    },
    {
      id: '5',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      rating: 4.6,
      pages: 432,
      cover: '💕',
      progress: 80,
      status: 'reading',
    },
    {
      id: '6',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      rating: 4.7,
      pages: 310,
      cover: '🗻',
      progress: 100,
      status: 'completed',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('series')} - eBooks & Novels</h1>
          <p className="text-muted-foreground">
            Your digital library of books and novels
          </p>
        </div>

        {/* Currently Reading */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.filter(b => b.status === 'reading').map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-4">
                    <div className="w-20 h-28 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center text-4xl">
                      {book.cover}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2 mb-1">{book.title}</CardTitle>
                      <CardDescription>by {book.author}</CardDescription>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} />
                    </div>
                    <Button className="w-full">{t('continue')}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Books */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('all')} {t('series')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-5xl relative">
                  {book.cover}
                  {book.status === 'completed' && (
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {t('completed')}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold line-clamp-2 mb-1 text-sm">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{book.author}</p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{book.rating}</span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                  {book.progress > 0 && (
                    <Progress value={book.progress} className="h-1 mb-2" />
                  )}
                  <Button size="sm" className="w-full text-xs">
                    {book.status === 'not-started' ? t('readNow') : book.status === 'reading' ? t('continue') : 'Read Again'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Series;
