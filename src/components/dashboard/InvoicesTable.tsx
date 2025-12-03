import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, CreditCard, Search, FileText } from "lucide-react";
import type { Invoice } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";

interface InvoicesTableProps {
  invoices: Invoice[];
  loading?: boolean;
}

const statusVariants = {
  paid: "success",
  pending: "warning",
  overdue: "destructive",
} as const;

export function InvoicesTable({ invoices, loading }: InvoicesTableProps) {
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.id.toLowerCase().includes(search.toLowerCase()) ||
    invoice.orderId.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (invoice: Invoice) => {
    toast({
      title: "Download Started",
      description: `Downloading ${invoice.id}.pdf`,
    });
  };

  const handlePay = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setProcessing(false);
    setPaymentModalOpen(false);
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully.",
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-64 skeleton rounded" />
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="h-12 skeleton" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 border-t border-border skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="rounded-xl border border-border overflow-hidden glass">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Invoice ID</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No invoices found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="border-border">
                    <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.orderId}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[invoice.status]}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${invoice.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          <FileText size={16} />
                        </Button>
                        {invoice.status !== "paid" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setPaymentModalOpen(true);
                            }}
                          >
                            <CreditCard size={16} />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(invoice)}
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      <Dialog open={!!selectedInvoice && !paymentModalOpen} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="glass-strong">
          <DialogHeader>
            <DialogTitle>Invoice {selectedInvoice?.id}</DialogTitle>
            <DialogDescription>Tax breakdown and details</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-medium">{selectedInvoice.orderId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge variant={statusVariants[selectedInvoice.status]}>
                    {selectedInvoice.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Invoice Date</p>
                  <p className="font-medium">{new Date(selectedInvoice.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Due Date</p>
                  <p className="font-medium">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${selectedInvoice.taxBreakdown.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax ({selectedInvoice.taxBreakdown.taxRate}%)</span>
                  <span>${selectedInvoice.taxBreakdown.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${selectedInvoice.taxBreakdown.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1" onClick={() => handleDownload(selectedInvoice)}>
                  <Download size={16} className="mr-2" />
                  Download PDF
                </Button>
                {selectedInvoice.status !== "paid" && (
                  <Button variant="success" className="flex-1" onClick={() => setPaymentModalOpen(true)}>
                    <CreditCard size={16} className="mr-2" />
                    Pay Now
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="glass-strong">
          <DialogHeader>
            <DialogTitle>Pay Invoice {selectedInvoice?.id}</DialogTitle>
            <DialogDescription>Complete your payment securely</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                <p className="text-sm text-muted-foreground">Amount Due</p>
                <p className="text-2xl font-bold">${selectedInvoice.taxBreakdown.total.toLocaleString()}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Card Number</label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Expiry</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">CVC</label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePay}
                disabled={processing}
              >
                {processing ? (
                  <>Processing...</>
                ) : (
                  <>Pay ${selectedInvoice.taxBreakdown.total.toLocaleString()}</>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Payments are processed securely via Stripe
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
