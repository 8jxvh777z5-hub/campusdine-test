import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, User, LogOut, Menu, X, UtensilsCrossed } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface HeaderProps {
  onCartOpen: () => void;
  onAuthOpen: (mode: "login" | "register") => void;
}

export function Header({ onCartOpen, onAuthOpen }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { currentUser, logout, getCount } = useAppStore();
  const [location, navigate] = useLocation();
  const cartCount = getCount();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  const navLinks = [
    { href: "/menu", label: "Menu" },
    { href: "/orders", label: "My Orders" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-primary">Campus</span>
              <span className="text-xl font-bold text-foreground">Dine</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={onCartOpen}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-foreground max-w-[120px] truncate">
                    {currentUser.fullName.split(" ")[0]}
                  </span>
                </button>
                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-border z-20 overflow-hidden">
                      <div className="px-4 py-3 border-b border-border bg-muted/30">
                        <p className="font-semibold text-foreground">{currentUser.fullName}</p>
                        <p className="text-sm text-muted-foreground truncate">{currentUser.email}</p>
                        <p className="text-sm text-muted-foreground">{currentUser.mobile}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-sm text-foreground"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-sm text-destructive w-full text-left border-t border-border"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAuthOpen("login")}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onAuthOpen("register")}
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!currentUser && (
              <button
                onClick={() => {
                  onAuthOpen("login");
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors text-left"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
