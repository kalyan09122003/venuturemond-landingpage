import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Building2, Receipt, MapPin, Users, Calendar, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Company Details", icon: Building2 },
  { id: 2, title: "Tax Information", icon: Receipt },
  { id: 3, title: "Billing Address", icon: MapPin },
  { id: 4, title: "Team Setup", icon: Users },
  { id: 5, title: "Go-Live Date", icon: Calendar },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form data
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [taxId, setTaxId] = useState("");
  const [taxType, setTaxType] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [teamSeats, setTeamSeats] = useState("3");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [goLiveDate, setGoLiveDate] = useState("");

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    toast({
      title: "Setup Complete!",
      description: "Your account has been configured successfully.",
    });
    navigate("/dashboard");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Company Name</label>
              <Input
                placeholder="Acme Corporation"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Industry</label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Company Size</label>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Tax ID Type</label>
              <Select value={taxType} onValueChange={setTaxType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gst">GST (India)</SelectItem>
                  <SelectItem value="vat">VAT (EU)</SelectItem>
                  <SelectItem value="ein">EIN (US)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Tax ID Number</label>
              <Input
                placeholder="Enter your tax ID"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Your tax ID will be used for invoicing and tax compliance purposes.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Street Address</label>
              <Input
                placeholder="123 Business Street"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">City</label>
                <Input
                  placeholder="New York"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Postal Code</label>
                <Input
                  placeholder="10001"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Country</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Number of Team Seats</label>
              <Select value={teamSeats} onValueChange={setTeamSeats}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 seat</SelectItem>
                  <SelectItem value="3">3 seats</SelectItem>
                  <SelectItem value="5">5 seats</SelectItem>
                  <SelectItem value="10">10 seats</SelectItem>
                  <SelectItem value="25">25 seats</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Primary Contact Name</label>
              <Input
                placeholder="John Doe"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Primary Contact Email</label>
              <Input
                type="email"
                placeholder="john@company.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Desired Go-Live Date</label>
              <Input
                type="date"
                value={goLiveDate}
                onChange={(e) => setGoLiveDate(e.target.value)}
              />
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-medium mb-2">Ready to Launch!</h4>
              <p className="text-sm text-muted-foreground">
                Once you complete the setup, our team will review your configuration and reach out to schedule your onboarding call.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <Card variant="glassStrong" className="w-full max-w-2xl relative animate-fade-up">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="VentureMond Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold text-gradient">VentureMond</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-6" />

          {/* Step indicators */}
          <div className="flex justify-between">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isComplete = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center gap-2",
                    isCurrent ? "text-primary" : isComplete ? "text-success" : "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      isCurrent ? "bg-primary/20 border-2 border-primary" :
                        isComplete ? "bg-success/20" : "bg-secondary"
                    )}
                  >
                    {isComplete ? <Check size={18} /> : <StepIcon size={18} />}
                  </div>
                  <span className="text-xs hidden md:block">{step.title}</span>
                </div>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <CardTitle className="text-xl mb-2">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about your company"}
              {currentStep === 2 && "Add your tax information for invoicing"}
              {currentStep === 3 && "Where should we send invoices?"}
              {currentStep === 4 && "Configure your team access"}
              {currentStep === 5 && "When would you like to go live?"}
            </CardDescription>
          </div>

          {renderStepContent()}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>

            {currentStep === steps.length ? (
              <Button onClick={handleComplete} disabled={loading}>
                {loading ? "Completing..." : "Complete Setup"}
                <Check size={16} className="ml-2" />
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Continue
                <ArrowRight size={16} className="ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
