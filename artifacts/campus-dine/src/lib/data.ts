export type MenuCategory =
  | "beverages"
  | "shakes-juices"
  | "cold-drinks"
  | "snacks"
  | "meals"
  | "desserts";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  hasSize?: boolean;
  hasPlatOption?: boolean;
  sizes?: { label: string; price: number }[];
  image: string;
  isVeg: boolean;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  category: MenuCategory;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  paymentMethod: "cod" | "upi" | "razorpay";
  status: "placed" | "preparing" | "ready" | "delivered";
  createdAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  beverages: "Beverages",
  "shakes-juices": "Shakes & Juices",
  "cold-drinks": "Cold Drinks",
  snacks: "Snacks",
  meals: "Meals",
  desserts: "Desserts",
};

export const CATEGORY_ICONS: Record<MenuCategory, string> = {
  beverages: "☕",
  "shakes-juices": "🥤",
  "cold-drinks": "🧊",
  snacks: "🍟",
  meals: "🍛",
  desserts: "🍮",
};

export const MENU_ITEMS: MenuItem[] = [
  // Beverages
  {
    id: "bev-1",
    name: "Tea",
    category: "beverages",
    price: 10,
    description: "Hot refreshing masala chai",
    image: "/food/tea.jpeg",
    isVeg: true,
  },
  {
    id: "bev-2",
    name: "Coffee with Sugar",
    category: "beverages",
    price: 20,
    description: "Freshly brewed coffee with sugar",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
    isVeg: true,
  },
  {
    id: "bev-3",
    name: "Black Coffee",
    category: "beverages",
    price: 20,
    description: "Strong black coffee, no milk",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80",
    isVeg: true,
  },
  {
    id: "bev-4",
    name: "Cold Coffee",
    category: "beverages",
    price: 40,
    description: "Chilled blended cold coffee",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 40 },
      { label: "Large", price: 55 },
    ],
  },
  // Shakes & Juices
  {
    id: "shk-1",
    name: "Banana Shake",
    category: "shakes-juices",
    price: 60,
    description: "Creamy fresh banana milkshake",
    image: "/food/shakes.jpeg",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 60 },
      { label: "Large", price: 80 },
    ],
  },
  {
    id: "shk-2",
    name: "Mango Shake",
    category: "shakes-juices",
    price: 70,
    description: "Thick and sweet mango milkshake",
    image: "/food/shakes.jpeg",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 70 },
      { label: "Large", price: 90 },
    ],
  },
  {
    id: "shk-3",
    name: "Chocolate Shake",
    category: "shakes-juices",
    price: 70,
    description: "Rich chocolate milkshake",
    image: "/food/shakes.jpeg",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 70 },
      { label: "Large", price: 90 },
    ],
  },
  {
    id: "shk-4",
    name: "Strawberry Shake",
    category: "shakes-juices",
    price: 70,
    description: "Fresh strawberry milkshake",
    image: "/food/shakes.jpeg",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 70 },
      { label: "Large", price: 90 },
    ],
  },
  {
    id: "shk-5",
    name: "Butterscotch Shake",
    category: "shakes-juices",
    price: 75,
    description: "Delicious butterscotch flavored shake",
    image: "/food/shakes.jpeg",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 75 },
      { label: "Large", price: 95 },
    ],
  },
  {
    id: "shk-6",
    name: "Mix Fruit Juice",
    category: "shakes-juices",
    price: 50,
    description: "Refreshing blend of seasonal fruits",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 50 },
      { label: "Large", price: 70 },
    ],
  },
  {
    id: "shk-7",
    name: "Beetroot Juice",
    category: "shakes-juices",
    price: 45,
    description: "Healthy fresh beetroot juice",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 45 },
      { label: "Large", price: 60 },
    ],
  },
  {
    id: "shk-8",
    name: "Orange Juice",
    category: "shakes-juices",
    price: 50,
    description: "Fresh squeezed orange juice",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 50 },
      { label: "Large", price: 65 },
    ],
  },
  // Cold Drinks
  {
    id: "cold-1",
    name: "Coke",
    category: "cold-drinks",
    price: 30,
    description: "Ice-cold Coca-Cola can",
    image: "/food/colddrinks.jpeg",
    isVeg: true,
  },
  {
    id: "cold-2",
    name: "Limca",
    category: "cold-drinks",
    price: 25,
    description: "Refreshing lemon-lime soda",
    image: "/food/colddrinks.jpeg",
    isVeg: true,
  },
  {
    id: "cold-3",
    name: "Pepsi",
    category: "cold-drinks",
    price: 30,
    description: "Chilled Pepsi cola",
    image: "/food/colddrinks.jpeg",
    isVeg: true,
  },
  {
    id: "cold-4",
    name: "Water Bottle",
    category: "cold-drinks",
    price: 20,
    description: "500ml mineral water",
    image: "/food/colddrinks.jpeg",
    isVeg: true,
  },
  {
    id: "cold-5",
    name: "Mountain Dew",
    category: "cold-drinks",
    price: 30,
    description: "Citrus flavored carbonated drink",
    image: "/food/colddrinks.jpeg",
    isVeg: true,
  },
  {
    id: "cold-6",
    name: "Sprite",
    category: "cold-drinks",
    price: 30,
    description: "Clear lemon-lime carbonated drink",
    image: "/food/colddrinks.jpeg",
    isVeg: true,
  },
  {
    id: "cold-7",
    name: "Fruit Beer",
    category: "cold-drinks",
    price: 40,
    description: "Non-alcoholic fruit flavored beer",
    image: "/food/colddrinks.jpeg",
    isVeg: true,
  },
  // Snacks
  {
    id: "snk-1",
    name: "Chips",
    category: "snacks",
    price: 20,
    description: "Crispy salted potato chips",
    image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400&q=80",
    isVeg: true,
  },
  {
    id: "snk-2",
    name: "Kurkure",
    category: "snacks",
    price: 20,
    description: "Spicy crunchy corn puffs",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&q=80",
    isVeg: true,
  },
  {
    id: "snk-3",
    name: "Mad Angles",
    category: "snacks",
    price: 25,
    description: "Triangular flavored corn snack",
    image: "/food/madangles.jpeg",
    isVeg: true,
  },
  // Meals
  {
    id: "meal-1",
    name: "Burger",
    category: "meals",
    price: 80,
    description: "Veg/Aloo tikki burger with fresh veggies",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80",
    isVeg: true,
  },
  {
    id: "meal-2",
    name: "Fries",
    category: "meals",
    price: 60,
    description: "Golden crispy French fries",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 60 },
      { label: "Large", price: 80 },
    ],
  },
  {
    id: "meal-3",
    name: "White Sauce Pasta",
    category: "meals",
    price: 90,
    description: "Creamy bechamel pasta with veggies",
    image: "/food/whitesaucepasta.jpeg",
    isVeg: true,
    hasPlatOption: true,
  },
  {
    id: "meal-4",
    name: "Red Sauce Pasta",
    category: "meals",
    price: 90,
    description: "Tangy tomato arrabbiata pasta",
    image: "/food/redsaucepasta.jpeg",
    isVeg: true,
    hasPlatOption: true,
  },
  {
    id: "meal-5",
    name: "Chilli Potato",
    category: "meals",
    price: 70,
    description: "Spicy Indo-Chinese crispy potatoes",
    image: "/food/chillipotato.jpeg",
    isVeg: true,
    hasPlatOption: true,
  },
  {
    id: "meal-6",
    name: "Dal Chawal",
    category: "meals",
    price: 80,
    description: "Home-style dal with steamed rice",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",
    isVeg: true,
    hasPlatOption: true,
    sizes: [
      { label: "Half Plate", price: 60 },
      { label: "Full Plate", price: 80 },
    ],
    hasSize: true,
  },
  {
    id: "meal-7",
    name: "Roti Thali",
    category: "meals",
    price: 100,
    description: "4 rotis with dal, sabzi and pickle",
    image: "/food/rotithali.jpeg",
    isVeg: true,
    hasPlatOption: true,
  },
  {
    id: "meal-8",
    name: "Paratha",
    category: "meals",
    price: 40,
    description: "Stuffed aloo or plain paratha with butter",
    image: "/food/paratha.jpeg",
    isVeg: true,
    hasPlatOption: true,
    sizes: [
      { label: "1 Piece", price: 40 },
      { label: "2 Pieces", price: 70 },
    ],
    hasSize: true,
  },
  {
    id: "meal-9",
    name: "Pizza",
    category: "meals",
    price: 120,
    description: "Veg cheese pizza with fresh toppings",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "Medium", price: 120 },
      { label: "Large", price: 180 },
    ],
  },
  {
    id: "meal-10",
    name: "Dal Rice",
    category: "meals",
    price: 70,
    description: "Comfort dal rice with ghee",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80",
    isVeg: true,
    hasPlatOption: true,
  },
  {
    id: "meal-11",
    name: "Shahi Paneer",
    category: "meals",
    price: 110,
    description: "Rich creamy paneer curry",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
    isVeg: true,
    hasPlatOption: true,
    sizes: [
      { label: "Half Plate", price: 80 },
      { label: "Full Plate", price: 110 },
    ],
    hasSize: true,
  },
  // Desserts
  {
    id: "des-1",
    name: "Gulab Jamun",
    category: "desserts",
    price: 30,
    description: "Soft fried dough balls in sugar syrup",
    image: "/food/gulabjamun.jpeg",
    isVeg: true,
    hasPlatOption: true,
    sizes: [
      { label: "2 Pieces", price: 30 },
      { label: "4 Pieces", price: 55 },
    ],
    hasSize: true,
  },
  {
    id: "des-2",
    name: "Ice Cream",
    category: "desserts",
    price: 40,
    description: "Scoops of vanilla, chocolate, or strawberry",
    image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=400&q=80",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "1 Scoop", price: 40 },
      { label: "2 Scoops", price: 70 },
    ],
  },
  {
    id: "des-3",
    name: "Pastries",
    category: "desserts",
    price: 50,
    description: "Freshly baked chocolate or pineapple pastry",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
    isVeg: true,
    hasSize: true,
    sizes: [
      { label: "1 Piece", price: 50 },
      { label: "2 Pieces", price: 90 },
    ],
  },
];
