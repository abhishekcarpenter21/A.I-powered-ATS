import { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL;

// ── SMT Labs Brand Colors ──────────────────────────────────────────────────
const smt = {
  black:      "#0A0A0A",
  blackCard:  "#111111",
  blackHover: "#161616",
  blackDeep:  "#0D0D0D",
  border:     "#1E1E1E",
  borderHover:"#2A2A2A",
  lime:       "#C8E63C",
  limeDim:    "rgba(200,230,60,0.10)",
  limeGlow:   "rgba(200,230,60,0.22)",
  limeText:   "#D4F04A",
  purple:     "#7C3AED",
  purpleLight:"#9F67FA",
  purpleDim:  "rgba(124,58,237,0.14)",
  white:      "#FFFFFF",
  text:       "#E8E8E8",
  textMuted:  "#6B7280",
  textDim:    "#9CA3AF",
  green:      "#22C55E",
  greenDim:   "rgba(34,197,94,0.10)",
  red:        "#F43F5E",
  redDim:     "rgba(244,63,94,0.10)",
  amber:      "#F59E0B",
  amberDim:   "rgba(245,158,11,0.10)",
};

const font = "'Inter','DM Sans',system-ui,sans-serif";

const g = {
  card: {
    background: smt.blackCard,
    border: `1px solid ${smt.border}`,
    borderRadius: "16px",
    padding: "1.5rem",
  },
  label: {
    display:"block", fontSize:"11px", fontWeight:700,
    color:smt.textMuted, marginBottom:"6px",
    letterSpacing:"0.8px", textTransform:"uppercase",
  },
  input: {
    width:"100%", padding:"11px 14px",
    background:smt.blackDeep, border:`1px solid ${smt.border}`,
    borderRadius:"10px", fontSize:"13px", color:smt.text,
    outline:"none", boxSizing:"border-box", fontFamily:font,
    transition:"border-color 0.2s",
  },
  btnLime: {
    background:smt.lime, color:"#0A0A0A",
    border:"none", borderRadius:"10px",
    padding:"10px 20px", fontWeight:800,
    fontSize:"13px", cursor:"pointer",
    fontFamily:font, display:"inline-flex",
    alignItems:"center", gap:"6px",
    transition:"all 0.2s", letterSpacing:"0.2px",
  },
  btnGhost: {
    background:"transparent", color:smt.textMuted,
    border:`1px solid ${smt.border}`, borderRadius:"10px",
    padding:"9px 16px", fontWeight:500, fontSize:"12px",
    cursor:"pointer", fontFamily:font, transition:"all 0.2s",
  },
  btnDanger: {
    background:"transparent", color:smt.red,
    border:`1px solid rgba(244,63,94,0.2)`, borderRadius:"10px",
    padding:"8px 14px", fontWeight:500, fontSize:"12px",
    cursor:"pointer", fontFamily:font, transition:"all 0.2s",
  },
  badge: (type) => {
    const m = {
      SHORTLISTED: { bg:smt.greenDim,  color:smt.green,      border:"rgba(34,197,94,0.25)" },
      REJECTED:    { bg:smt.redDim,    color:smt.red,        border:"rgba(244,63,94,0.25)" },
      open:        { bg:smt.limeDim,   color:smt.limeText,   border:"rgba(200,230,60,0.25)" },
      HR:          { bg:smt.purpleDim, color:smt.purpleLight, border:"rgba(124,58,237,0.25)" },
    };
    const t = m[type] || { bg:"rgba(255,255,255,0.05)", color:smt.textMuted, border:"transparent" };
    return {
      display:"inline-flex", alignItems:"center",
      padding:"3px 10px", borderRadius:"20px",
      fontSize:"11px", fontWeight:700, letterSpacing:"0.3px",
      background:t.bg, color:t.color, border:`1px solid ${t.border}`,
    };
  },
  th: {
    padding:"11px 16px", textAlign:"left",
    fontSize:"10px", fontWeight:700, color:smt.textMuted,
    letterSpacing:"1px", textTransform:"uppercase",
    borderBottom:`1px solid ${smt.border}`,
    background:smt.blackDeep, whiteSpace:"nowrap",
  },
  td: {
    padding:"12px 16px", fontSize:"13px",
    color:smt.text, borderBottom:`1px solid ${smt.border}`,
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  const map = {
    success:{ icon:"✓", border:"rgba(34,197,94,0.5)",   color:smt.green },
    error:  { icon:"✕", border:"rgba(244,63,94,0.5)",   color:smt.red },
    info:   { icon:"ℹ", border:"rgba(200,230,60,0.4)",  color:smt.limeText },
  };
  const t = map[type] || map.info;
  return (
    <div style={{ position:"fixed", bottom:"24px", right:"24px", background:smt.blackCard, border:`1px solid ${t.border}`, borderRadius:"14px", padding:"14px 18px", fontSize:"13px", fontWeight:500, maxWidth:"360px", zIndex:9999, display:"flex", gap:"12px", alignItems:"flex-start", boxShadow:"0 20px 60px rgba(0,0,0,0.7)", fontFamily:font }}>
      <span style={{ width:"22px", height:"22px", borderRadius:"50%", background:`${t.color}22`, color:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:700, flexShrink:0 }}>{t.icon}</span>
      <span style={{ flex:1, color:smt.text, lineHeight:1.5 }}>{message}</span>
      <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:smt.textMuted, fontSize:"18px", lineHeight:1, padding:0 }}>×</button>
    </div>
  );
}

function ScoreBar({ score }) {
  const color = score >= 70 ? smt.green : score >= 40 ? smt.amber : smt.red;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
      <div style={{ flex:1, height:"4px", background:"rgba(255,255,255,0.06)", borderRadius:"2px", overflow:"hidden", minWidth:"80px" }}>
        <div style={{ width:`${Math.min(score||0,100)}%`, height:"100%", background:`linear-gradient(90deg,${color}88,${color})`, borderRadius:"2px" }} />
      </div>
      <span style={{ fontSize:"12px", fontWeight:700, color, minWidth:"42px", textAlign:"right" }}>{score?.toFixed(1)}%</span>
    </div>
  );
}

function Avatar({ name, size=32, color=smt.lime }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:`${color}18`, border:`1px solid ${color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:size*0.38, color, flexShrink:0, fontFamily:font }}>
      {name?.[0]?.toUpperCase()||"?"}
    </div>
  );
}

function SMTLogo({ size=30 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
      <div style={{ width:size, height:size, borderRadius:"8px", background:smt.black, border:`1px solid ${smt.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:size*0.38, color:smt.lime, letterSpacing:"-1px", boxShadow:`0 0 16px ${smt.limeGlow}` }}>
        SMT
      </div>
      <div>
        <div style={{ fontSize:"14px", fontWeight:800, color:smt.white, letterSpacing:"-0.3px", lineHeight:1 }}>SMT Labs</div>
        <div style={{ fontSize:"9px", color:smt.lime, fontWeight:600, letterSpacing:"1.5px", lineHeight:1.4 }}>HR PORTAL</div>
      </div>
    </div>
  );
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const mockStats = { total_jobs:3, total_applications:12, shortlisted:5, rejected:7 };
const mockApps = [
  { id:1, candidate_name:"Priya Sharma",  email:"priya@example.com",  phone:"9876543210", job_description_id:1, match_score:82.4, status:"SHORTLISTED" },
  { id:2, candidate_name:"Rahul Gupta",   email:"rahul@example.com",  phone:"9988776655", job_description_id:1, match_score:45.2, status:"REJECTED" },
  { id:3, candidate_name:"Aisha Khan",    email:"aisha@example.com",  phone:"8765432109", job_description_id:2, match_score:78.9, status:"SHORTLISTED" },
  { id:4, candidate_name:"Vikram Patel",  email:"vikram@example.com", phone:"7654321098", job_description_id:3, match_score:91.3, status:"SHORTLISTED" },
  { id:5, candidate_name:"Sneha Joshi",   email:"sneha@example.com",  phone:"6543210987", job_description_id:2, match_score:38.7, status:"REJECTED" },
  { id:6, candidate_name:"Arjun Mehta",   email:"arjun@example.com",  phone:"9123456789", job_description_id:1, match_score:63.1, status:"REJECTED" },
  { id:7, candidate_name:"Kavya Reddy",   email:"kavya@example.com",  phone:"8234567890", job_description_id:3, match_score:88.5, status:"SHORTLISTED" },
];
const mockJobs = [
  { id:1, job_title:"Senior React Developer",   job_description:"React, TypeScript, Redux, REST APIs.",   threshold:70 },
  { id:2, job_title:"Backend Python Engineer",  job_description:"Python, FastAPI, PostgreSQL, Docker.",   threshold:65 },
  { id:3, job_title:"ML Engineer",              job_description:"Python, TensorFlow, scikit-learn.",      threshold:75 },
];

// ──────────────────────────────────────────────────────────────────────────
// LOGIN PAGE
// ──────────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin, onGoRegister, setToast }) {
  const [form, setForm] = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(null);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setToast({ message:"Please enter your email and password.", type:"error" }); return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/login`, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(form),
      });
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("smt_hr_token", data.access_token);
        localStorage.setItem("smt_hr_email", form.email);
        onLogin({ token:data.access_token, email:form.email });
      } else {
        setToast({ message:data.message || "Invalid credentials.", type:"error" });
      }
    } catch {
      if (form.email === "hr@smtlabs.com" && form.password === "admin123") {
        localStorage.setItem("smt_hr_token", "demo_token");
        localStorage.setItem("smt_hr_email", form.email);
        onLogin({ token:"demo_token", email:form.email });
      } else {
        setToast({ message:"Invalid credentials. Demo: hr@smtlabs.com / admin123", type:"error" });
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:smt.black, display:"flex", fontFamily:font }}>
      {/* Glow BG */}
      <div style={{ position:"fixed", top:"10%", left:"20%", width:"500px", height:"500px", borderRadius:"50%", background:`radial-gradient(circle, ${smt.limeGlow} 0%, transparent 65%)`, pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:"10%", right:"15%", width:"350px", height:"350px", borderRadius:"50%", background:`radial-gradient(circle, ${smt.purpleDim} 0%, transparent 65%)`, pointerEvents:"none", zIndex:0 }} />

      {/* Left — Form */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"3rem", position:"relative", zIndex:1 }}>
        <div style={{ width:"100%", maxWidth:"400px" }}>
          <div style={{ marginBottom:"2.5rem" }}><SMTLogo size={36} /></div>

          <h1 style={{ margin:"0 0 6px", fontSize:"30px", fontWeight:900, color:smt.white, letterSpacing:"-0.8px" }}>Welcome back</h1>
          <p style={{ margin:"0 0 2rem", fontSize:"14px", color:smt.textMuted, lineHeight:1.6 }}>Sign in to your SMT Labs HR Portal</p>

          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            <div>
              <label style={g.label}>Email Address</label>
              <input
                style={{ ...g.input, borderColor: focus==="email" ? smt.lime : smt.border, fontSize:"14px", padding:"12px 14px" }}
                type="email" placeholder="hr@smtlabs.com"
                value={form.email}
                onFocus={() => setFocus("email")} onBlur={() => setFocus(null)}
                onChange={e => setForm({...form, email:e.target.value})}
                onKeyDown={e => e.key==="Enter" && handleLogin()}
              />
            </div>
            <div>
              <label style={g.label}>Password</label>
              <input
                style={{ ...g.input, borderColor: focus==="password" ? smt.lime : smt.border, fontSize:"14px", padding:"12px 14px" }}
                type="password" placeholder="Enter your password"
                value={form.password}
                onFocus={() => setFocus("password")} onBlur={() => setFocus(null)}
                onChange={e => setForm({...form, password:e.target.value})}
                onKeyDown={e => e.key==="Enter" && handleLogin()}
              />
            </div>

            <button
              onClick={handleLogin} disabled={loading}
              style={{ ...g.btnLime, justifyContent:"center", padding:"14px", fontSize:"15px", marginTop:"4px", opacity:loading?0.7:1, boxShadow:`0 0 28px ${smt.limeGlow}` }}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </div>

          {/* <div style={{ marginTop:"1.5rem", textAlign:"center", fontSize:"13px", color:smt.textMuted }}>
            New team member?{" "}
            <button onClick={onGoRegister} style={{ background:"none", border:"none", color:smt.lime, fontWeight:700, cursor:"pointer", fontSize:"13px", fontFamily:font }}>
              Create account
            </button>
          </div> */}

          {/* <div style={{ marginTop:"1.5rem", background:smt.limeDim, border:`1px solid rgba(200,230,60,0.2)`, borderRadius:"12px", padding:"12px 14px" }}>
            <p style={{ margin:0, fontSize:"12px", color:smt.limeText, lineHeight:1.6 }}>
              <strong>Demo credentials</strong><br />
              hr@smtlabs.com · admin123
            </p>
          </div> */}
        </div>
      </div>

      {/* Right — Branding Panel */}
      <div style={{ width:"420px", background:smt.blackCard, borderLeft:`1px solid ${smt.border}`, display:"flex", flexDirection:"column", justifyContent:"center", padding:"3rem", flexShrink:0, position:"relative", zIndex:1 }}>
        <div style={{ marginBottom:"2rem" }}>
          <div style={{ fontSize:"11px", fontWeight:700, color:smt.textMuted, letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:"1rem" }}>What you get</div>
          {[
            { icon:"🤖", title:"AI Resume Scoring",  desc:"TF-IDF cosine similarity — rank candidates instantly" },
            { icon:"📊", title:"Live Analytics",      desc:"Real-time stats on applications, shortlists, rejections" },
            { icon:"💼", title:"Job Management",      desc:"Post roles with custom AI match thresholds" },
            { icon:"📧", title:"Auto Notifications",  desc:"Candidates get email results automatically" },
          ].map(item => (
            <div key={item.title} style={{ display:"flex", gap:"14px", alignItems:"flex-start", marginBottom:"1.25rem" }}>
              <div style={{ width:"38px", height:"38px", borderRadius:"10px", background:smt.limeDim, border:`1px solid rgba(200,230,60,0.15)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", flexShrink:0 }}>{item.icon}</div>
              <div>
                <p style={{ margin:"0 0 3px", fontSize:"13px", fontWeight:700, color:smt.white }}>{item.title}</p>
                <p style={{ margin:0, fontSize:"12px", color:smt.textMuted, lineHeight:1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${smt.border}`, paddingTop:"1.5rem" }}>
          <p style={{ margin:0, fontSize:"11px", color:smt.textMuted, lineHeight:1.7 }}>
            Built by{" "}
            <a href="https://smtlabs.io" style={{ color:smt.lime, fontWeight:700, textDecoration:"none" }}>SMT Labs</a>
            {" "}— Your Digital Partner for Mobile and Web Applications.
          </p>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// REGISTER PAGE
// ──────────────────────────────────────────────────────────────────────────
function RegisterPage({ onGoLogin, setToast }) {
  const [form, setForm] = useState({ name:"", email:"", password:"", confirmPassword:"", role:"HR" });
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(null);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setToast({ message:"Please fill in all fields.", type:"error" }); return;
    }
    if (form.password !== form.confirmPassword) {
      setToast({ message:"Passwords do not match.", type:"error" }); return;
    }
    if (form.password.length < 6) {
      setToast({ message:"Password must be at least 6 characters.", type:"error" }); return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ name:form.name, email:form.email, password:form.password, role:form.role }),
      });
      const data = await res.json();
      if (data.message === "Email already exists") {
        setToast({ message:"This email is already registered.", type:"error" });
      } else if (data.user_id || data.message === "User registered successfully") {
        setToast({ message:`Account created for ${form.name}! Please sign in.`, type:"success" });
        setTimeout(onGoLogin, 1500);
      } else {
        setToast({ message:data.message || "Registration failed.", type:"error" });
      }
    } catch {
      setToast({ message:"Account created! (Demo mode) Please sign in.", type:"info" });
      setTimeout(onGoLogin, 1500);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:smt.black, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:font, padding:"2rem", position:"relative" }}>
      <div style={{ position:"fixed", top:"15%", right:"20%", width:"400px", height:"400px", borderRadius:"50%", background:`radial-gradient(circle, ${smt.purpleDim} 0%, transparent 65%)`, pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:"15%", left:"20%", width:"300px", height:"300px", borderRadius:"50%", background:`radial-gradient(circle, ${smt.limeGlow} 0%, transparent 65%)`, pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:"500px", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom:"2rem" }}><SMTLogo size={34} /></div>

        <div style={{ ...g.card, border:`1px solid ${smt.borderHover}` }}>
          <h2 style={{ margin:"0 0 4px", fontSize:"24px", fontWeight:900, color:smt.white, letterSpacing:"-0.5px" }}>Create HR Account</h2>
          <p style={{ margin:"0 0 1.75rem", fontSize:"13px", color:smt.textMuted }}>Join the SMT Labs HR team portal</p>

          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            {[
              { id:"name",  label:"Full Name",     type:"text",     placeholder:"Jane Smith" },
              { id:"email", label:"Work Email",    type:"email",    placeholder:"jane@smtlabs.com" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label style={g.label}>{label}</label>
                <input style={{ ...g.input, borderColor:focus===id?smt.lime:smt.border }} type={type} placeholder={placeholder}
                  value={form[id]} onFocus={()=>setFocus(id)} onBlur={()=>setFocus(null)}
                  onChange={e=>setForm({...form,[id]:e.target.value})} />
              </div>
            ))}

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              {[
                { id:"password",        label:"Password",         placeholder:"Min. 6 chars" },
                { id:"confirmPassword", label:"Confirm Password", placeholder:"Repeat password" },
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <label style={g.label}>{label}</label>
                  <input style={{ ...g.input, borderColor:focus===id?smt.lime:smt.border }} type="password" placeholder={placeholder}
                    value={form[id]} onFocus={()=>setFocus(id)} onBlur={()=>setFocus(null)}
                    onChange={e=>setForm({...form,[id]:e.target.value})} />
                </div>
              ))}
            </div>

            <div>
              <label style={g.label}>Role</label>
              <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}
                style={{ ...g.input, cursor:"pointer", borderColor:focus==="role"?smt.lime:smt.border }}
                onFocus={()=>setFocus("role")} onBlur={()=>setFocus(null)}>
                <option value="HR">HR Manager</option>
                <option value="Admin">Admin</option>
                <option value="Recruiter">Recruiter</option>
              </select>
            </div>

            <button onClick={handleRegister} disabled={loading}
              style={{ ...g.btnLime, justifyContent:"center", padding:"13px", marginTop:"4px", opacity:loading?0.7:1, boxShadow:`0 0 24px ${smt.limeGlow}` }}>
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </div>

          <div style={{ marginTop:"1.25rem", textAlign:"center", fontSize:"13px", color:smt.textMuted }}>
            Already have an account?{" "}
            <button onClick={onGoLogin} style={{ background:"none", border:"none", color:smt.lime, fontWeight:700, cursor:"pointer", fontSize:"13px", fontFamily:font }}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// OVERVIEW TAB
// ──────────────────────────────────────────────────────────────────────────
function Overview({ stats, applications, jobs, onNavigate }) {
  const total = stats?.total_applications || 1;
  const shortPct = ((stats?.shortlisted||0)/total*100);
  const rejPct   = ((stats?.rejected||0)/total*100);

  const cards = [
    { label:"Open Positions",    value:stats?.total_jobs??0,         icon:"💼", color:smt.lime,        glow:smt.limeGlow,                    sub:"active roles" },
    { label:"Total Applications",value:stats?.total_applications??0, icon:"📋", color:smt.purpleLight, glow:"rgba(159,103,250,0.2)",          sub:"all time" },
    { label:"Shortlisted",       value:stats?.shortlisted??0,        icon:"⭐", color:smt.green,       glow:"rgba(34,197,94,0.18)",           sub:`${shortPct.toFixed(0)}% rate` },
    { label:"Rejected",          value:stats?.rejected??0,           icon:"✕",  color:smt.red,         glow:"rgba(244,63,94,0.15)",           sub:`${rejPct.toFixed(0)}% rate` },
  ];

  return (
    <div>
      <div style={{ marginBottom:"1.75rem" }}>
        <h2 style={{ margin:"0 0 4px", fontSize:"22px", fontWeight:900, color:smt.white, letterSpacing:"-0.5px" }}>Dashboard Overview</h2>
        <p style={{ margin:0, color:smt.textMuted, fontSize:"13px" }}>Live recruitment analytics · SMT Labs ATS</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:"12px", marginBottom:"1.5rem" }}>
        {cards.map(sc => (
          <div key={sc.label} style={{ background:smt.blackCard, border:`1px solid ${smt.border}`, borderRadius:"16px", padding:"1.25rem", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-24px", right:"-24px", width:"90px", height:"90px", borderRadius:"50%", background:`radial-gradient(circle,${sc.glow} 0%,transparent 70%)` }} />
            <div style={{ fontSize:"18px", marginBottom:"12px" }}>{sc.icon}</div>
            <div style={{ fontSize:"34px", fontWeight:900, color:sc.color, lineHeight:1, letterSpacing:"-1.5px" }}>{sc.value}</div>
            <div style={{ fontSize:"12px", fontWeight:600, color:smt.text, marginTop:"4px" }}>{sc.label}</div>
            <div style={{ fontSize:"11px", color:smt.textMuted, marginTop:"2px" }}>{sc.sub}</div>
          </div>
        ))}
      </div>

      {/* Pipeline + Jobs */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"12px" }}>
        <div style={g.card}>
          <h3 style={{ margin:"0 0 14px", fontSize:"11px", fontWeight:700, color:smt.textMuted, letterSpacing:"1px", textTransform:"uppercase" }}>APPLICATION PIPELINE</h3>
          <div style={{ display:"flex", borderRadius:"8px", overflow:"hidden", height:"26px", marginBottom:"12px", gap:"3px" }}>
            {[{label:"Shortlisted",pct:shortPct,color:smt.green},{label:"Rejected",pct:rejPct,color:smt.red}].map(bar =>
              parseInt(bar.pct) > 0 ? (
                <div key={bar.label} style={{ width:`${bar.pct}%`, background:bar.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#000", fontSize:"10px", fontWeight:800, borderRadius:"4px" }}>
                  {parseInt(bar.pct)>12?`${bar.pct.toFixed(0)}%`:""}
                </div>
              ) : null
            )}
          </div>
          <div style={{ display:"flex", gap:"1.5rem" }}>
            {[{label:"Shortlisted",value:stats?.shortlisted,color:smt.green},{label:"Rejected",value:stats?.rejected,color:smt.red}].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"12px" }}>
                <span style={{ width:"8px", height:"8px", borderRadius:"2px", background:l.color, display:"inline-block" }} />
                <span style={{ color:smt.textMuted }}>{l.label}:</span>
                <strong style={{ color:smt.text }}>{l.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div style={g.card}>
          <h3 style={{ margin:"0 0 14px", fontSize:"11px", fontWeight:700, color:smt.textMuted, letterSpacing:"1px", textTransform:"uppercase" }}>ACTIVE JOBS</h3>
          {jobs.slice(0,3).map(job => (
            <div key={job.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${smt.border}` }}>
              <span style={{ fontSize:"13px", color:smt.text, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"160px" }}>{job.job_title}</span>
              <span style={{ fontSize:"12px", color:smt.limeText, fontWeight:700, flexShrink:0 }}>{job.threshold}%</span>
            </div>
          ))}
          {jobs.length===0 && <p style={{ margin:0, fontSize:"13px", color:smt.textMuted }}>No jobs yet</p>}
        </div>
      </div>

      {/* Recent Applications */}
      <div style={g.card}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
          <h3 style={{ margin:0, fontSize:"11px", fontWeight:700, color:smt.textMuted, letterSpacing:"1px", textTransform:"uppercase" }}>RECENT APPLICATIONS</h3>
          <button onClick={()=>onNavigate("applications")} style={{ fontSize:"12px", color:smt.lime, background:"none", border:"none", cursor:"pointer", fontWeight:700, fontFamily:font }}>View all →</button>
        </div>
        {applications.slice(0,5).map(app => (
          <div key={app.id} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 0", borderBottom:`1px solid ${smt.border}` }}>
            <Avatar name={app.candidate_name} size={32} color={app.status==="SHORTLISTED"?smt.green:smt.red} />
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ margin:"0 0 2px", fontWeight:600, fontSize:"13px", color:smt.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{app.candidate_name}</p>
              <p style={{ margin:0, fontSize:"11px", color:smt.textMuted }}>{app.email}</p>
            </div>
            <span style={g.badge(app.status)}>{app.status}</span>
            <span style={{ fontSize:"12px", fontWeight:700, color:app.match_score>=70?smt.green:app.match_score>=40?smt.amber:smt.red, minWidth:"44px", textAlign:"right" }}>{app.match_score?.toFixed(1)}%</span>
          </div>
        ))}
        {applications.length===0 && <p style={{ margin:0, fontSize:"13px", color:smt.textMuted, textAlign:"center", padding:"2rem 0" }}>No applications yet</p>}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// APPLICATIONS TAB
// ──────────────────────────────────────────────────────────────────────────
function Applications({ applications, onViewCandidate }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filtered = applications.filter(a => {
    const ms = a.candidate_name?.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase());
    return ms && (filter==="ALL" || a.status===filter);
  });

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <h2 style={{ margin:"0 0 3px", fontSize:"22px", fontWeight:900, color:smt.white, letterSpacing:"-0.5px" }}>All Applications</h2>
          <p style={{ margin:0, color:smt.textMuted, fontSize:"13px" }}>{filtered.length} records</p>
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
          <div style={{ position:"relative" }}>
            <input style={{ ...g.input, width:"200px", paddingLeft:"34px" }} placeholder="Search candidates..." value={search} onChange={e=>setSearch(e.target.value)} />
            <span style={{ position:"absolute", left:"11px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", color:smt.textMuted }}>🔍</span>
          </div>
          {["ALL","SHORTLISTED","REJECTED"].map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              style={{ ...g.btnGhost, background:filter===f?smt.lime:"transparent", color:filter===f?"#0A0A0A":smt.textMuted, borderColor:filter===f?smt.lime:smt.border, fontSize:"11px", padding:"8px 14px", fontWeight:filter===f?800:500 }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length===0 ? (
        <div style={{ textAlign:"center", padding:"5rem", color:smt.textMuted }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>📭</div>
          <p style={{ fontWeight:600, color:smt.text }}>No applications found</p>
        </div>
      ) : (
        <div style={{ ...g.card, padding:0, overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:font }}>
              <thead>
                <tr>
                  {["#","Candidate","Email","Phone","Job ID","Match Score","Status","Action"].map(h => (
                    <th key={h} style={g.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((app,i) => (
                  <tr key={app.id}
                    onMouseEnter={e=>e.currentTarget.style.background=smt.blackHover}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                    style={{ transition:"background 0.15s" }}
                  >
                    <td style={{ ...g.td, color:smt.textMuted, fontSize:"12px" }}>{i+1}</td>
                    <td style={g.td}>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                        <Avatar name={app.candidate_name} size={28} color={app.status==="SHORTLISTED"?smt.green:smt.lime} />
                        <span style={{ fontWeight:600, whiteSpace:"nowrap" }}>{app.candidate_name}</span>
                      </div>
                    </td>
                    <td style={{ ...g.td, color:smt.textMuted }}>{app.email}</td>
                    <td style={{ ...g.td, color:smt.textMuted }}>{app.phone}</td>
                    <td style={{ ...g.td, color:smt.textMuted }}>#{app.job_description_id}</td>
                    <td style={{ ...g.td, minWidth:"130px" }}><ScoreBar score={app.match_score} /></td>
                    <td style={g.td}><span style={g.badge(app.status)}>{app.status}</span></td>
                    <td style={g.td}>
                      <button onClick={()=>onViewCandidate(app)}
                        style={{ ...g.btnGhost, fontSize:"11px", padding:"6px 12px", color:smt.limeText, borderColor:smt.limeDim }}>
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// CANDIDATE DETAIL
// ──────────────────────────────────────────────────────────────────────────
function CandidateDetail({ candidate, onBack }) {
  const sc = candidate.match_score >= 70 ? smt.green : candidate.match_score >= 40 ? smt.amber : smt.red;
  return (
    <div>
      <button onClick={onBack} style={{ ...g.btnGhost, marginBottom:"1.5rem" }}>← Back to Applications</button>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
        {/* Profile Card */}
        <div style={{ ...g.card, gridColumn:"1/-1", display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
          <Avatar name={candidate.candidate_name} size={56} color={candidate.status==="SHORTLISTED"?smt.green:smt.lime} />
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
              <h2 style={{ margin:0, fontSize:"20px", fontWeight:900, color:smt.white, letterSpacing:"-0.3px" }}>{candidate.candidate_name}</h2>
              <span style={g.badge(candidate.status)}>{candidate.status}</span>
            </div>
            <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
              <span style={{ fontSize:"13px", color:smt.textMuted }}>📧 {candidate.email}</span>
              <span style={{ fontSize:"13px", color:smt.textMuted }}>📞 {candidate.phone}</span>
              <span style={{ fontSize:"13px", color:smt.textMuted }}>💼 Job #{candidate.job_description_id}</span>
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:"36px", fontWeight:900, color:sc, letterSpacing:"-1px" }}>{candidate.match_score?.toFixed(1)}%</div>
            <div style={{ fontSize:"11px", color:smt.textMuted }}>match score</div>
          </div>
        </div>

        {/* Score */}
        <div style={g.card}>
          <h3 style={{ margin:"0 0 14px", fontSize:"11px", fontWeight:700, color:smt.textMuted, letterSpacing:"1px", textTransform:"uppercase" }}>MATCH SCORE</h3>
          <div style={{ height:"8px", background:"rgba(255,255,255,0.05)", borderRadius:"4px", overflow:"hidden", marginBottom:"10px" }}>
            <div style={{ width:`${Math.min(candidate.match_score||0,100)}%`, height:"100%", background:`linear-gradient(90deg,${sc}88,${sc})`, borderRadius:"4px" }} />
          </div>
          <p style={{ margin:0, fontSize:"12px", color:smt.textMuted }}>
            {candidate.match_score>=70 ? "✅ Above threshold — candidate is shortlisted" : "❌ Below threshold — candidate was rejected"}
          </p>
        </div>

        {/* Skills */}
        <div style={g.card}>
          <h3 style={{ margin:"0 0 10px", fontSize:"11px", fontWeight:700, color:smt.textMuted, letterSpacing:"1px", textTransform:"uppercase" }}>SKILLS ANALYSIS</h3>
          <p style={{ margin:"0 0 6px", fontSize:"12px", color:smt.green, fontWeight:600 }}>✅ Matched:</p>
          <p style={{ margin:"0 0 12px", fontSize:"12px", color:smt.textDim, lineHeight:1.7 }}>{candidate.matched_skills || "Not available"}</p>
          <p style={{ margin:"0 0 6px", fontSize:"12px", color:smt.red, fontWeight:600 }}>❌ Missing:</p>
          <p style={{ margin:0, fontSize:"12px", color:smt.textDim, lineHeight:1.7 }}>{candidate.missing_skills || "Not available"}</p>
        </div>

        {/* Actions */}
        <div style={{ ...g.card, gridColumn:"1/-1" }}>
          <h3 style={{ margin:"0 0 14px", fontSize:"11px", fontWeight:700, color:smt.textMuted, letterSpacing:"1px", textTransform:"uppercase" }}>ACTIONS</h3>
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            <a href={`${API}/resume/view/${candidate.id}`} target="_blank" rel="noreferrer"
              style={{ ...g.btnLime, textDecoration:"none", fontSize:"13px", boxShadow:`0 0 16px ${smt.limeGlow}` }}>📄 View Resume</a>
            <a href={`${API}/resume/${candidate.id}`} download
              style={{ ...g.btnGhost, textDecoration:"none", fontSize:"13px", color:smt.green, borderColor:"rgba(34,197,94,0.2)" }}>⬇ Download</a>
            <a href={`mailto:${candidate.email}?subject=Interview Invitation – SMT Labs`}
              style={{ ...g.btnGhost, textDecoration:"none", fontSize:"13px", color:smt.limeText, borderColor:smt.limeDim }}>✉ Send Email</a>
            <a href={`tel:${candidate.phone}`}
              style={{ ...g.btnGhost, textDecoration:"none", fontSize:"13px", color:smt.purpleLight, borderColor:smt.purpleDim }}>📞 Call</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// JOBS TAB
// ──────────────────────────────────────────────────────────────────────────
function Jobs({ jobs, applications, onRefresh, setToast }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ job_title:"", job_description:"", threshold:70 });
  const [creating, setCreating] = useState(false);
  const [focus, setFocus] = useState(null);

  const handleCreate = async () => {
    if (!form.job_title.trim() || !form.job_description.trim()) {
      setToast({ message:"Title and description are required", type:"error" }); return;
    }
    setCreating(true);
    try {
      const res = await fetch(`${API}/jobs/`, { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(form) });
      const data = await res.json();
      setToast({ message:`"${form.job_title}" posted! ID: ${data.job_id}`, type:"success" });
      setForm({ job_title:"", job_description:"", threshold:70 });
      setShowForm(false);
      onRefresh();
    } catch {
      setToast({ message:"Job created! (Demo mode)", type:"info" });
      setShowForm(false);
    }
    setCreating(false);
  };

  const handleDelete = async (jobId) => {
    try {
      await fetch(`${API}/jobs/${jobId}`, { method:"DELETE" });
      setToast({ message:"Job deleted.", type:"success" });
      onRefresh();
    } catch {
      setToast({ message:"Delete failed.", type:"error" });
    }
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <h2 style={{ margin:"0 0 3px", fontSize:"22px", fontWeight:900, color:smt.white, letterSpacing:"-0.5px" }}>Job Listings</h2>
          <p style={{ margin:0, color:smt.textMuted, fontSize:"13px" }}>{jobs.length} active positions</p>
        </div>
        <button onClick={()=>setShowForm(!showForm)} style={{ ...g.btnLime, boxShadow:`0 0 20px ${smt.limeGlow}` }}>
          {showForm ? "✕ Cancel" : "+ Post New Job"}
        </button>
      </div>

      {showForm && (
        <div style={{ ...g.card, marginBottom:"1.5rem", border:`1px solid rgba(200,230,60,0.3)` }}>
          <h3 style={{ margin:"0 0 1.25rem", fontSize:"15px", fontWeight:800, color:smt.white }}>Post New Opening</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            <div>
              <label style={g.label}>Job Title</label>
              <input style={{ ...g.input, borderColor:focus==="title"?smt.lime:smt.border }}
                placeholder="e.g. Senior React Developer"
                value={form.job_title}
                onFocus={()=>setFocus("title")} onBlur={()=>setFocus(null)}
                onChange={e=>setForm({...form,job_title:e.target.value})} />
            </div>
            <div>
              <label style={g.label}>Job Description</label>
              <textarea style={{ ...g.input, minHeight:"100px", resize:"vertical", lineHeight:1.6, borderColor:focus==="desc"?smt.lime:smt.border }}
                placeholder="Describe requirements, responsibilities, and required skills..."
                value={form.job_description}
                onFocus={()=>setFocus("desc")} onBlur={()=>setFocus(null)}
                onChange={e=>setForm({...form,job_description:e.target.value})} />
            </div>
            <div>
              <label style={g.label}>AI Match Threshold — <span style={{ color:smt.lime, fontWeight:900 }}>{form.threshold}%</span></label>
              <input type="range" min={10} max={100} step={5} value={form.threshold}
                onChange={e=>setForm({...form,threshold:parseInt(e.target.value)})}
                style={{ width:"100%", margin:"6px 0", accentColor:smt.lime }} />
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:"11px", color:smt.textMuted }}>
                <span>10% — Lenient</span><span>100% — Strict</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={handleCreate} disabled={creating}
                style={{ ...g.btnLime, opacity:creating?0.7:1, boxShadow:`0 0 16px ${smt.limeGlow}` }}>
                {creating ? "Posting..." : "✓ Post Job"}
              </button>
              <button onClick={()=>setShowForm(false)} style={g.btnGhost}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {jobs.length===0 ? (
        <div style={{ textAlign:"center", padding:"5rem", color:smt.textMuted }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>💼</div>
          <p style={{ fontWeight:600, color:smt.text }}>No jobs posted yet</p>
          <p style={{ fontSize:"13px" }}>Click "Post New Job" to create your first opening</p>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:"12px" }}>
          {jobs.map(job => {
            const appCount = applications.filter(a=>a.job_description_id===job.id).length;
            const shortCount = applications.filter(a=>a.job_description_id===job.id&&a.status==="SHORTLISTED").length;
            return (
              <div key={job.id} style={g.card}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
                  <span style={g.badge("open")}>● Active</span>
                  <span style={{ fontSize:"11px", color:smt.textMuted }}>#{job.id}</span>
                </div>
                <h3 style={{ margin:"0 0 8px", fontSize:"15px", fontWeight:700, color:smt.white }}>{job.job_title}</h3>
                <p style={{ margin:"0 0 14px", fontSize:"12px", color:smt.textMuted, lineHeight:1.6, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical" }}>{job.job_description}</p>
                <div style={{ borderTop:`1px solid ${smt.border}`, paddingTop:"12px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
                  <span style={{ fontSize:"12px", color:smt.textMuted }}>🎯 <strong style={{ color:smt.lime }}>{job.threshold}%</strong> threshold</span>
                  <span style={{ fontSize:"12px" }}>
                    <span style={{ color:smt.textMuted }}>{appCount} applied · </span>
                    <span style={{ color:smt.green, fontWeight:700 }}>{shortCount} ★</span>
                  </span>
                </div>
                <button onClick={()=>handleDelete(job.id)} style={{ ...g.btnDanger, width:"100%", justifyContent:"center" }}>
                  🗑 Delete Job
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// SHORTLISTED TAB
// ──────────────────────────────────────────────────────────────────────────
function Shortlisted({ applications }) {
  const list = applications.filter(a=>a.status==="SHORTLISTED");
  return (
    <div>
      <div style={{ marginBottom:"1.5rem" }}>
        <h2 style={{ margin:"0 0 3px", fontSize:"22px", fontWeight:900, color:smt.white, letterSpacing:"-0.5px" }}>Shortlisted Candidates</h2>
        <p style={{ margin:0, color:smt.textMuted, fontSize:"13px" }}>{list.length} candidates ready for interview</p>
      </div>
      {list.length===0 ? (
        <div style={{ textAlign:"center", padding:"5rem", color:smt.textMuted }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>⭐</div>
          <p style={{ fontWeight:600, color:smt.text }}>No shortlisted candidates yet</p>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"12px" }}>
          {list.map(app => (
            <div key={app.id} style={{ ...g.card, border:`1px solid rgba(34,197,94,0.2)` }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"14px" }}>
                <Avatar name={app.candidate_name} size={46} color={smt.green} />
                <div style={{ minWidth:0 }}>
                  <p style={{ margin:"0 0 2px", fontWeight:700, fontSize:"14px", color:smt.white, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{app.candidate_name}</p>
                  <p style={{ margin:0, fontSize:"11px", color:smt.textMuted }}>Job #{app.job_description_id}</p>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"6px", fontSize:"12px", color:smt.textMuted, marginBottom:"14px" }}>
                <div style={{ display:"flex", gap:"8px" }}><span>📧</span><span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{app.email}</span></div>
                <div style={{ display:"flex", gap:"8px" }}><span>📞</span><span>{app.phone}</span></div>
              </div>
              <div style={{ borderTop:`1px solid ${smt.border}`, paddingTop:"12px", marginBottom:"12px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <span style={{ fontSize:"10px", fontWeight:700, color:smt.textMuted, letterSpacing:"0.8px" }}>MATCH SCORE</span>
                  <span style={g.badge("SHORTLISTED")}>✓ Shortlisted</span>
                </div>
                <ScoreBar score={app.match_score} />
              </div>
              <div style={{ display:"flex", gap:"6px" }}>
                <a href={`${API}/resume/view/${app.id}`} target="_blank" rel="noreferrer" style={{ flex:1, textAlign:"center", padding:"8px", borderRadius:"8px", border:`1px solid ${smt.border}`, fontSize:"11px", color:smt.textMuted, textDecoration:"none", fontFamily:font }}>📄 Resume</a>
                <a href={`tel:${app.phone}`} style={{ flex:1, textAlign:"center", padding:"8px", borderRadius:"8px", border:`1px solid ${smt.border}`, fontSize:"11px", color:smt.textMuted, textDecoration:"none", fontFamily:font }}>📞 Call</a>
                <a href={`mailto:${app.email}?subject=Interview – SMT Labs`} style={{ flex:1, textAlign:"center", padding:"8px", borderRadius:"8px", border:`1px solid ${smt.border}`, fontSize:"11px", color:smt.textMuted, textDecoration:"none", fontFamily:font }}>✉ Email</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// DASHBOARD SHELL
// ──────────────────────────────────────────────────────────────────────────
function Dashboard({ hrUser, onLogout }) {
  const [tab, setTab] = useState("overview");
  const [candidate, setCandidate] = useState(null);
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [dR,aR,jR] = await Promise.all([
        fetch(`${API}/dashboard/dashboard`),
        fetch(`${API}/dashboard/applications`),
        fetch(`${API}/jobs/`),
      ]);
      const [d,a,j] = await Promise.all([dR.json(),aR.json(),jR.json()]);
      setStats(d);
      setApplications(Array.isArray(a)?a:[]);
      setJobs(Array.isArray(j)?j:[]);
    } catch {
      setStats(mockStats);
      setApplications(mockApps);
      setJobs(mockJobs);
      setToast({ message:"Demo mode — showing sample data", type:"info" });
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const nav = [
    { id:"overview",     icon:"▦", label:"Overview" },
    { id:"applications", icon:"≡", label:"Applications", count:applications.length, cc:"#9F67FA" },
    { id:"jobs",         icon:"◈", label:"Job Listings" },
    { id:"shortlisted",  icon:"★", label:"Shortlisted", count:applications.filter(a=>a.status==="SHORTLISTED").length, cc:smt.green },
  ];

  return (
    <div style={{ minHeight:"100vh", background:smt.black, display:"flex", flexDirection:"column", fontFamily:font }}>
      {toast && <Toast {...toast} onClose={()=>setToast(null)} />}

      {/* Top Nav */}
      <nav style={{ background:smt.blackCard, borderBottom:`1px solid ${smt.border}`, padding:"0 1.5rem", display:"flex", alignItems:"center", height:"58px", gap:"14px", flexShrink:0, position:"sticky", top:0, zIndex:50 }}>
        <SMTLogo size={28} />
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"10px" }}>
          <button onClick={fetchAll} style={{ ...g.btnGhost, fontSize:"12px", padding:"7px 12px" }}>⟳ Refresh</button>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"5px 12px", background:smt.limeDim, border:`1px solid rgba(200,230,60,0.2)`, borderRadius:"10px" }}>
            <Avatar name={hrUser?.email||"HR"} size={22} color={smt.lime} />
            <span style={{ fontSize:"12px", color:smt.limeText, fontWeight:600 }}>{hrUser?.email || "HR Manager"}</span>
          </div>
          <button onClick={onLogout} style={{ ...g.btnGhost, fontSize:"12px", padding:"7px 14px", color:smt.red, borderColor:"rgba(244,63,94,0.2)" }}>Sign Out</button>
        </div>
      </nav>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        {/* Sidebar */}
        <aside style={{ width:"196px", background:smt.blackCard, borderRight:`1px solid ${smt.border}`, padding:"1.25rem 0.75rem", display:"flex", flexDirection:"column", gap:"2px", flexShrink:0 }}>
          <p style={{ fontSize:"9px", fontWeight:700, color:smt.textMuted, letterSpacing:"1.2px", textTransform:"uppercase", margin:"0 0 8px 8px" }}>NAVIGATION</p>
          {nav.map(item => (
            <button key={item.id}
              onClick={() => { setTab(item.id); setCandidate(null); }}
              style={{
                width:"100%", textAlign:"left", display:"flex", alignItems:"center", gap:"9px",
                padding:"9px 10px", borderRadius:"10px", border:"none", cursor:"pointer",
                fontSize:"13px", fontWeight:tab===item.id?700:400, fontFamily:font,
                background:tab===item.id?smt.limeDim:"transparent",
                color:tab===item.id?smt.limeText:smt.textDim,
                transition:"all 0.15s",
                borderLeft:tab===item.id?`2px solid ${smt.lime}`:"2px solid transparent",
              }}
            >
              <span style={{ fontSize:"14px", opacity:0.85 }}>{item.icon}</span>
              <span style={{ flex:1 }}>{item.label}</span>
              {item.count > 0 && (
                <span style={{ background:item.cc||smt.lime, color:item.cc===smt.green?"#fff":"#0A0A0A", borderRadius:"20px", fontSize:"9px", fontWeight:800, padding:"2px 7px" }}>
                  {item.count}
                </span>
              )}
            </button>
          ))}

          {/* Quick Stats */}
          {stats && (
            <div style={{ marginTop:"auto", padding:"12px 8px", borderTop:`1px solid ${smt.border}` }}>
              <p style={{ fontSize:"9px", fontWeight:700, color:smt.textMuted, letterSpacing:"1px", textTransform:"uppercase", margin:"0 0 10px" }}>QUICK STATS</p>
              {[
                { label:"Jobs",    value:stats.total_jobs,         color:smt.lime },
                { label:"Applied", value:stats.total_applications, color:smt.purpleLight },
                { label:"Hired",   value:stats.shortlisted,        color:smt.green },
              ].map(s => (
                <div key={s.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                  <span style={{ fontSize:"11px", color:smt.textMuted }}>{s.label}</span>
                  <span style={{ fontSize:"14px", fontWeight:900, color:s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Main */}
        <main style={{ flex:1, padding:"1.75rem 2rem", overflowY:"auto" }}>
          {loading ? (
            <div style={{ textAlign:"center", padding:"6rem", color:smt.textMuted }}>
              <div style={{ width:"40px", height:"40px", borderRadius:"50%", border:`2px solid ${smt.border}`, borderTopColor:smt.lime, margin:"0 auto 16px", animation:"spin 0.8s linear infinite" }} />
              <p style={{ fontSize:"14px" }}>Loading dashboard...</p>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : (
            <>
              {tab==="overview"     && <Overview stats={stats} applications={applications} jobs={jobs} onNavigate={t=>{setTab(t);setCandidate(null);}} />}
              {tab==="applications" && (candidate ? <CandidateDetail candidate={candidate} onBack={()=>setCandidate(null)} /> : <Applications applications={applications} onViewCandidate={setCandidate} />)}
              {tab==="jobs"         && <Jobs jobs={jobs} applications={applications} onRefresh={fetchAll} setToast={setToast} />}
              {tab==="shortlisted"  && <Shortlisted applications={applications} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// ROOT APP
// ──────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]   = useState("login");
  const [hrUser, setHrUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("smt_hr_token");
    const email = localStorage.getItem("smt_hr_email");
    if (token) { setHrUser({ token, email }); setPage("dashboard"); }
  }, []);

  const handleLogin = (user) => { setHrUser(user); setPage("dashboard"); };
  const handleLogout = () => {
    localStorage.removeItem("smt_hr_token");
    localStorage.removeItem("smt_hr_email");
    setHrUser(null); setPage("login");
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0} body{background:#0A0A0A}`}</style>
      {toast && <Toast {...toast} onClose={()=>setToast(null)} />}
      {page==="login"     && <LoginPage onLogin={handleLogin} onGoRegister={()=>setPage("register")} setToast={setToast} />}
      {page==="register"  && <RegisterPage onGoLogin={()=>setPage("login")} setToast={setToast} />}
      {page==="dashboard" && <Dashboard hrUser={hrUser} onLogout={handleLogout} />}
    </>
  );
}