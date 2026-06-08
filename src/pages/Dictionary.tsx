import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/portal/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Volume2, BookOpen, Star } from 'lucide-react';

const Dictionary = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = () => {
    // Mock search result
    setSearchResult({
      word: 'serendipity',
      phonetic: '/ˌserənˈdɪpɪti/',
      partOfSpeech: 'noun',
      definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
      examples: [
        'A fortunate stroke of serendipity brought the two old friends together after years.',
        'The invention came about through pure serendipity.',
      ],
      synonyms: ['chance', 'luck', 'fortune', 'providence'],
      antonyms: ['misfortune', 'bad luck'],
    });
  };

  const recentSearches = ['ephemeral', 'ubiquitous', 'serendipity', 'pragmatic', 'eloquent'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('dictionary')}</h1>
          <p className="text-muted-foreground">
            Look up word definitions, meanings, and usage
          </p>
        </div>

        {/* Search Box */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter a word to look up..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>{t('search')}</Button>
            </div>

            {/* Recent Searches */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Recent searches:</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((word) => (
                  <Badge
                    key={word}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => {
                      setSearchTerm(word);
                      handleSearch();
                    }}
                  >
                    {word}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Result */}
        {searchResult && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{searchResult.word}</CardTitle>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{searchResult.phonetic}</span>
                    <Button variant="ghost" size="icon">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Star className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Part of Speech & Definition */}
              <div>
                <Badge className="mb-3">{searchResult.partOfSpeech}</Badge>
                <h3 className="font-semibold mb-2">{t('definition')}</h3>
                <p className="text-muted-foreground leading-relaxed">{searchResult.definition}</p>
              </div>

              {/* Examples */}
              <div>
                <h3 className="font-semibold mb-3">{t('examples')}</h3>
                <div className="space-y-2">
                  {searchResult.examples.map((example: string, index: number) => (
                    <div key={index} className="flex gap-3 items-start">
                      <BookOpen className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                      <p className="text-muted-foreground italic">{example}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synonyms */}
              {searchResult.synonyms && searchResult.synonyms.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Synonyms</h3>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.synonyms.map((synonym: string) => (
                      <Badge key={synonym} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        {synonym}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Antonyms */}
              {searchResult.antonyms && searchResult.antonyms.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Antonyms</h3>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.antonyms.map((antonym: string) => (
                      <Badge key={antonym} variant="outline" className="cursor-pointer hover:bg-muted">
                        {antonym}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Word of the Day */}
        {!searchResult && (
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle>Word of the Day</CardTitle>
              <CardDescription>February 4, 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-bold mb-2">Ephemeral</h3>
              <p className="text-muted-foreground mb-3">/ɪˈfɛm(ə)r(ə)l/</p>
              <Badge className="mb-3">adjective</Badge>
              <p className="text-muted-foreground leading-relaxed">
                Lasting for a very short time; transitory.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchTerm('ephemeral');
                handleSearch();
              }}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
