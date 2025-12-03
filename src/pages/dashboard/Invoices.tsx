import { useEffect, useState } from "react";
import { InvoicesTable } from "@/components/dashboard/InvoicesTable";
import { fetchInvoices, type Invoice } from "@/lib/mock-data";

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices().then((result) => {
      setInvoices(result);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Invoices & Payments</h1>
        <p className="text-muted-foreground">View and manage your invoices and payment history.</p>
      </div>

      <InvoicesTable invoices={invoices} loading={loading} />
    </div>
  );
}
