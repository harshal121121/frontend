const buildStats = [
  { icon: "", label: "LAST BUILD",      value: "Success",  sub: "Completed 2 min ago", subClass: "pos" },
  { icon: "", label: "FAILED TESTS",    value: "3",        sub: "In 2 test suites",     subClass: "neg" },
  { icon: "", label: "AVG BUILD TIME",  value: "4m 12s",   sub: "↗ +18s from last wk", subClass: "neutral" },
  { icon: "", label: "SUCCESS RATE",    value: "92.9%",    sub: "156 of 168 builds",    subClass: "pos" },
];

const builds = [
  { id: "#1842", branch: "main",              commit: "a3f12e9", time: "4m 12s", status: "success", trigger: "Push",    ts: "2 min ago" },
  { id: "#1841", branch: "feature/payments",  commit: "b9c2d1f", time: "3m 58s", status: "success", trigger: "PR",      ts: "18 min ago" },
  { id: "#1840", branch: "fix/auth-bypass",   commit: "c1e8f0a", time: "2m 41s", status: "danger",  trigger: "Push",    ts: "1 hr ago" },
  { id: "#1839", branch: "main",              commit: "d5a3b7c", time: "4m 05s", status: "success", trigger: "Merge",   ts: "3 hr ago" },
  { id: "#1838", branch: "feature/reporting", commit: "e7f9012", time: "5m 33s", status: "warning", trigger: "Push",    ts: "5 hr ago" },
  { id: "#1837", branch: "main",              commit: "f0c4d8e", time: "3m 49s", status: "success", trigger: "Cron",    ts: "8 hr ago" },
  { id: "#1836", branch: "refactor/pipeline", commit: "012a3b4", time: "6m 11s", status: "danger",  trigger: "Push",    ts: "1 day ago" },
];

const statusLabel = { success: "Passed", warning: "Flaky", danger: "Failed" };

const Builds = () => (
  <div className="content-page">
    <div className="page-header animate-in">
      <div className="page-header-left">
        <p className="page-label">CI/CD</p>
        <h1>Build Monitoring</h1>
      </div>
      {/* <button className="btn-primary">Trigger Build</button> */}
    </div>

    <div className="card-grid" style={{ marginBottom: 32 }}>
      {buildStats.map((s) => (
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
            <th>BUILD</th>
            <th>BRANCH</th>
            <th>COMMIT</th>
            <th>DURATION</th>
            <th>TRIGGER</th>
            <th>TIMESTAMP</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {builds.map((b) => (
            <tr key={b.id}>
              <td style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 13 }}>{b.id}</td>
              <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--blue-light)" }}>{b.branch}</td>
              <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--text-muted)" }}>{b.commit}</td>
              <td style={{ fontFamily: "'DM Mono', monospace" }}>{b.time}</td>
              <td>
                <span className="badge badge-info">{b.trigger}</span>
              </td>
              <td style={{ color: "var(--text-muted)", fontSize: 13 }}>{b.ts}</td>
              <td>
                <span className={`badge badge-${b.status === "danger" ? "danger" : b.status === "warning" ? "warning" : "success"}`}>
                  ● {statusLabel[b.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Builds;