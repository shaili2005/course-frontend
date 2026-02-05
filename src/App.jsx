import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import "./App.css";

/* ---------- PAGES ---------- */

function Learn({ topics, selected, setSelected }) {
  return (
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
  );
}

function Build() {
  return (
    <div className="page">
      <h1>Build</h1>
      <p>Build page content</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p>Dashboard content</p>
    </div>
  );
}

/* ---------- MAIN APP ---------- */

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
    <Router>
      <div className="app">

        {/* NAVBAR */}
        <div className="navbar">
          <div>TechLearn</div>

          <div className="nav-links">
            <Link to="/">Learn</Link>
            <Link to="/build">Build</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route
            path="/"
            element={
              <Learn
                topics={topics}
                selected={selected}
                setSelected={setSelected}
              />
            }
          />
          <Route path="/build" element={<Build />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;