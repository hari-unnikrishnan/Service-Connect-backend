import React, { useState } from "react";
import "./ChatDetails.css";
import { ArrowLeft, Phone, Search, Paperclip, Mic,Send } from "lucide-react";

export default function ChatDetails({ onNavigateBack }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, Nicholas Good Evening 😀", time: "10:45", type: "sent" },
    { id: 2, text: "How was your UI/UX Design Course Like.? 😀", time: "12:45", type: "sent" },
    { id: 3, text: "Hi, Morning too Ronald", time: "15:29", type: "received" },
    { id: 4, images: true, time: "15:52", type: "received" },
    { id: 5, text: "Hello, i also just finished the Sketch Basic ⭐⭐⭐⭐☆", time: "15:29", type: "received" },
    { id: 6, text: "OMG, This is Amazing..", time: "13:59", type: "sent" }

  ]);

  // SEND MESSAGE
  const handleSend = () => {
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "sent"
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessage("");

    // AUTO REPLY
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Auto reply 👍",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "received"
        }
      ]);
    }, 1000);
  };

  // FILE UPLOAD
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newMsg = {
      id: Date.now(),
      file: URL.createObjectURL(file),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "sent"
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  // VOICE INPUT
  const handleVoice = () => {
    if (!window.webkitSpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript);
    };

    recognition.start();
  };

  return (
    <div className="chat-details">

      {/* HEADER */}
      <div className="chat-headerss">
        <button className="back-btn" onClick={onNavigateBack}> &#8249; </button >

        <h3>Virginia M. Patterson</h3>

        <div className="header-icons">
          <Phone size={18} className="Phone-icons" />
          <Search size={18} />
        </div>
      </div>

      {/* DATE */}
      <div className="date-label">Today</div>

      {/* MESSAGES */}
      <div className="messages">
        {messages.map((msg, index) => {
          const prevMsg = messages[index - 1];
          const isFirstInGroup = !prevMsg || prevMsg.type !== msg.type;

          return (
            <div
              key={msg.id}
              className={`msg ${msg.type} ${isFirstInGroup ? "first" : ""}`}
            >
              {msg.file ? (
                <img src={msg.file} alt="upload" className="img-boxss" />
                ) : msg.images ? (
                <div className="img-group">
                    <div className="img-boxss"></div>
                    <div className="img-boxss"></div>
                </div>
                ) : (
                <p>{msg.text}</p>
                )}

              <span className="time">{msg.time}</span>
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="chat-input">

        {/* HIDDEN FILE INPUT */}
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFile}
        />

        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        {/* ATTACH */}
        <Paperclip
          size={18}
          className="attach"
          onClick={() => document.getElementById("fileInput").click()}
        />

        {/* MIC */}
        <button className="mic-btn" onClick={handleVoice}>
          <Mic size={18} />
        </button>

        {/* SEND */}
        <button className="send-btn" onClick={handleSend}>
            <Send size={18} />
            </button>
      </div>

    </div>
  );
}