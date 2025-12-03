import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Building2,
  CreditCard,
  Bell,
  Shield,
  User,
  Plus,
  Trash2,
} from "lucide-react";

export default function Settings() {
  const [saving, setSaving] = useState(false);
  
  // Company info
  const [companyName, setCompanyName] = useState("Acme Corporation");
  const [taxId, setTaxId] = useState("GST123456789");
  
  // Notification settings
  const [emailOrders, setEmailOrders] = useState(true);
  const [emailInvoices, setEmailInvoices] = useState(true);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account and billing preferences.</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="company" className="gap-2">
            <Building2 size={16} />
            <span className="hidden sm:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard size={16} />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell size={16} />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield size={16} />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and legal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tax ID (GST/VAT)</Label>
                  <Input
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Billing Address</Label>
                <Input placeholder="123 Business Street" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input placeholder="City" />
                <Input placeholder="State" />
                <Input placeholder="Postal Code" />
                <Input placeholder="Country" />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods for automatic billing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing card */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                    <CreditCard size={16} className="text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Default</Badge>
                  <Button variant="ghost" size="icon">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus size={16} className="mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your recent billing transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Jan 15, 2024", amount: "$2,499", status: "Paid" },
                  { date: "Dec 15, 2023", amount: "$2,499", status: "Paid" },
                  { date: "Nov 15, 2023", amount: "$2,499", status: "Paid" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">{item.date}</span>
                    <span className="font-medium">{item.amount}</span>
                    <Badge variant="success">{item.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what emails you'd like to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                </div>
                <Switch checked={emailOrders} onCheckedChange={setEmailOrders} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Invoice Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified when invoices are ready</p>
                </div>
                <Switch checked={emailInvoices} onCheckedChange={setEmailInvoices} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing & Updates</p>
                  <p className="text-sm text-muted-foreground">Product updates and promotional offers</p>
                </div>
                <Switch checked={emailMarketing} onCheckedChange={setEmailMarketing} />
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage browser push notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Get real-time alerts in your browser</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your account password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <Shield size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="font-medium">2FA Enabled</p>
                    <p className="text-sm text-muted-foreground">Using authenticator app</p>
                  </div>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your active login sessions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { device: "Chrome on MacOS", location: "New York, US", current: true },
                { device: "Safari on iPhone", location: "New York, US", current: false },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-muted-foreground">{session.location}</p>
                    </div>
                  </div>
                  {session.current ? (
                    <Badge variant="success">Current</Badge>
                  ) : (
                    <Button variant="ghost" size="sm">Revoke</Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
