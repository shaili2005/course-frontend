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
        setSelected(data[0]);
      });
  }, []);

  return (
    <div className="app">

      <div className="navbar">
        <div>TechLearn</div>
        <div className="nav-links">
          <span>Learn</span>
          <span>Build</span>
          <span>Dashboard</span>
        </div>
      </div>

      <div className="main">

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