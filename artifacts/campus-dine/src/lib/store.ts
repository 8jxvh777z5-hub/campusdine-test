import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Order, User } from "./data";

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CD-${timestamp}-${random}`;
}

interface AuthState {
  currentUser: User | null;
  users: User[];
  login: (mobile: string, password: string) => boolean;
  register: (user: Omit<User, "id">) => boolean;
  logout: () => void;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (menuItemId: string, size?: string) => void;
  updateQuantity: (menuItemId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
}

interface OrderState {
  orders: Order[];
  placeOrder: (
    userId: string,
    items: CartItem[],
    paymentMethod: Order["paymentMethod"]
  ) => Order;
}

interface AppState extends AuthState, CartState, OrderState {}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      currentUser: null,
      users: [],

      login: (mobile, password) => {
        const users = get().users;
        const user = users.find(
          (u) => u.mobile === mobile && u.password === password
        );
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },

      register: (userData) => {
        const users = get().users;
        if (users.some((u) => u.mobile === userData.mobile)) {
          return false;
        }
        const newUser: User = { ...userData, id: crypto.randomUUID() };
        set({ users: [...users, newUser], currentUser: newUser });
        return true;
      },

      logout: () => set({ currentUser: null, items: [] }),

      // Cart
      items: [],

      addItem: (newItem) => {
        const items = get().items;
        const key = newItem.menuItemId + (newItem.size || "");
        const existing = items.find(
          (i) => i.menuItemId + (i.size || "") === key
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.menuItemId + (i.size || "") === key
                ? { ...i, quantity: i.quantity + newItem.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (menuItemId, size) => {
        const key = menuItemId + (size || "");
        set({
          items: get().items.filter(
            (i) => i.menuItemId + (i.size || "") !== key
          ),
        });
      },

      updateQuantity: (menuItemId, quantity, size) => {
        const key = menuItemId + (size || "");
        if (quantity <= 0) {
          get().removeItem(menuItemId, size);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.menuItemId + (i.size || "") === key ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      // Orders
      orders: [],

      placeOrder: (userId, items, paymentMethod) => {
        const order: Order = {
          id: generateOrderId(),
          userId,
          items: [...items],
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          paymentMethod,
          status: "placed",
          createdAt: new Date().toISOString(),
        };
        set({ orders: [...get().orders, order] });
        return order;
      },
    }),
    {
      name: "campus-dine-store",
    }
  )
);
