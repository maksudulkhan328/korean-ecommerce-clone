import { ChevronRight, ArrowRight, Smartphone, Monitor, Headphones, Camera, Watch, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const products = [
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 149999,
    originalPrice: 169999,
    discount: 12,
    vendor: "Daraz",
    icon: Smartphone
  },
  {
    name: "Nike Air Max 270",
    price: 15999,
    originalPrice: 18999,
    discount: 16,
    vendor: "Evaly",
    icon: Watch // Using Watch as generic accessory icon
  },
  {
    name: "MacBook Air M3",
    price: 159000,
    originalPrice: null,
    discount: null,
    vendor: "Pickaboo",
    icon: Monitor
  },
  {
    name: "Sony WH-1000XM5",
    price: 39999,
    originalPrice: 45000,
    discount: 11,
    vendor: "Othoba",
    icon: Headphones
  },
  {
    name: "Canon EOS R50",
    price: 95000,
    originalPrice: 105000,
    discount: 10,
    vendor: "Rokomari",
    icon: Camera
  },
];

const ShoppingSection = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-foreground" />
          <h2 className="text-xl font-bold text-foreground">{t("shoppingToday")}</h2>
          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{t("hot")}</span>
        </div>
        <a href="/shopping/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
          {t("viewAll")} <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <Link
            key={index}
            to={`/product/${index}`}
            className="group block bg-card rounded-xl border border-border p-4 hover:shadow-md transition-all"
          >
            <div className="relative w-full aspect-square mb-4 bg-secondary/50 rounded-lg flex items-center justify-center group-hover:bg-secondary transition-colors">
              {product.discount && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                  -{product.discount}%
                </span>
              )}
              <product.icon className="w-16 h-16 text-muted-foreground group-hover:scale-110 transition-transform" />
            </div>

            <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2 min-h-[40px]">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-lg font-bold text-portal-green">৳{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              {t("from")} <span className="font-semibold text-foreground">{product.vendor}</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShoppingSection;
