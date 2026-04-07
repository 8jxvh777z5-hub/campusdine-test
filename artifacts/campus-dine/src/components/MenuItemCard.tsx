import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import type { MenuItem } from "@/lib/data";
import { useAppStore } from "@/lib/store";

interface MenuItemCardProps {
  item: MenuItem;
  onAuthRequired: () => void;
}

export function MenuItemCard({ item, onAuthRequired }: MenuItemCardProps) {
  const { addItem, currentUser } = useAppStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    item.sizes ? item.sizes[0].label : undefined
  );
  const [added, setAdded] = useState(false);

  const currentPrice = item.sizes
    ? item.sizes.find((s) => s.label === selectedSize)?.price ?? item.price
    : item.price;

  const handleAdd = () => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: currentPrice,
      quantity,
      size: selectedSize,
      category: item.category,
    });
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80";
          }}
        />
        <div className="absolute top-2 left-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              item.isVeg
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                item.isVeg ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {item.isVeg ? "Veg" : "Non-veg"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground text-base leading-tight">{item.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Size selector */}
        {item.hasSize && item.sizes && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.sizes.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size.label)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  selectedSize === size.label
                    ? "bg-primary text-white border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {size.label} — ₹{size.price}
              </button>
            ))}
          </div>
        )}

        {/* Price + actions */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-primary">₹{currentPrice}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add button */}
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                added
                  ? "bg-green-500 text-white scale-95"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              {added ? (
                <>
                  <span className="text-xs">Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
