import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, Clock3, Mail, MailOpen, Search, Trash2 } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { EmptyState, ErrorState, LoadingState } from "../../components/common/StatusState";
import { adminApi } from "../../services/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [markingId, setMarkingId] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminApi.messages({ sort });
      setMessages(data.messages);
    } catch (requestError) {
      const message = requestError.response?.data?.message || "Could not load messages.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [sort]);

  const stats = useMemo(() => {
    const total = messages.length;
    const unread = messages.filter((message) => !message.isRead && !message.read).length;
    return { total, unread, read: total - unread };
  }, [messages]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return messages.filter((message) => [message.name, message.email, message.message].filter(Boolean).join(" ").toLowerCase().includes(term));
  }, [messages, search]);

  const markAsRead = async (target) => {
    if (target.isRead || target.read || markingId) return;
    const previousMessages = messages;
    setMarkingId(target._id);
    setMessages((current) => current.map((message) => (message._id === target._id ? { ...message, isRead: true, read: true } : message)));
    try {
      await adminApi.markMessageRead(target._id);
      toast.success("Message marked as read.");
    } catch (requestError) {
      setMessages(previousMessages);
      toast.error(requestError.response?.data?.message || "Could not mark message as read.");
    } finally {
      setMarkingId("");
    }
  };

  const remove = async () => {
    if (!deleting) return;
    try {
      await adminApi.deleteMessage(deleting._id);
      toast.success("Message deleted.");
      setDeleting(null);
      setMessages((current) => current.filter((message) => message._id !== deleting._id));
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || "Delete failed.");
    }
  };

  const statCards = [
    { label: "Total Messages", value: stats.total, icon: Mail },
    { label: "Unread Messages", value: stats.unread, icon: MailOpen },
    { label: "Read Messages", value: stats.read, icon: CheckCircle2 }
  ];

  return (
    <>
      <PageHeader eyebrow="Inbox" title="Contact messages" />
      <section className="message-metrics" aria-label="Message totals">
        {statCards.map(({ label, value, icon: Icon }) => (
          <article className="message-metric-card" key={label}>
            <Icon size={22} />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <div className="message-toolbar">
        <label className="message-search">
          <Search size={19} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search messages..." />
        </label>
        <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort messages">
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>

      {loading && <LoadingState label="Loading contact messages..." />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState title="No messages found" message="New contact form submissions will appear here." />
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="message-grid">
          {filtered.map((message) => {
            const received = new Date(message.createdAt);
            const hasDate = !Number.isNaN(received.getTime());
            const isRead = Boolean(message.isRead || message.read);

            return (
              <article className={`message-card ${isRead ? "is-read" : "is-unread"}`} key={message._id}>
                <div className="message-card-header">
                  <div>
                    <span className="message-label">Sender</span>
                    <h3>{message.name || "Unknown sender"}</h3>
                    <a href={`mailto:${message.email}`}>{message.email || "No email"}</a>
                  </div>
                  <span className={`message-status ${isRead ? "read" : "unread"}`}>{isRead ? "Read" : "Unread"}</span>
                </div>

                <div className="message-body">
                  <span className="message-label">Message</span>
                  <p>{message.message || "No message body."}</p>
                </div>

                <div className="message-meta">
                  <Clock3 size={16} />
                  <span>{hasDate ? received.toLocaleDateString() : "Unknown date"}</span>
                  <span>{hasDate ? received.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Unknown time"}</span>
                </div>

                <div className="message-actions">
                  <button className="mark-read-button" onClick={() => markAsRead(message)} disabled={isRead || markingId === message._id}>
                    <CheckCircle2 size={16} />
                    {isRead ? "Read" : markingId === message._id ? "Updating" : "Mark as Read"}
                  </button>
                  <button className="delete-message-button" onClick={() => setDeleting(message)}>
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete message?"
          message={`This will permanently remove the message from ${deleting.name || "this sender"}.`}
          onCancel={() => setDeleting(null)}
          onConfirm={remove}
        />
      )}
    </>
  );
}
