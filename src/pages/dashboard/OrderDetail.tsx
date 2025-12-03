import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProjectBoard } from "@/components/dashboard/ProjectBoard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { mockOrders, mockProjectMilestones } from "@/lib/mock-data";

export default function OrderDetail() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);

  const order = mockOrders.find((o) => o.id === orderId);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!order && !loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Order not found</h2>
        <p className="text-muted-foreground mb-4">The order you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/dashboard/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/dashboard/orders">
          <ArrowLeft size={16} className="mr-2" />
          Back to Orders
        </Link>
      </Button>

      <ProjectBoard
        orderId={order?.id || ""}
        orderName={order?.name || ""}
        milestones={mockProjectMilestones}
        loading={loading}
      />
    </div>
  );
}
