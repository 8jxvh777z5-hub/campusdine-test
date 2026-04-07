import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { HomePage } from "@/pages/HomePage";
import { MenuPage } from "@/pages/MenuPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AboutPage } from "@/pages/AboutPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);

  const openAuth = (mode: "login" | "register") => setAuthMode(mode);
  const closeAuth = () => setAuthMode(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-screen bg-background flex flex-col">
            <Header
              onCartOpen={() => setCartOpen(true)}
              onAuthOpen={openAuth}
            />
            <main className="flex-1">
              <Switch>
                <Route path="/" component={() => <HomePage onAuthOpen={openAuth} />} />
                <Route path="/menu" component={() => <MenuPage onAuthRequired={() => openAuth("login")} />} />
                <Route path="/orders" component={OrdersPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/about" component={AboutPage} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <footer className="bg-white border-t border-border py-6 text-center text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} Campus Dine — Your College Food Hub. Made with love for students.
              </p>
            </footer>
          </div>

          {/* Cart */}
          {cartOpen && (
            <CartDrawer
              onClose={() => setCartOpen(false)}
              onAuthRequired={() => {
                setCartOpen(false);
                openAuth("login");
              }}
            />
          )}

          {/* Auth modal */}
          {authMode && (
            <AuthModal
              mode={authMode}
              onClose={closeAuth}
              onModeChange={setAuthMode}
            />
          )}

          <Toaster />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
