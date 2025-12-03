import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 h-16 flex items-center justify-between border-b border-border/40 glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="VentureMond Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-gradient">VentureMond</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 px-6 text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-up">
            Manage your venture with <span className="text-gradient">precision</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            The all-in-one client dashboard for modern agencies and services. 
            Track orders, manage invoices, and collaborate with your team.
          </p>
          <div className="flex justify-center gap-4 pt-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link to="/catalog">
                Browse Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <Link to="/login">Client Login</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6 bg-secondary/20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { title: "Real-time Tracking", desc: "Monitor your project status and milestones in real-time." },
              { title: "Streamlined Billing", desc: "View invoices and manage payments effortlessly." },
              { title: "Dedicated Support", desc: "Get priority support directly from your dashboard." }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
                <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/40">
        © {new Date().getFullYear()} VentureMond. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;