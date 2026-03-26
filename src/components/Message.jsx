const Message = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: "12px",
    }}>
      <div style={{
        maxWidth: "70%",
        padding: "12px 16px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        backgroundColor: isUser ? "#4f46e5" : "#f0f2f5",
        color: isUser ? "white" : "#1a1a1a",
        fontSize: "14px",
        lineHeight: "1.5",
      }}>
        {content}
      </div>
    </div>
  );
};

export default Message;