import { useLocation } from "wouter";
import { ArrowRight, Star, Clock, Shield } from "lucide-react";
import { CATEGORY_LABELS, CATEGORY_ICONS, type MenuCategory, MENU_ITEMS } from "@/lib/data";

interface HomePageProps {
  onAuthOpen: (mode: "login" | "register") => void;
}

const CATEGORIES = Object.keys(CATEGORY_LABELS) as MenuCategory[];

const FEATURED_ITEMS = MENU_ITEMS.filter((i) =>
  ["meal-9", "shk-2", "meal-11", "bev-4", "meal-1", "des-2"].includes(i.id)
);

export function HomePage({ onAuthOpen }: HomePageProps) {
  const [_, navigate] = useLocation();

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary via-orange-400 to-amber-300 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=60')] bg-cover bg-center mix-blend-multiply opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5">
              <span className="text-white text-sm font-medium">🍽️ College Canteen Made Digital</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Order Delicious Food
              <br />
              <span className="text-white/90">Right from Campus!</span>
            </h1>
            <p className="text-white/85 text-lg mb-8 leading-relaxed">
              Browse our full canteen menu, add to cart, and order online.
              Skip the queue — your food will be ready when you arrive.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/menu")}
                className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold text-base hover:bg-white/90 transition-colors shadow-lg"
              >
                Explore Menu
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onAuthOpen("register")}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-semibold text-base hover:bg-white/30 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: Clock,
              title: "Fast Ordering",
              desc: "Place order in under a minute",
              color: "bg-blue-50 text-blue-600",
            },
            {
              icon: Star,
              title: "Fresh Food",
              desc: "Prepared fresh every day",
              color: "bg-amber-50 text-amber-600",
            },
            {
              icon: Shield,
              title: "Secure Payments",
              desc: "COD, UPI & Online payment",
              color: "bg-green-50 text-green-600",
            },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-border shadow-sm"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">Browse by Category</h2>
            <button
              onClick={() => navigate("/menu")}
              className="text-sm text-primary font-medium hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => navigate("/menu")}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-border shadow-sm hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {CATEGORY_ICONS[cat]}
                </span>
                <span className="text-xs font-semibold text-foreground text-center leading-tight">
                  {CATEGORY_LABELS[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured items */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">Popular Items</h2>
            <button
              onClick={() => navigate("/menu")}
              className="text-sm text-primary font-medium hover:underline"
            >
              See full menu →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURED_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate("/menu")}
                className="flex items-center gap-4 bg-white rounded-2xl border border-border shadow-sm p-4 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=80";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-primary">
                      ₹{item.price}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.isVeg
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isVeg ? "Veg" : "Non-veg"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
