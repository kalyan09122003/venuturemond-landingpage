import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MessageCircle, Clock, User, Headphones } from "lucide-react";
import type { SupportTicket, TicketMessage } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SupportTicketsProps {
  tickets: SupportTicket[];
  loading?: boolean;
}

const statusVariants = {
  open: "warning",
  in_progress: "default",
  closed: "success",
} as const;

const priorityVariants = {
  low: "secondary",
  medium: "warning",
  high: "destructive",
} as const;

export function SupportTickets({ tickets, loading }: SupportTicketsProps) {
  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("medium");
  const [creating, setCreating] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const handleCreateTicket = async () => {
    if (!newSubject || !newMessage) return;
    
    setCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCreating(false);
    setNewTicketModalOpen(false);
    setNewSubject("");
    setNewMessage("");
    toast({
      title: "Ticket Created",
      description: "Your support ticket has been submitted successfully.",
    });
  };

  const handleReply = async () => {
    if (!replyMessage) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
    setReplyMessage("");
    toast({
      title: "Reply Sent",
      description: "Your message has been sent to support.",
    });
  };

  if (loading) {
    return (
      <Card variant="glass">
        <CardHeader>
          <div className="h-6 w-32 skeleton rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 rounded-lg border border-border">
              <div className="h-5 w-48 skeleton rounded mb-2" />
              <div className="h-4 w-32 skeleton rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card variant="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Support Tickets</CardTitle>
          <Button onClick={() => setNewTicketModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            New Ticket
          </Button>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="mx-auto text-muted-foreground mb-3" size={40} />
              <p className="text-muted-foreground">No support tickets yet</p>
              <Button variant="outline" className="mt-4" onClick={() => setNewTicketModalOpen(true)}>
                Create your first ticket
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className="p-4 rounded-lg border border-border/30 hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{ticket.subject}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="font-mono">{ticket.id}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(ticket.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={priorityVariants[ticket.priority]}>
                        {ticket.priority}
                      </Badge>
                      <Badge variant={statusVariants[ticket.status]}>
                        {ticket.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Ticket Modal */}
      <Dialog open={newTicketModalOpen} onOpenChange={setNewTicketModalOpen}>
        <DialogContent className="glass-strong">
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>
              Describe your issue and our team will respond shortly
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Subject</label>
              <Input
                placeholder="Brief description of your issue"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Priority</label>
              <Select value={newPriority} onValueChange={(v: "low" | "medium" | "high") => setNewPriority(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Message</label>
              <Textarea
                placeholder="Describe your issue in detail..."
                rows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTicketModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTicket} disabled={!newSubject || !newMessage || creating}>
              {creating ? "Submitting..." : "Submit Ticket"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ticket Thread Modal */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="glass-strong max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{selectedTicket?.subject}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant={priorityVariants[selectedTicket?.priority || "medium"]}>
                  {selectedTicket?.priority}
                </Badge>
                <Badge variant={statusVariants[selectedTicket?.status || "open"]}>
                  {selectedTicket?.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
            <DialogDescription>
              Ticket {selectedTicket?.id} • Created {selectedTicket && new Date(selectedTicket.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="space-y-4">
              {/* Messages */}
              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin pr-2">
                {selectedTicket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "p-3 rounded-lg",
                      message.sender === "user"
                        ? "bg-primary/10 ml-8"
                        : "bg-secondary mr-8"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === "user" ? (
                        <User size={14} className="text-primary" />
                      ) : (
                        <Headphones size={14} className="text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {message.sender === "user" ? "You" : "Support"} •{" "}
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                ))}
              </div>

              {/* Reply */}
              {selectedTicket.status !== "closed" && (
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your reply..."
                    rows={2}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleReply} disabled={!replyMessage}>
                    Send
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
