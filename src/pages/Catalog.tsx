import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";

// Mock public services
const services = [
  {
    id: "svc_1",
    title: "Enterprise Platform",
    description: "Full access to our enterprise management suite with dedicated resources.",
    price: "$2,499",
    period: "/month",
    features: ["Unlimited Users", "Priority Support", "Custom Integrations", "SLA Guarantee"],
    popular: true
  },
  {
    id: "svc_2",
    title: "Professional Tier",
    description: "Perfect for growing teams needing robust project tracking tools.",
    price: "$999",
    period: "/month",
    features: ["Up to 10 Users", "Email Support", "API Access", "Daily Backups"],
    popular: false
  },
  {
    id: "svc_3",
    title: "Starter Package",
    description: "Essential tools for small businesses just getting started.",
    price: "$499",
    period: "/month",
    features: ["Up to 3 Users", "Community Support", "Basic Analytics", "Weekly Reports"],
    popular: false
  }
];

export default function Catalog() {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 h-16 flex items-center border-b border-border/40 glass sticky top-0 z-50">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </header>

      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Service Catalog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your business growth.
            All plans include access to our client dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card key={service.id} className={`flex flex-col ${service.popular ? 'border-primary shadow-glow-sm' : ''}`}>
              <CardHeader>
                {service.popular && <Badge className="w-fit mb-2">Most Popular</Badge>}
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{service.price}</span>
                  <span className="text-muted-foreground">{service.period}</span>
                </div>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild variant={service.popular ? "default" : "outline"}>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}