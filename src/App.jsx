import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [topics, setTopics] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/topics`)
      .then(res => res.json())
      .then(data => {
        setTopics(data);
        setSelected(data[0]); // auto-select first topic
      });
  }, []);

  return (
    <div className="app">

      {/* NAVBAR */}
      <div className="navbar">
        <div>TechLearn</div>

        <div className="nav-links">
          <span>Learn</span>
          <span>Build</span>
          <span>Dashboard</span>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="main">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>Course Topics</h3>

          {topics.map(topic => (
            <button
              key={topic.id}
              className={selected?.id === topic.id ? "active" : ""}
              onClick={() => setSelected(topic)}
            >
              {topic.title}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="content">
          {selected && (
            <>
              <h1>{selected.title}</h1>
              <p>{selected.content}</p>
            </>
          )}
        </div>

      </div>

    </div>
  );
}

export default App;