import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { MENU_ITEMS, CATEGORY_LABELS, CATEGORY_ICONS, type MenuCategory } from "@/lib/data";
import { MenuItemCard } from "@/components/MenuItemCard";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as MenuCategory[];

interface MenuPageProps {
  onAuthRequired: () => void;
}

export function MenuPage({ onAuthRequired }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let items = MENU_ITEMS;
    if (activeCategory !== "all") {
      items = items.filter((i) => i.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, search]);

  const groupedItems = useMemo(() => {
    if (activeCategory !== "all" || search.trim()) {
      return null;
    }
    const groups: Partial<Record<MenuCategory, typeof MENU_ITEMS>> = {};
    for (const cat of CATEGORIES) {
      const items = MENU_ITEMS.filter((i) => i.category === cat);
      if (items.length) groups[cat] = items;
    }
    return groups;
  }, [activeCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Our Menu</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Fresh & delicious food from your college canteen
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search for food items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        <button
          onClick={() => setActiveCategory("all")}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
            activeCategory === "all"
              ? "bg-primary text-white border-primary shadow-sm"
              : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
          }`}
        >
          All Items
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            <span>{CATEGORY_ICONS[cat]}</span>
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Items */}
      {search.trim() || activeCategory !== "all" ? (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-lg font-semibold text-foreground">No items found</p>
              <p className="text-muted-foreground text-sm mt-1">
                Try a different search term or category
              </p>
            </div>
          ) : (
            <>
              {activeCategory !== "all" && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{CATEGORY_ICONS[activeCategory as MenuCategory]}</span>
                  <h2 className="text-xl font-bold text-foreground">
                    {CATEGORY_LABELS[activeCategory as MenuCategory]}
                  </h2>
                  <span className="text-sm text-muted-foreground">({filtered.length} items)</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAuthRequired={onAuthRequired} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="space-y-10">
          {groupedItems &&
            CATEGORIES.map((cat) => {
              const items = groupedItems[cat];
              if (!items?.length) return null;
              return (
                <section key={cat} id={`cat-${cat}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                      <h2 className="text-xl font-bold text-foreground">
                        {CATEGORY_LABELS[cat]}
                      </h2>
                    </div>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      View all →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {items.map((item) => (
                      <MenuItemCard key={item.id} item={item} onAuthRequired={onAuthRequired} />
                    ))}
                  </div>
                </section>
              );
            })}
        </div>
      )}
    </div>
  );
}
