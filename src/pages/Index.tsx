import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Zap, FileText, LayoutDashboard, ShoppingCart, UserPlus } from "lucide-react";
import { ServiceCard } from "@/components/landing/ServiceCard";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { StepCard } from "@/components/landing/StepCard";
import { ScreenshotMockup } from "@/components/landing/ScreenshotMockup";
import { FooterLinks } from "@/components/landing/FooterLinks";

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
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Client Login
          </Link>
          <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-up">
            Manage your venture with <span className="text-gradient">precision</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            The all-in-one client portal to manage services, subscriptions, projects, billing, files, approvals and support — from one secure dashboard.
          </p>
          <div className="flex justify-center gap-4 pt-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity" asChild>
              <Link to="/catalog">
                Browse Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <Link to="/login">Client Login</Link>
            </Button>
          </div>
        </section>

        {/* Service Catalog Preview */}
        <section className="py-20 px-6 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from our range of professional services and SaaS solutions.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard
                title="MVP Development"
                description="Launch your product in weeks, not months. Full-stack development."
                price="$4,999"
                features={["React/Next.js Frontend", "Node/Python Backend", "Database Setup", "Deployment"]}
                icon={<LayoutDashboard className="h-6 w-6" />}
              />
              <ServiceCard
                title="Growth & GTM"
                description="Strategic marketing and go-to-market execution for startups."
                price="$2,499"
                features={["Market Analysis", "Campaign Strategy", "Content Plan", "Analytics Setup"]}
                icon={<Zap className="h-6 w-6" />}
              />
              <ServiceCard
                title="Workspace SaaS Pro"
                description="Complete project management and collaboration suite."
                price="$49"
                features={["Unlimited Projects", "Team Collaboration", "File Sharing", "Priority Support"]}
                icon={<Shield className="h-6 w-6" />}
              />
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link to="/catalog">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground">Start your journey with VentureMond in three simple steps.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border/50 -z-10"></div>

              <StepCard
                number={1}
                title="Choose a Service"
                description="Browse our catalog and select the plan that fits your needs."
                icon={<ShoppingCart className="h-8 w-8" />}
              />
              <StepCard
                number={2}
                title="Complete Onboarding"
                description="Fill out a quick questionnaire to kickstart your project."
                icon={<UserPlus className="h-8 w-8" />}
              />
              <StepCard
                number={3}
                title="Access Dashboard"
                description="Track progress, manage files, and communicate with your team."
                icon={<LayoutDashboard className="h-8 w-8" />}
              />
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 px-6 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why VentureMond?</h2>
              <p className="text-muted-foreground">Built for speed, transparency, and security.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                title="Transparent Billing"
                description="Automated invoices and clear pricing. No hidden fees or surprises."
                icon={<FileText className="h-6 w-6" />}
              />
              <FeatureCard
                title="Fast Provisioning"
                description="Get started immediately with our automated provisioning system."
                icon={<Zap className="h-6 w-6" />}
              />
              <FeatureCard
                title="Full Workspace"
                description="Integrated tasks, files, and approvals in one place."
                icon={<LayoutDashboard className="h-6 w-6" />}
              />
              <FeatureCard
                title="Enterprise Security"
                description="Bank-grade security with SSO, MFA, and audit logs."
                icon={<Shield className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>

        {/* Product Screenshot Gallery */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Client Dashboard</h2>
              <p className="text-muted-foreground">Everything you need to manage your engagement.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <ScreenshotMockup
                alt="Dashboard Overview"
                caption="Real-time overview of your projects and billing."
              />
              <ScreenshotMockup
                alt="Project Workspace"
                caption="Collaborate on tasks and approve deliverables."
              />
              <ScreenshotMockup
                alt="Orders & Invoices"
                caption="Track orders and download invoices instantly."
              />
              <ScreenshotMockup
                alt="Support Tickets"
                caption="Get 24/7 support with guaranteed SLAs."
              />
            </div>
          </div>
        </section>

        {/* Support / SLA Banner */}
        <section className="py-12 px-6 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-bold">Get 24/7 ticket support with guaranteed SLAs</h2>
            <p className="text-primary-foreground/80 text-lg">
              Track issues, escalate tickets, and view response times directly within your client dashboard.
            </p>
            <div className="pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/signup">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <FooterLinks />
    </div>
  );
};

export default Index;