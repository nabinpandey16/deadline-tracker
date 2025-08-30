import React, { useState, useEffect } from "react";

function Countdown({ deadline, title }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(deadline) - new Date();
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "10px" }}>
      <h2>{title}</h2>
      <p>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
}

export default function App() {
  const [deadlines, setDeadlines] = useState(() => {
    const saved = localStorage.getItem("deadlines");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const quotes = [
    "Keep going, you're closer than you think!",
    "Every small step counts.",
    "Dream big. Work hard. Stay focused.",
    "Discipline beats motivation."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const addDeadline = () => {
    if (!title || !date) return;
    const newDeadline = { title, deadline: date };
    const updated = [...deadlines, newDeadline];
    setDeadlines(updated);
    localStorage.setItem("deadlines", JSON.stringify(updated));
    setTitle("");
    setDate("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>📅 My Deadlines</h1>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Deadline title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addDeadline}>Add</button>
      </div>

      {deadlines.map((d, i) => (
        <Countdown key={i} title={d.title} deadline={d.deadline} />
      ))}

      <div style={{ marginTop: "30px", padding: "15px", background: "#f3f3f3", borderRadius: "8px", textAlign: "center", fontStyle: "italic" }}>
        "{randomQuote}"
      </div>
    </div>
  );
}
