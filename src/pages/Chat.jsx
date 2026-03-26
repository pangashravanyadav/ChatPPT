import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { sendMessage } from "../services/api";
import Message from "../components/Message";

const Chat = () => {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };

    // Show user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage({
        content: input,
        conversationId: `convo-${user.id}`,
      });

      // Add AI reply
      setMessages((prev) => [...prev, res.data.message]);

    } catch (err) {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Send on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>ChatPPT</h2>
        <div style={styles.headerRight}>
          <span style={styles.userName}>👤 {user?.name}</span>
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={styles.messages}>
        {messages.length === 0 && (
          <p style={styles.empty}>Send a message to start chatting!</p>
        )}
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <Message role="assistant" content="Thinking..." />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          type="text"
          placeholder="Type a message... (Enter to send)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          style={styles.sendBtn}
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#4f46e5",
    color: "white",
  },
  headerTitle: { margin: 0 },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  userName: { fontSize: "14px" },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "white",
    color: "#4f46e5",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: "40px",
  },
  inputArea: {
    display: "flex",
    gap: "12px",
    padding: "16px 24px",
    backgroundColor: "white",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  sendBtn: {
    padding: "12px 24px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Chat;