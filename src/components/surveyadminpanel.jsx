import { useState, useEffect } from "react";

const API_BASE = "https://trendyhomevibe.com/wp-json/darsi-survey/v1"; // ← change this
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin";
// ─── Helpers ───────────────────────────────────────────────
const pct = (val, total) => (total ? Math.round((val / total) * 100) : 0);

function BarStat({ label, count, total, color = "#f97316" }) {
  const p = pct(count, total);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: "#cbd5e1", fontFamily: "Noto Sans Telugu, sans-serif" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>{count} <span style={{ color: "#64748b", fontWeight: 400 }}>({p}%)</span></span>
      </div>
      <div style={{ height: 7, background: "#1e293b", borderRadius: 99 }}>
        <div style={{ height: "100%", width: `${p}%`, background: color, borderRadius: 99, transition: "width 0.8s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function StatCard({ title, children, icon }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      border: "1px solid #1e293b",
      borderRadius: 16,
      padding: "20px 22px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function KpiCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      border: `1px solid ${color}33`,
      borderRadius: 16,
      padding: "22px 24px",
      boxShadow: `0 0 24px ${color}18`,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${color}22, transparent 70%)` }} />
      <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748b", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</p>
      <p style={{ margin: "0 0 4px", fontSize: 36, fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ margin: 0, fontSize: 12, color: "#475569" }}>{sub}</p>}
    </div>
  );
}

// ─── Login Screen ───────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setErr("");
    setLoading(true);
    setTimeout(() => {
      if (u === ADMIN_USER && p === ADMIN_PASS) {
        onLogin();
      } else {
        setErr("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
      padding: 20,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient blobs */}
      <div style={{ position: "absolute", top: "10%", left: "15%", width: 400, height: 400, background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "15%", width: 350, height: 350, background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 60, height: 60, borderRadius: 16,
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            boxShadow: "0 8px 32px rgba(249,115,22,0.35)",
            marginBottom: 16, fontSize: 28,
          }}>🗳️</div>
          <h1 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.5px" }}>Survey Admin</h1>
          <p style={{ margin: 0, fontSize: 14, color: "#475569" }}>Darsi Political Survey · BSR News</p>
        </div>

        {/* Card */}
        <div style={{
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          border: "1px solid #1e293b",
          borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}>
          <p style={{ margin: "0 0 24px", fontSize: 13, color: "#64748b", textAlign: "center" }}>Sign in to access the dashboard</p>

          {["Username", "Password"].map((label, i) => (
            <div key={label} style={{ marginBottom: i === 0 ? 16 : 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6, letterSpacing: "0.05em" }}>{label.toUpperCase()}</label>
              <input
                type={i === 1 ? "password" : "text"}
                value={i === 0 ? u : p}
                onChange={(e) => i === 0 ? setU(e.target.value) : setP(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder={i === 0 ? "Enter username" : "Enter password"}
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "11px 14px", borderRadius: 10,
                  border: `1.5px solid ${err ? "#ef4444" : "#1e293b"}`,
                  background: "#020617", color: "#f1f5f9",
                  fontSize: 14, outline: "none",
                  fontFamily: "system-ui, sans-serif",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#f97316"}
                onBlur={(e) => e.target.style.borderColor = err ? "#ef4444" : "#1e293b"}
              />
            </div>
          ))}

          {err && (
            <div style={{ background: "#450a0a", border: "1px solid #ef444466", borderRadius: 8, padding: "8px 12px", marginBottom: 16 }}>
              <p style={{ margin: 0, fontSize: 13, color: "#f87171" }}>⚠️ {err}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%", padding: "13px", borderRadius: 10, border: "none",
              background: loading ? "#374151" : "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white", fontSize: 15, fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 16px rgba(249,115,22,0.4)",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#1e293b" }}>
          BSR News · Darsi Political Survey Admin
        </p>
      </div>
    </div>
  );
}

// ─── Dashboard ──────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/stats`)
      .then((r) => r.json())
      .then((d) => { setStats(d); setTotal(d.total_responses); })
      .catch(() => {})
      .finally(() => setLoadingStats(false));
  }, []);

  useEffect(() => {
    if (tab !== "responses") return;
    setLoadingResults(true);
    fetch(`${API_BASE}/results?page=${page}`)
      .then((r) => r.json())
      .then((d) => {
        setResults(d.data || []);
        setTotalPages(d.total_pages || 1);
        setTotal(d.total || 0);
      })
      .catch(() => {})
      .finally(() => setLoadingResults(false));
  }, [tab, page]);

  const filtered = results.filter((r) =>
    search === "" ||
    Object.values(r).some((v) => v?.toString().toLowerCase().includes(search.toLowerCase()))
  );

  const COLORS = ["#f97316", "#3b82f6", "#10b981", "#a855f7", "#f43f5e"];

  const navItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "votes",    label: "Vote Analysis", icon: "🗳️" },
    { id: "leaders",  label: "Leadership", icon: "👤" },
    { id: "responses",label: "Responses", icon: "📋" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "system-ui, sans-serif", display: "flex" }}>

      {/* Sidebar */}
      <div style={{
        width: 220, background: "#0f172a", borderRight: "1px solid #1e293b",
        display: "flex", flexDirection: "column", padding: "24px 0",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
      }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🗳️</span>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#f1f5f9" }}>Survey Admin</p>
              <p style={{ margin: 0, fontSize: 11, color: "#475569" }}>BSR News</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 10, border: "none",
                background: tab === item.id ? "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.1))" : "transparent",
                color: tab === item.id ? "#f97316" : "#64748b",
                fontSize: 13, fontWeight: tab === item.id ? 700 : 500,
                cursor: "pointer", marginBottom: 4, textAlign: "left",
                borderLeft: `3px solid ${tab === item.id ? "#f97316" : "transparent"}`,
                transition: "all 0.15s",
              }}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: "1px solid #1e293b" }}>
          <div style={{ padding: "8px 12px", marginBottom: 8 }}>
            <p style={{ margin: 0, fontSize: 11, color: "#475569" }}>Signed in as</p>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>admin</p>
          </div>
          <button
            onClick={onLogout}
            style={{
              width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #1e293b",
              background: "transparent", color: "#64748b", fontSize: 13,
              cursor: "pointer", textAlign: "left", transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#ef4444"; e.target.style.color = "#ef4444"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "#1e293b"; e.target.style.color = "#64748b"; }}
          >
            🚪 Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: 220, flex: 1, padding: "28px 32px", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#f1f5f9" }}>
            {navItems.find((n) => n.id === tab)?.icon} {navItems.find((n) => n.id === tab)?.label}
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#475569" }}>
            Darsi Constituency · Real-time Survey Data
          </p>
        </div>

        {loadingStats && tab !== "responses" ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
            <div style={{ fontSize: 14, color: "#475569" }}>Loading data...</div>
          </div>
        ) : (
          <>
            {/* ── OVERVIEW TAB ── */}
            {tab === "overview" && stats && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                  <KpiCard label="Total Responses" value={stats.total_responses} sub="All time submissions" color="#f97316" />
                  <KpiCard label="Mandals Covered" value={stats.by_mandal?.length || 0} sub="Active mandals" color="#3b82f6" />
                  <KpiCard label="Top Vote Next" value={stats.by_vote_next?.[0]?.vote_next?.split(" ")[0] || "—"} sub={`${stats.by_vote_next?.[0]?.count || 0} votes`} color="#10b981" />
                  <KpiCard label="Top Sarpanch" value={stats.by_sarpanch?.[0]?.sarpanch_support || "—"} sub={`${stats.by_sarpanch?.[0]?.count || 0} responses`} color="#a855f7" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <StatCard title="Responses by Mandal" icon="📍">
                    {stats.by_mandal?.map((m, i) => (
                      <BarStat key={m.mandal} label={m.mandal} count={+m.count} total={stats.total_responses} color={COLORS[i % COLORS.length]} />
                    ))}
                  </StatCard>

                  <StatCard title="Age Distribution" icon="👥">
                    {stats.by_age?.map((a, i) => (
                      <BarStat key={a.age} label={a.age} count={+a.count} total={stats.total_responses} color={COLORS[i % COLORS.length]} />
                    ))}
                  </StatCard>

                  <StatCard title="Gender Breakdown" icon="⚖️">
                    {stats.by_gender?.map((g, i) => (
                      <BarStat key={g.gender} label={g.gender} count={+g.count} total={stats.total_responses} color={COLORS[i % COLORS.length]} />
                    ))}
                  </StatCard>

                  <StatCard title="Sarpanch Support" icon="🏘️">
                    {stats.by_sarpanch?.map((s, i) => (
                      <BarStat key={s.sarpanch_support} label={s.sarpanch_support} count={+s.count} total={stats.total_responses} color={COLORS[i % COLORS.length]} />
                    ))}
                  </StatCard>
                </div>
              </>
            )}

            {/* ── VOTES TAB ── */}
            {tab === "votes" && stats && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <StatCard title="2024 Vote (Past)" icon="🗓️">
                  {stats.by_voted_2024?.length ? stats.by_voted_2024.map((v, i) => (
                    <BarStat key={v.voted_2024} label={v.voted_2024} count={+v.count} total={stats.total_responses} color={COLORS[i % COLORS.length]} />
                  )) : <p style={{ color: "#475569", fontSize: 13 }}>No data yet</p>}
                </StatCard>

                <StatCard title="Next MLA Vote Intent" icon="🗳️">
                  {stats.by_vote_next?.map((v, i) => (
                    <BarStat key={v.vote_next} label={v.vote_next} count={+v.count} total={stats.total_responses} color={COLORS[i % COLORS.length]} />
                  ))}
                </StatCard>

                {/* Swing analysis */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <StatCard title="Vote Intent Summary" icon="📈">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginTop: 4 }}>
                      {stats.by_vote_next?.map((v, i) => (
                        <div key={v.vote_next} style={{
                          background: "#020617", borderRadius: 10, padding: "14px 16px",
                          border: `1px solid ${COLORS[i % COLORS.length]}33`,
                        }}>
                          <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748b", fontFamily: "Noto Sans Telugu, sans-serif" }}>{v.vote_next}</p>
                          <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: COLORS[i % COLORS.length] }}>{pct(+v.count, stats.total_responses)}%</p>
                          <p style={{ margin: 0, fontSize: 11, color: "#475569" }}>{v.count} votes</p>
                        </div>
                      ))}
                    </div>
                  </StatCard>
                </div>
              </div>
            )}

            {/* ── LEADERSHIP TAB ── */}
            {tab === "leaders" && stats && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { name: "గొట్టిపాటి లక్ష్మి", key: "gottipati_rating", icon: "👤" },
                  { name: "బాచేపల్లి శివప్రసాద్ రెడ్డి", key: "bachepalli_rating", icon: "👤" },
                ].map((leader) => {
                  const data = stats[leader.key] || [];
                  const good = data.find((d) => d[leader.key] === "బాగుంది");
                  const bad  = data.find((d) => d[leader.key] === "బాగలేదు");
                  const goodPct = pct(+(good?.count || 0), stats.total_responses);
                  const badPct  = pct(+(bad?.count || 0), stats.total_responses);

                  return (
                    <StatCard key={leader.key} title={leader.name} icon={leader.icon}>
                      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                        <div style={{ flex: 1, background: "#020617", borderRadius: 10, padding: "16px", border: "1px solid #10b98133", textAlign: "center" }}>
                          <p style={{ margin: "0 0 4px", fontSize: 32, fontWeight: 800, color: "#10b981" }}>{goodPct}%</p>
                          <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>✅ బాగుంది ({good?.count || 0})</p>
                        </div>
                        <div style={{ flex: 1, background: "#020617", borderRadius: 10, padding: "16px", border: "1px solid #ef444433", textAlign: "center" }}>
                          <p style={{ margin: "0 0 4px", fontSize: 32, fontWeight: 800, color: "#ef4444" }}>{badPct}%</p>
                          <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>❌ బాగలేదు ({bad?.count || 0})</p>
                        </div>
                      </div>
                      {/* Approval bar */}
                      <div>
                        <p style={{ margin: "0 0 6px", fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Approval Rating</p>
                        <div style={{ height: 10, background: "#ef444433", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${goodPct}%`, background: "linear-gradient(90deg, #10b981, #059669)", borderRadius: 99, transition: "width 0.8s" }} />
                        </div>
                      </div>
                    </StatCard>
                  );
                })}
              </div>
            )}

            {/* ── RESPONSES TAB ── */}
            {tab === "responses" && (
              <>
                <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search responses..."
                    style={{
                      flex: 1, padding: "10px 14px", borderRadius: 10,
                      border: "1.5px solid #1e293b", background: "#0f172a",
                      color: "#f1f5f9", fontSize: 14, outline: "none",
                      fontFamily: "system-ui, sans-serif",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#f97316"}
                    onBlur={(e) => e.target.style.borderColor = "#1e293b"}
                  />
                  <span style={{ fontSize: 13, color: "#475569", whiteSpace: "nowrap" }}>{total} total</span>
                </div>

                {loadingResults ? (
                  <div style={{ textAlign: "center", padding: 60, color: "#475569" }}>Loading responses...</div>
                ) : (
                  <div style={{ background: "#0f172a", borderRadius: 16, border: "1px solid #1e293b", overflow: "hidden" }}>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#1e293b" }}>
                            {["#", "Mandal", "Village", "Age", "Gender", "2024 Vote", "Next Vote", "Gottipati", "Bachepalli", "Sarpanch", "Date"].map((h) => (
                              <th key={h} style={{ padding: "11px 14px", textAlign: "left", color: "#64748b", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.length === 0 ? (
                            <tr><td colSpan={11} style={{ padding: 40, textAlign: "center", color: "#475569" }}>No responses found</td></tr>
                          ) : filtered.map((row, i) => (
                            <tr
                              key={row.id}
                              style={{ borderTop: "1px solid #1e293b", background: i % 2 === 0 ? "transparent" : "#0a1020" }}
                            >
                              <td style={{ padding: "10px 14px", color: "#475569" }}>{row.id}</td>
                              {[row.mandal, row.village, row.age, row.gender, row.voted_2024 || "—", row.vote_next, row.gottipati_rating, row.bachepalli_rating, row.sarpanch_support].map((val, j) => (
                                <td key={j} style={{ padding: "10px 14px", color: "#cbd5e1", fontFamily: "Noto Sans Telugu, system-ui, sans-serif", whiteSpace: "nowrap" }}>
                                  {val === "బాగుంది" ? <span style={{ color: "#10b981" }}>✅ {val}</span>
                                    : val === "బాగలేదు" ? <span style={{ color: "#ef4444" }}>❌ {val}</span>
                                    : val}
                                </td>
                              ))}
                              <td style={{ padding: "10px 14px", color: "#475569", whiteSpace: "nowrap" }}>
                                {new Date(row.submitted_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div style={{ padding: "14px 20px", borderTop: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, color: "#475569" }}>Page {page} of {totalPages}</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        {[{ label: "← Prev", disabled: page === 1, action: () => setPage(p => p - 1) },
                          { label: "Next →", disabled: page === totalPages, action: () => setPage(p => p + 1) }].map((btn) => (
                          <button
                            key={btn.label}
                            onClick={btn.action}
                            disabled={btn.disabled}
                            style={{
                              padding: "7px 14px", borderRadius: 8,
                              border: "1px solid #1e293b",
                              background: btn.disabled ? "transparent" : "#1e293b",
                              color: btn.disabled ? "#1e293b" : "#94a3b8",
                              fontSize: 12, cursor: btn.disabled ? "not-allowed" : "pointer",
                            }}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Root ───────────────────────────────────────────────────
export default function SurveyAdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn
    ? <Dashboard onLogout={() => setLoggedIn(false)} />
    : <LoginScreen onLogin={() => setLoggedIn(true)} />;
}