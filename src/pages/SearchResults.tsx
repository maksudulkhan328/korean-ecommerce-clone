
import { useSearchParams } from "react-router-dom";
import Header from "@/components/portal/Header";
import SearchBar from "@/components/portal/SearchBar";
import { ArrowRight, Star, Search, Image, Newspaper, MapPin, MoreVertical, BookOpen, ShoppingBag, PlayCircle } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Mock results
  const results = [
    {
      id: 1,
      title: `${query} - Official Site`,
      url: `https://www.example.com/${query}`,
      description: `Official website for ${query}. Find the latest news, updates, and products related to ${query}. Join our community today!`,
      rating: 4.8,
    },
    {
      id: 2,
      title: `Buy ${query} Online | Best Prices`,
      url: `https://shop.example.com/${query}`,
      description: `Shop for ${query} at the best prices. Free shipping on orders over $50. Huge selection of ${query} available now.`,
      rating: 4.5,
    },
    {
      id: 3,
      title: `${query} Reviews and Ratings`,
      url: `https://reviews.example.com/${query}`,
      description: `Read unbiased reviews and ratings for ${query}. Compare features, prices, and user feedback before you buy.`,
      rating: 4.2,
    },
    {
      id: 4,
      title: `Latest News about ${query}`,
      url: `https://news.example.com/${query}`,
      description: `Breaking news and in-depth analysis on ${query}. Stay ahead of the curve with our comprehensive coverage.`,
      rating: 4.0,
    },
    {
      id: 5,
      title: `Images for ${query}`,
      url: `https://images.example.com/${query}`,
      description: `See high-quality images and photos of ${query}. Browse our extensive gallery.`,
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b border-border bg-card shadow-sm sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-0">
          <SearchBar initialQuery={query} />

          <div className="flex items-center gap-6 mt-4 overflow-x-auto scrollbar-hide">
            {[
              { label: "All", icon: Search, active: true },
              { label: "News", icon: Newspaper },
              { label: "Images", icon: Image },
              { label: "Videos", icon: PlayCircle },
              { label: "Shopping", icon: ShoppingBag },
              { label: "Maps", icon: MapPin },
              { label: "Books", icon: BookOpen },
              { label: "More", icon: MoreVertical },
            ].map((tab) => (
              <button
                key={tab.label}
                className={`flex items-center gap-2 px-1 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${tab.active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-xl font-semibold mb-4">
              Search results for <span className="text-primary">"{query}"</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              About {results.length * 1500} results (0.42 seconds)
            </p>
          </div>

          <div className="space-y-8">
            {results.map((result) => (
              <div key={result.id} className="group cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground">{result.url}</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs ml-1 text-muted-foreground">{result.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl text-blue-600 font-medium group-hover:underline mb-2">
                  {result.title}
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {result.description}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                    Similar pages <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h3 className="font-semibold mb-4">Related Searches</h3>
            <div className="flex flex-wrap gap-2">
              {['cheap', 'best', 'review', '2026', 'guide', 'tutorial'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm cursor-pointer hover:bg-secondary/80 transition-colors">
                  {query} {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-portal-blue/10 rounded-xl p-6 border border-primary/10">
            <h3 className="font-semibold mb-2">Shop for {query}</h3>
            <p className="text-sm text-muted-foreground mb-4">Find the best deals on our shopping platform.</p>
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              View Products
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
