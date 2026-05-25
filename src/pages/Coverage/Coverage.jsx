const stats = [
  { icon: "", label: "FRONTEND COVERAGE", value: "91%", sub: "↗ +3.2% this sprint", subClass: "pos" },
  { icon: "", label: "BACKEND COVERAGE",  value: "84%", sub: "↗ +1.1% this sprint", subClass: "pos" },
  { icon: "", label: "INTEGRATION TESTS", value: "79%", sub: "↘ -0.4% this sprint", subClass: "neg" },
  { icon: "", label: "BRANCH COVERAGE",   value: "72%", sub: "Needs attention",      subClass: "neutral" },
];

const tableData = [
  { module: "auth-service",       lang: "Java",       lines: "94.2%", branch: "88.1%", fn: "97.3%", status: "success" },
  { module: "payment-engine",     lang: "Java",       lines: "68.5%", branch: "62.0%", fn: "71.2%", status: "warning" },
  { module: "api-gateway",        lang: "Go",         lines: "81.3%", branch: "77.4%", fn: "83.9%", status: "success" },
  { module: "data-pipeline",      lang: "Python",     lines: "73.1%", branch: "68.9%", fn: "75.0%", status: "warning" },
  { module: "notification-svc",   lang: "Node.js",    lines: "58.4%", branch: "49.2%", fn: "61.8%", status: "danger"  },
  { module: "user-service",       lang: "Java",       lines: "89.7%", branch: "84.5%", fn: "91.2%", status: "success" },
  { module: "reporting-module",   lang: "C++",        lines: "71.3%", branch: "65.1%", fn: "74.8%", status: "warning" },
];

const statusLabel = { success: "Passing", warning: "At Risk", danger: "Critical" };

const Coverage = () => (
  <div className="content-page">
    <div className="page-header animate-in">
      <div className="page-header-left">
        <p className="page-label">ANALYTICS</p>
        <h1>Coverage Analytics</h1>
      </div>
      <button className="btn-primary">Export Report</button>
    </div>

    <div className="card-grid" style={{ marginBottom: 32 }}>
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-icon">{s.icon}</div>
          <p className="stat-label">{s.label}</p>
          <div className="stat-value">{s.value}</div>
          <p className={`stat-sub metric-delta ${s.subClass}`}>{s.sub}</p>
        </div>
      ))}
    </div>

    <div className="data-table animate-in animate-in-delay-2">
      <table>
        <thead>
          <tr>
            <th>MODULE</th>
            <th>LANGUAGE</th>
            <th>LINE COV.</th>
            <th>BRANCH COV.</th>
            <th>FUNCTION COV.</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.module}>
              <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 13 }}>{row.module}</td>
              <td>
                <span className="badge badge-info">{row.lang}</span>
              </td>
              <td style={{ fontFamily: "'DM Mono', monospace" }}>{row.lines}</td>
              <td style={{ fontFamily: "'DM Mono', monospace" }}>{row.branch}</td>
              <td style={{ fontFamily: "'DM Mono', monospace" }}>{row.fn}</td>
              <td>
                <span className={`badge badge-${row.status}`}>
                  {row.status === "success" ? "●" : row.status === "warning" ? "●" : "●"}
                  {" "}{statusLabel[row.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Coverage;