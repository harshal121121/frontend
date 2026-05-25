import { useEffect, useState } from "react";

const metrics = [
  { label: "OVERALL COVERAGE", value: "78.5%", delta: "↗ +2.3% this week", type: "pos" },
  { label: "JAVA COVERAGE",    value: "82.1%", delta: "↗ +1.5%",            type: "pos" },
  { label: "C/C++ COVERAGE",   value: "71.3%", delta: "↘ -0.8%",            type: "neg" },
  { label: "BUILD SUCCESS",    value: "92.9%", delta: "156 / 168 builds",    type: "neutral" },
  { label: "AI RISK SCORE",    value: "7.2/10",delta: "Medium level",        type: "neutral" },
];

const modules = [
  { name: "Authentication",  pct: 94 },
  { name: "Payment Engine",  pct: 68 },
  { name: "API Gateway",     pct: 81 },
  { name: "Data Pipeline",   pct: 73 },
  { name: "Notification Svc",pct: 58 },
];

const activity = [
  { type: "success", text: <><strong>main build</strong> passed — 156 tests in 4m 12s</>, time: "2 min ago" },
  { type: "warning", text: <><strong>payment-service</strong> coverage dropped below threshold</>, time: "18 min ago" },
  { type: "success", text: <><strong>AI analysis</strong> complete — 3 new risk paths flagged</>, time: "1 hr ago" },
  { type: "error",   text: <><strong>notification-svc</strong> build failed on test:unit</>, time: "2 hr ago" },
  { type: "success", text: <><strong>v2.4.1</strong> deployed — quality gate passed</>, time: "4 hr ago" },
];

const Dashboard = () => {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="dash-page">
      <div className="dash-header animate-in">
        <p className="page-label">PLATFORM METRICS</p>
        <h1>Coverage at a glance</h1>
        <p>Real-time quality intelligence across all repositories</p>
      </div>

      {/* Metrics Row */}
      <div className="metrics-row">
        {metrics.map((m, i) => (
          <div
            className="metric-card"
            key={m.label}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <p className="metric-label">{m.label}</p>
            <div className="metric-value">{m.value}</div>
            <div className={`metric-delta ${m.type}`}>{m.delta}</div>
          </div>
        ))}
      </div>

      {/* Secondary Row */}
      <div className="dash-grid">
        {/* Module Coverage */}
        <div className="dash-card animate-in animate-in-delay-2">
          <p className="dash-card-title">Coverage by Module</p>
          {modules.map((mod) => (
            <div className="progress-item" key={mod.name}>
              <div className="progress-item-top">
                <span>{mod.name}</span>
                <span>{mod.pct}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: filled ? `${mod.pct}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="dash-card animate-in animate-in-delay-3">
          <p className="dash-card-title">Recent Activity</p>
          {activity.map((a, i) => (
            <div className="activity-item" key={i}>
              <div className={`activity-dot ${a.type}`} />
              <div>
                <div className="activity-text">{a.text}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;