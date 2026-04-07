import { User, Phone, Mail, LogOut, ShoppingBag } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useLocation } from "wouter";

export function ProfilePage() {
  const { currentUser, logout, orders } = useAppStore();
  const [_, navigate] = useLocation();

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-4">
          <User className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Not Logged In</h2>
        <p className="text-muted-foreground mb-6">
          Please login to view your profile
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const userOrders = orders.filter((o) => o.userId === currentUser.id);
  const totalSpent = userOrders.reduce((s, o) => s + o.total, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">My Profile</h1>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-5">
        <div className="bg-gradient-to-r from-primary to-orange-400 px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/25 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{currentUser.fullName}</h2>
              <p className="text-white/80 text-sm">Campus Dine Member</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 py-3 border-b border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Full Name</p>
              <p className="font-semibold text-foreground">{currentUser.fullName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 border-b border-border">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Mobile Number</p>
              <p className="font-semibold text-foreground">{currentUser.mobile}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Email ID</p>
              <p className="font-semibold text-foreground">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 text-center">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{userOrders.length}</p>
          <p className="text-sm text-muted-foreground mt-0.5">Total Orders</p>
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 text-center">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <span className="text-green-600 font-bold text-sm">₹</span>
          </div>
          <p className="text-2xl font-bold text-foreground">₹{totalSpent}</p>
          <p className="text-sm text-muted-foreground mt-0.5">Total Spent</p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-3 px-5 py-4 w-full hover:bg-muted transition-colors border-b border-border text-left"
        >
          <ShoppingBag className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">My Orders</p>
            <p className="text-xs text-muted-foreground">View order history</p>
          </div>
          <span className="ml-auto text-muted-foreground">→</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-4 w-full hover:bg-red-50 transition-colors text-left"
        >
          <LogOut className="w-5 h-5 text-destructive" />
          <div>
            <p className="font-medium text-destructive">Logout</p>
            <p className="text-xs text-muted-foreground">Sign out of your account</p>
          </div>
        </button>
      </div>
    </div>
  );
}
