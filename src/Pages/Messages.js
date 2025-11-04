import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

export default function Messages() {
  const [msgs, setMsgs] = useState([]);
  const [reply, setReply] = useState("");

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://192.168.100.5:4000/api/chat/all/9");
        // ✅ use res.data.data instead of res.data
        setMsgs(res.data.data || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, []);

  // Handle reply
  const handleReply = async (messageId) => {
    if (!reply.trim()) return alert("Please type a reply first.");
    try {
      await axios.post(`http://192.168.100.5:4000/api/chat/respond`, {
        messageId,
        response: reply,
      });

      // Update messages after reply
      const res = await axios.get("http://192.168.100.5:4000/api/chat/all/9");
      setMsgs(res.data.data || []);
      setReply("");
    } catch (err) {
      console.error("Error replying:", err);
      alert("Failed to send reply");
    }
  };

  return (
     <Layout title="Messages">
    <div style={{ padding: "20px" }}>
      <h2>Messages</h2>
      {msgs.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        msgs.map((m) => (
          <div
            key={m.id}
            style={{
              background: "#fff",
              padding: 12,
              marginBottom: 10,
              borderRadius: 8,
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <b>From:</b> {m.User?.name || `User ${m.senderId}`}
            </div>
            <div>
              <b>Message:</b> {m.message}
            </div>
            <div>
              <b>Response:</b>{" "}
              {m.response ? (
                <span style={{ color: "green" }}>{m.response}</span>
              ) : (
                <i style={{ color: "gray" }}>(no reply yet)</i>
              )}
            </div>

            {/* Reply input */}
            <div style={{ marginTop: 8 }}>
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply..."
                style={{
                  padding: "8px 10px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  width: "70%",
                  marginRight: 10,
                }}
              />
              <button
                onClick={() => handleReply(m.id)}
                style={{
                  backgroundColor: "#16a34a",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    </Layout>
  );
}
