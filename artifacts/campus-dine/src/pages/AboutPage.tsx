import { UtensilsCrossed, Clock, MapPin, Phone, Shield, Star } from "lucide-react";

export function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-orange-400 to-amber-400 rounded-3xl p-8 md:p-12 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Campus Dine</h1>
              <p className="text-white/80">Your College Food Hub</p>
            </div>
          </div>
          <p className="text-white/90 text-lg max-w-2xl leading-relaxed">
            Campus Dine is the official food ordering platform for our college campus,
            designed to make your dining experience fast, convenient, and delightful.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {
            icon: Clock,
            title: "Quick Ordering",
            desc: "Order your meals in minutes without waiting in long queues at the canteen.",
            color: "bg-blue-50 text-blue-600",
          },
          {
            icon: Star,
            title: "Quality Food",
            desc: "All items are freshly prepared by our canteen staff with quality ingredients.",
            color: "bg-amber-50 text-amber-600",
          },
          {
            icon: Shield,
            title: "Safe & Secure",
            desc: "Your data and payments are secure with industry-standard encryption.",
            color: "bg-green-50 text-green-600",
          },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-6">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { step: "1", title: "Browse Menu", desc: "Explore our category-wise menu", icon: "🍽️" },
            { step: "2", title: "Add to Cart", desc: "Select items and quantity", icon: "🛒" },
            { step: "3", title: "Pay Online", desc: "Pay via UPI, card, or cash", icon: "💳" },
            { step: "4", title: "Pick Up", desc: "Collect from the canteen counter", icon: "✅" },
          ].map(({ step, title, desc, icon }) => (
            <div key={step} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl">
                {icon}
              </div>
              <div className="w-6 h-6 bg-primary text-white rounded-full text-xs font-bold flex items-center justify-center mx-auto mb-2">
                {step}
              </div>
              <h4 className="font-semibold text-foreground text-sm">{title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Contact & Location</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Location</p>
              <p className="text-muted-foreground text-sm mt-0.5">
                Main Canteen, Ground Floor<br />
                Academic Block, Campus
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Timings</p>
              <p className="text-muted-foreground text-sm mt-0.5">
                Mon–Sat: 8:00 AM – 8:00 PM<br />
                Sunday: 9:00 AM – 5:00 PM
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Contact</p>
              <p className="text-muted-foreground text-sm mt-0.5">
                canteen@college.edu<br />
                +91 98765 43210
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Menu</p>
              <p className="text-muted-foreground text-sm mt-0.5">
                Beverages, Shakes, Cold Drinks,<br />
                Snacks, Meals & Desserts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
