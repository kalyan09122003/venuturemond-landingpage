import { useEffect, useState } from "react";
import { SupportTickets } from "@/components/dashboard/SupportTickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockTickets, type SupportTicket } from "@/lib/mock-data";
import { MessageCircle, Book, Mail } from "lucide-react";

export default function Support() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTickets(mockTickets);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">Get help with your account and services.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets - 2/3 width */}
        <div className="lg:col-span-2">
          <SupportTickets tickets={tickets} loading={loading} />
        </div>

        {/* Help resources - 1/3 width */}
        <div className="space-y-4">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base">Quick Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Book size={16} className="mr-2" />
                Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle size={16} className="mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail size={16} className="mr-2" />
                Email Support
              </Button>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base">Support Hours</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Monday - Friday:</strong> 9am - 6pm EST</p>
              <p><strong className="text-foreground">Saturday:</strong> 10am - 4pm EST</p>
              <p><strong className="text-foreground">Sunday:</strong> Closed</p>
              <p className="pt-2">
                Average response time: <span className="text-success">2 hours</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
