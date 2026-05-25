import { useState, useCallback } from "react";

/* ─── STATIC METRIC CARDS ─────────────────────────────── */
const topMetrics = [
  {
    label: "Overall Risk Score",
    value: "7.2/10",
    sub: "Medium Severity",
    icon: "",
    color: "var(--blue-light)",
    bg: "rgba(59,91,219,0.1)",
    border: "rgba(59,91,219,0.25)",
  },
  {
    label: "High Risk Paths",
    value: "24",
    pct: "17.4%",
    sub: "of total paths",
    icon: "",
    color: "var(--blue-light)",
    bg: "rgba(59,91,219,0.1)",
    border: "rgba(59,91,219,0.25)",
  },
  {
    label: "Medium Risk Paths",
    value: "61",
    pct: "44.2%",
    sub: "of total paths",
    icon: "",
    color: "var(--blue-light)",
    bg: "rgba(59,91,219,0.1)",
    border: "rgba(59,91,219,0.25)",
  },
  {
    label: "Low Risk Paths",
    value: "53",
    pct: "38.4%",
    sub: "of total paths",
    icon: "",
    color: "var(--blue-light)",
    bg: "rgba(59,91,219,0.1)",
    border: "rgba(59,91,219,0.25)",
  },
  {
    label: "Files Analyzed",
    value: "138",
    sub: "across 7 modules",
    icon: "",
    color: "var(--blue-light)",
    bg: "rgba(59,91,219,0.1)",
    border: "rgba(59,91,219,0.25)",
  },
];

/* ─── SKELETON LOADERS ────────────────────────────────── */
const SkeletonRow = () => (
  <tr>
    {[180, 120, 90, 80, 220, 220].map((w, i) => (
      <td key={i}>
        <div style={{
          height: 13,
          borderRadius: 6,
          width: w,
          maxWidth: "100%",
          background: "linear-gradient(90deg, var(--bg-surface) 25%, var(--bg-card-hover) 50%, var(--bg-surface) 75%)",
          backgroundSize: "400% 100%",
          animation: "shimmer 1.4s infinite",
        }} />
      </td>
    ))}
  </tr>
);

const SkeletonSummary = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {[100, 92, 96, 84, 68].map((w, i) => (
      <div key={i} style={{
        height: 13,
        borderRadius: 6,
        width: `${w}%`,
        background: "linear-gradient(90deg, var(--bg-surface) 25%, var(--bg-card-hover) 50%, var(--bg-surface) 75%)",
        backgroundSize: "400% 100%",
        animation: `shimmer 1.4s ${i * 0.12}s infinite`,
      }} />
    ))}
  </div>
);

/* ─── SCORE BADGE ─────────────────────────────────────── */
const ScoreBadge = ({ score }) => {
  const n = parseFloat(score);
  const color = n >= 8 ? "var(--negative)" : n >= 6 ? "#f59f00" : "var(--positive)";
  const bg    = n >= 8 ? "rgba(229,72,77,0.12)" : n >= 6 ? "rgba(245,159,0,0.12)" : "rgba(47,186,110,0.12)";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: "3px 10px", borderRadius: 99,
      background: bg, color,
      fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700,
      border: `1px solid ${color}44`,
    }}>
      {score}
    </span>
  );
};

/* ─── RISK LEVEL BADGE ────────────────────────────────── */
const RiskBadge = ({ level }) => {
  const cfg = {
    High:   { cls: "badge-danger",   dot: "var(--negative)" },
    Medium: { cls: "badge-warning",  dot: "#f59f00" },
    Low:    { cls: "badge-success",  dot: "var(--positive)" },
  };
  const c = cfg[level] || cfg.Low;
  return (
    <span className={`badge ${c.cls}`}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: c.dot, display: "inline-block",
        boxShadow: `0 0 6px ${c.dot}`,
      }} />
      {level}
    </span>
  );
};

/* ─── SUMMARY CARD ────────────────────────────────────── */
const SummaryCard = ({ title, icon, content, loading, accent }) => (
  <div className="dash-card" style={{
    borderTop: `2px solid ${accent}`,
    minHeight: 180,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <span style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${accent}18`, border: `1px solid ${accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
      }}>{icon}</span>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
        color: "var(--text-muted)", textTransform: "uppercase",
      }}>{title}</span>
    </div>
    {loading
      ? <SkeletonSummary />
      : (
        <div
          style={{
            fontSize: 14, lineHeight: 1.85, color: "var(--text-secondary)",
            animation: "fadeInUp 0.4s ease both",
          }}
          dangerouslySetInnerHTML={{
            __html: (content || "")
              .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary);font-weight:600">$1</strong>')
              .replace(/`(.*?)`/g, '<code style="font-family:\'DM Mono\',monospace;font-size:12px;background:var(--bg-surface);padding:1px 6px;border-radius:4px;color:var(--accent)">' + "$1" + '</code>'),
          }}
        />
      )
    }
  </div>
);

/* ─── MAIN COMPONENT ──────────────────────────────────── */
const AIRisk = () => {
  const [tableData,    setTableData]    = useState([]);
  const [summaries,    setSummaries]    = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [sumLoading,   setSumLoading]   = useState({});
  const [tableError,   setTableError]   = useState(null);
  const [hasRun,       setHasRun]       = useState(false);

  const callClaude = async (userPrompt, systemPrompt) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    return data.content?.find(b => b.type === "text")?.text || "";
  };

  const runScan = useCallback(async () => {
    setHasRun(true);
    setTableData([]);
    setSummaries({});
    setTableError(null);
    setTableLoading(true);
    setSumLoading({ aiSummary: true, riskSummary: true, coverageAnalysis: true, securityAnalysis: true });

    /* TABLE FETCH */
    try {
      const raw = await callClaude(
        `Generate exactly 6 high-risk code paths for a polyglot microservices codebase: auth-service (Java), payment-engine (Java), data-pipeline (Python), notification-svc (Node.js), api-gateway (Go), reporting-module (C++).
Return ONLY a valid JSON array. No markdown fences, no explanation, no trailing text.
Schema per object: { "file": string, "module": string, "riskLevel": "High"|"Medium"|"Low", "score": string (like "9.1/10"), "reason": string (max 12 words), "suggestion": string (max 14 words) }`,
        "You are a senior application security engineer. Output only raw valid JSON. Absolutely no markdown, no backticks, no preamble, no explanation."
      );
      const cleaned = raw.replace(/```(?:json)?|```/gi, "").trim();
      const parsed  = JSON.parse(cleaned);
      setTableData(Array.isArray(parsed) ? parsed.slice(0, 8) : []);
    } catch (e) {
      console.error(e);
      setTableError("Failed to load risk data — check your network and try again.");
    } finally {
      setTableLoading(false);
    }

    /* SUMMARIES — fire all 4 in parallel, update individually as each resolves */
    const codebaseCtx = "Codebase context: Java microservices (auth-service, payment-engine), Python data-pipeline, Node.js notification-svc, Go api-gateway, C++ reporting-module. Overall line coverage 78.5%, risk score 7.2/10, 24 high-risk uncovered paths, 2 critical security vulnerabilities (SQL injection, JWT auth bypass).";

    const tasks = [
      {
        key: "aiSummary",
        user: `${codebaseCtx}\n\nWrite a concise overall AI summary (3–4 sentences) of the codebase's quality and risk posture. Use **bold** for key metrics and \`backticks\` for file/module names.`,
        sys: "You are an AI code quality analyst. Be direct, insightful, and professional. Use **bold** for emphasis and `backticks` for code names. Plain prose only, no bullet points.",
      },
      {
        key: "riskSummary",
        user: `${codebaseCtx}\n\nWrite a risk summary (3–4 sentences) identifying the most dangerous uncovered code paths and their potential business impact. Use **bold** for key risk terms.`,
        sys: "You are a software risk analyst. Be precise and business-focused. Use **bold** for key terms. Plain prose, no bullet points.",
      },
      {
        key: "coverageAnalysis",
        user: `${codebaseCtx}\n\nWrite a coverage analysis (3–4 sentences) naming which modules have insufficient test coverage and prescribing what test types should be added. Use **bold** for module names and \`backticks\` for coverage percentages.`,
        sys: "You are a test engineering expert. Be technical and specific. Use **bold** for module names and `backticks` for metrics. Plain prose, no bullet points.",
      },
      {
        key: "securityAnalysis",
        user: `${codebaseCtx}\n\nWrite a security analysis (3–4 sentences) covering the critical vulnerabilities, attack vectors, and recommended remediations. Use **bold** for vulnerability names and attack types.`,
        sys: "You are an application security engineer. Be precise about attack vectors and mitigations. Use **bold** for vulnerability names. Plain prose, no bullet points.",
      },
    ];

    tasks.forEach(async ({ key, user, sys }) => {
      try {
        const text = await callClaude(user, sys);
        setSummaries(prev => ({ ...prev, [key]: text }));
      } catch {
        setSummaries(prev => ({ ...prev, [key]: "Unable to load this analysis. Please re-run the scan." }));
      } finally {
        setSumLoading(prev => ({ ...prev, [key]: false }));
      }
    });
  }, []);

  const isScanning = tableLoading || Object.values(sumLoading).some(Boolean);

  return (
    <div className="content-page">

      {/* ── PAGE HEADER ─────────────────────────── */}
      <div className="page-header animate-in">
        <div className="page-header-left">
          <p className="page-label">AI ANALYSIS</p>
          <h1>AI Risk Detection</h1>
        </div>
        {/* <button
          className="btn-primary"
          onClick={runScan}
          disabled={isScanning}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            opacity: isScanning ? 0.72 : 1,
            cursor: isScanning ? "not-allowed" : "pointer",
          }}
        >
          <span style={{ display: "inline-block", animation: isScanning ? "spin 0.9s linear infinite" : "none", fontSize: 16 }}>
            {isScanning ? "⟳" : "🔍"}
          </span>
          {isScanning ? "Scanning…" : hasRun ? "Re-run Scan" : "Run AI Scan"}
        </button> */}
      </div>

      {/* ── METRIC CARDS ────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 16,
        marginBottom: 36,
      }}>
        {topMetrics.map((m, i) => (
          <div
            key={m.label}
            className="animate-in"
            style={{
              animationDelay: `${i * 0.06}s`,
              background: m.bg,
              border: `1px solid ${m.border}`,
              borderRadius: 18,
              padding: "22px 20px",
              transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1), box-shadow 0.22s",
              cursor: "default",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = `0 14px 36px ${m.color}28`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 10 }}>{m.icon}</div>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
              color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6,
            }}>{m.label}</p>
            <div style={{
              fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em",
              fontFamily: "'DM Mono', monospace", color: m.color, marginBottom: 6,
            }}>{m.value}</div>
            {m.pct && (
              <div style={{
                display: "inline-flex", alignItems: "center",
                background: `${m.color}15`, border: `1px solid ${m.color}30`,
                borderRadius: 99, padding: "2px 9px", marginBottom: 4,
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: m.color, fontFamily: "'DM Mono', monospace" }}>
                  {m.pct}
                </span>
              </div>
            )}
            {!m.pct && <div style={{ height: 22 }} />}
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{m.sub}</p>
          </div>
        ))}
      </div>

      {/* ── RISK TABLE ──────────────────────────── */}
      <div className="animate-in animate-in-delay-2" style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 5 }}>
              AI GENERATED
            </p>
            <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.022em" }}>
              Top High-Risk Code Paths
            </h2>
          </div>
          {tableData.length > 0 && (
            <span style={{
              fontSize: 12, color: "var(--positive)", fontWeight: 600,
              background: "rgba(47,186,110,0.1)", border: "1px solid rgba(47,186,110,0.25)",
              padding: "4px 14px", borderRadius: 99,
            }}>
              ● {tableData.length} paths identified
            </span>
          )}
        </div>

        <div className="data-table" style={{ overflowX: "auto" }}>
          <table style={{ minWidth: 980 }}>
            <thead>
              <tr>
                <th style={{ minWidth: 190 }}>FILE &amp; FUNCTION</th>
                <th style={{ minWidth: 140 }}>MODULE</th>
                <th style={{ minWidth: 110 }}>RISK LEVEL</th>
                <th style={{ minWidth: 100 }}>RISK SCORE</th>
                <th style={{ minWidth: 220 }}>WHY IT'S RISKY</th>
                <th style={{ minWidth: 230 }}>AI SUGGESTION</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state */}
              {!hasRun && !tableLoading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "56px 20px" }}>
                    <div style={{ fontSize: 48, marginBottom: 14 }}>🤖</div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>No scan data yet</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 14 }}>Click "Run AI Scan" to analyze your codebase with AI</div>
                  </td>
                </tr>
              )}

              {/* Skeleton rows */}
              {tableLoading && [0,1,2,3,4,5].map(i => <SkeletonRow key={i} />)}

              {/* Error */}
              {tableError && !tableLoading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px 20px" }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>⚠️</div>
                    <div style={{ color: "var(--negative)", fontWeight: 600, marginBottom: 8 }}>{tableError}</div>
                    <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 20px" }} onClick={runScan}>
                      Retry
                    </button>
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!tableLoading && tableData.map((row, i) => (
                <tr key={i} style={{ animation: `fadeInUp 0.4s ${i * 0.055}s ease both` }}>
                  <td>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 12,
                      color: "var(--accent)",
                    }}>{row.file}</span>
                  </td>
                  <td>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 12,
                      color: "var(--blue-light)",
                    }}>{row.module}</span>
                  </td>
                  <td><RiskBadge level={row.riskLevel} /></td>
                  <td><ScoreBadge score={row.score} /></td>
                  <td style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {row.reason}
                  </td>
                  <td style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    <span style={{ marginRight: 5 }}>💡</span>{row.suggestion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── AI SUMMARIES ────────────────────────── */}
      {hasRun && (
        <div className="animate-in" style={{ marginTop: 4 }}>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 5 }}>
              AI GENERATED
            </p>
            <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.022em" }}>
              Analysis Reports
            </h2>
          </div>

          {/* AI Summary — full width */}
          <div style={{ marginBottom: 16 }}>
            <SummaryCard
              title="AI Summary"
              icon="🧠"
              content={summaries.aiSummary}
              loading={sumLoading.aiSummary}
              accent="var(--blue-light)"
            />
          </div>

          {/* Three column grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <SummaryCard
              title="Risk Summary"
              icon="🚨"
              content={summaries.riskSummary}
              loading={sumLoading.riskSummary}
              accent="var(--negative)"
            />
            <SummaryCard
              title="Coverage Analysis"
              icon="📊"
              content={summaries.coverageAnalysis}
              loading={sumLoading.coverageAnalysis}
              accent="#f59f00"
            />
            <SummaryCard
              title="Security Analysis"
              icon="🔒"
              content={summaries.securityAnalysis}
              loading={sumLoading.securityAnalysis}
              accent="var(--positive)"
            />
          </div>
        </div>
      )}

      {/* ── KEYFRAMES ───────────────────────────── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AIRisk;