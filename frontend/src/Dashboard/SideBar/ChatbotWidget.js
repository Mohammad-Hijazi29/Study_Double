import { useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
  
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
  
    try {
      const context = {
        "What is Node.js?": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript code server-side, enabling full-stack JavaScript applications.",
        "What is React?": "React is a JavaScript library for building user interfaces, primarily used for developing single-page applications. It allows developers to create reusable UI components.",
      };
  
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/distilbert-base-uncased-distilled-squad",
        {
          inputs: {
            question: input, 
            context: context[input] || "Sorry, I don't have a relevant context for that question.", // Use specific context or a fallback
          },
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const botMessage = {
        role: "assistant",
        content: response.data.answer || "I couldn't find an answer.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong." },
      ]);
    }
  
    setIsLoading(false);
  };
  
  

  return (
    <div style={{ position: "fixed", bottom: "20px", left: "10px" }}>
      <Button
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, rgb(100, 72, 255), rgb(0, 217, 173))",
          color: "white",
          minWidth: "unset",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SmartToyIcon fontSize="small" />
      </Button>

      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            bottom: "50px",
            left: "0",
            width: "220px",
            height: "360px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <div style={{ flexGrow: 1, overflowY: "auto", maxHeight: "320px" }}>
            {messages.map((msg, index) => (
              <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
                <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
              </p>
            ))}
          </div>

          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder={isLoading ? "Bot is typing..." : "Type a message..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => !isLoading && e.key === "Enter" && sendMessage()}
            disabled={isLoading}
          />
        </Box>
      )}
    </div>
  );
};

export default ChatbotWidget;
