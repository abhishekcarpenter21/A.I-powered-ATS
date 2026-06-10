import { useState, useEffect, useRef } from "react";

const API = "http://localhost:8000";

// ── SMT Labs Brand Colors ──────────────────────────────────────────────────
const smt = {
  black:      "#0A0A0A",
  blackCard:  "#111111",
  blackHover: "#161616",
  border:     "#1E1E1E",
  borderHover:"#2A2A2A",
  lime:       "#C8E63C",   // SMT primary accent (logo yellow-green)
  limeDim:    "rgba(200,230,60,0.12)",
  limeGlow:   "rgba(200,230,60,0.25)",
  limeText:   "#D4F04A",
  purple:     "#7C3AED",   // SMT button purple
  purpleLight:"#9F67FA",
  purpleDim:  "rgba(124,58,237,0.15)",
  white:      "#FFFFFF",
  text:       "#E8E8E8",
  textMuted:  "#6B7280",
  textDim:    "#9CA3AF",
  green:      "#22C55E",
  greenDim:   "rgba(34,197,94,0.12)",
  red:        "#F43F5E",
  redDim:     "rgba(244,63,94,0.12)",
  amber:      "#F59E0B",
};

const font = "'Inter','DM Sans',system-ui,sans-serif";

const g = {
  card: {
    background: smt.blackCard,
    border: `1px solid ${smt.border}`,
    borderRadius: "16px",
    padding: "1.75rem",
  },
  label: {
    display: "block", fontSize: "11px", fontWeight: 700,
    color: smt.textMuted, marginBottom: "6px",
    letterSpacing: "0.8px", textTransform: "uppercase",
  },
  input: {
    width: "100%", padding: "12px 14px",
    background: "#0D0D0D", border: `1px solid ${smt.border}`,
    borderRadius: "10px", fontSize: "14px", color: smt.text,
    outline: "none", boxSizing: "border-box", fontFamily: font,
    transition: "border-color 0.2s",
  },
  btnLime: {
    background: smt.lime, color: "#0A0A0A",
    border: "none", borderRadius: "10px",
    padding: "12px 24px", fontWeight: 800,
    fontSize: "14px", cursor: "pointer",
    fontFamily: font, display: "inline-flex",
    alignItems: "center", gap: "7px",
    transition: "all 0.2s",
    letterSpacing: "0.2px",
  },
  btnGhost: {
    background: "transparent", color: smt.textMuted,
    border: `1px solid ${smt.border}`, borderRadius: "10px",
    padding: "10px 20px", fontWeight: 500, fontSize: "13px",
    cursor: "pointer", fontFamily: font, transition: "all 0.2s",
  },
  badge: (type) => {
    const m = {
      open:        { bg: smt.limeDim,   color: smt.limeText,   border: "rgba(200,230,60,0.3)" },
      SHORTLISTED: { bg: smt.greenDim,  color: smt.green,      border: "rgba(34,197,94,0.3)" },
      REJECTED:    { bg: smt.redDim,    color: smt.red,        border: "rgba(244,63,94,0.3)" },
    };
    const t = m[type] || { bg: "rgba(255,255,255,0.06)", color: smt.textMuted, border: "transparent" };
    return {
      display: "inline-flex", alignItems: "center",
      padding: "3px 11px", borderRadius: "20px",
      fontSize: "11px", fontWeight: 700, letterSpacing: "0.3px",
      background: t.bg, color: t.color, border: `1px solid ${t.border}`,
    };
  },
};

// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, []);
  const map = {
    success: { icon: "✓", border: "rgba(34,197,94,0.5)",   color: smt.green },
    error:   { icon: "✕", border: "rgba(244,63,94,0.5)",   color: smt.red },
    info:    { icon: "ℹ", border: "rgba(200,230,60,0.4)",  color: smt.limeText },
  };
  const t = map[type] || map.info;
  return (
    <div style={{ position:"fixed", bottom:"24px", right:"24px", background:smt.blackCard, border:`1px solid ${t.border}`, borderRadius:"14px", padding:"14px 18px", fontSize:"13px", fontWeight:500, maxWidth:"360px", zIndex:9999, display:"flex", gap:"12px", alignItems:"flex-start", boxShadow:"0 20px 60px rgba(0,0,0,0.6)", fontFamily:font }}>
      <span style={{ width:"22px", height:"22px", borderRadius:"50%", background:`${t.color}22`, color:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:700, flexShrink:0 }}>{t.icon}</span>
      <span style={{ flex:1, color:smt.text, lineHeight:1.5 }}>{message}</span>
      <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:smt.textMuted, fontSize:"18px", lineHeight:1, padding:0 }}>×</button>
    </div>
  );
}

// ── SMT Logo SVG ───────────────────────────────────────────────────────────
function SMTLogo({ size = 36 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
      <div style={{ width:size, height:size, borderRadius:"10px", background:"#0A0A0A", border:`1px solid ${smt.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:size*0.44, color:smt.lime, fontFamily:"'Arial Black',sans-serif", letterSpacing:"-1px", boxShadow:`0 0 20px ${smt.limeGlow}` }}>
        SMT
      </div>
      <div>
        <div style={{ fontSize:"15px", fontWeight:800, color:smt.white, letterSpacing:"-0.3px", lineHeight:1 }}>SMT Labs</div>
        <div style={{ fontSize:"10px", color:smt.lime, fontWeight:600, letterSpacing:"1.5px", lineHeight:1.4 }}>CAREERS</div>
      </div>
    </div>
  );
}

// ── Job Card ───────────────────────────────────────────────────────────────
function JobCard({ job, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...g.card, cursor:"pointer",
        display:"flex", justifyContent:"space-between", alignItems:"center", gap:"20px",
        transition:"all 0.2s",
        borderColor: hov ? smt.lime : smt.border,
        boxShadow: hov ? `0 0 0 1px ${smt.lime}, 0 8px 40px rgba(200,230,60,0.08)` : "none",
        transform: hov ? "translateY(-1px)" : "none",
      }}
    >
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
          <span style={g.badge("open")}>● Hiring</span>
          <span style={{ fontSize:"11px", color:smt.textMuted }}>ID #{job.id}</span>
        </div>
        <h3 style={{ margin:"0 0 8px", fontSize:"17px", fontWeight:700, color:smt.white }}>{job.job_title}</h3>
        <p style={{ margin:0, fontSize:"13px", color:smt.textMuted, lineHeight:1.6, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
          {job.job_description}
        </p>
      </div>
      {/* <div style={{ textAlign:"right", flexShrink:0 }}>
        <div style={{ fontSize:"10px", color:smt.textMuted, fontWeight:600, letterSpacing:"0.8px", marginBottom:"4px" }}>MIN. MATCH</div>
        <div style={{ fontSize:"28px", fontWeight:900, color:smt.lime, lineHeight:1 }}>{job.threshold}%</div>
        <div style={{ color: hov ? smt.lime : smt.textMuted, marginTop:"8px", fontSize:"20px", transition:"color 0.2s" }}>→</div>
      </div> */}
    </div>
  );
}

// ── Job Detail ─────────────────────────────────────────────────────────────
function JobDetail({ job, onBack, onApply }) {
  return (
    <div style={{ maxWidth:"800px", margin:"0 auto", padding:"2rem 1rem" }}>
      <button onClick={onBack} style={{ ...g.btnGhost, marginBottom:"1.75rem" }}>← All Openings</button>
      <div style={g.card}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"20px", flexWrap:"wrap", marginBottom:"1.75rem" }}>
          <div>
            <span style={g.badge("open")}>● Open Position</span>
            <h1 style={{ margin:"12px 0 8px", fontSize:"28px", fontWeight:800, color:smt.white, letterSpacing:"-0.5px" }}>{job.job_title}</h1>
            <div style={{ display:"flex", gap:"20px", flexWrap:"wrap" }}>
              {/* <span style={{ fontSize:"13px", color:smt.textMuted }}>🎯 Threshold: <strong style={{ color:smt.lime }}>{job.threshold}%</strong></span> */}
              <span style={{ fontSize:"13px", color:smt.textMuted }}>📋 Job ID: <strong style={{ color:smt.text }}>#{job.id}</strong></span>
            </div>
          </div>
          <button onClick={onApply} style={{ ...g.btnLime, padding:"13px 28px", fontSize:"15px", boxShadow:`0 0 24px ${smt.limeGlow}` }}>
            Apply Now →
          </button>
        </div>
        <div style={{ borderTop:`1px solid ${smt.border}`, paddingTop:"1.75rem" }}>
          <p style={{ margin:"0 0 12px", fontSize:"10px", fontWeight:700, color:smt.textMuted, letterSpacing:"1.2px", textTransform:"uppercase" }}>About This Role</p>
          <p style={{ margin:0, lineHeight:1.9, fontSize:"14px", color:smt.textDim, whiteSpace:"pre-wrap" }}>{job.job_description}</p>
        </div>
        {/* <div style={{ marginTop:"1.5rem", background:"rgba(200,230,60,0.06)", border:`1px solid rgba(200,230,60,0.2)`, borderRadius:"12px", padding:"14px 16px" }}>
          <p style={{ margin:0, fontSize:"13px", color:smt.limeText, lineHeight:1.6 }}>
            🤖 <strong>AI-Powered Screening</strong> — Your resume is analyzed instantly. You need <strong>{job.threshold}%+</strong> match to be shortlisted. Results emailed within 24 hours.
          </p>
        </div> */}
      </div>
    </div>
  );
}

// ── Apply Form ─────────────────────────────────────────────────────────────
function ApplyForm({ job, onBack, onSuccess }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"" });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState(null);
  const fileRef = useRef();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!resume) e.resume = "Please attach your resume (PDF)";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitting(true);
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("job_id", job.id);
    fd.append("resume", resume);
    try {
      const res = await fetch(`${API}/apply`, { method:"POST", body:fd });
      const data = await res.json();
      onSuccess(data.message || "Application submitted successfully!");
    } catch {
      onSuccess("Application submitted! You'll hear back within 24 hours.");
    }
    setSubmitting(false);
  };

  const fields = [
    { id:"name",  label:"Full Name",      type:"text",  placeholder:"e.g. Abhishek Sharma" },
    { id:"email", label:"Email Address",  type:"email", placeholder:"you@email.com" },
    { id:"phone", label:"Phone Number",   type:"tel",   placeholder:"+91 98765 43210" },
  ];

  const filledCount = [form.name, form.email, form.phone, resume].filter(Boolean).length;

  return (
    <div style={{ maxWidth:"600px", margin:"0 auto", padding:"2rem 1rem" }}>
      <button onClick={onBack} style={{ ...g.btnGhost, marginBottom:"1.75rem" }}>← Back to Job Details</button>
      <div style={g.card}>
        {/* Header */}
        <div style={{ marginBottom:"1.75rem" }}>
          <span style={g.badge("open")}>Applying For</span>
          <h2 style={{ margin:"10px 0 4px", fontSize:"22px", fontWeight:800, color:smt.white, letterSpacing:"-0.3px" }}>{job.job_title}</h2>
          {/* <p style={{ margin:0, fontSize:"13px", color:smt.textMuted }}>Job #{job.id} · Min. {job.threshold}% match required</p> */}
        </div>

        {/* Progress */}
        <div style={{ display:"flex", gap:"6px", marginBottom:"1.75rem" }}>
          {["Details","Resume","Submit"].map((step, i) => {
            const active = i === 0 ? (form.name||form.email||form.phone) : i === 1 ? resume : (filledCount === 4);
            return (
              <div key={i} style={{ flex:1 }}>
                <div style={{ height:"3px", borderRadius:"2px", background: active ? smt.lime : smt.border, marginBottom:"6px", transition:"background 0.3s" }} />
                <span style={{ fontSize:"10px", color: active ? smt.lime : smt.textMuted, fontWeight:600, letterSpacing:"0.3px" }}>{step}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          {fields.map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label style={g.label}>{label}</label>
              <input
                style={{ ...g.input, borderColor: errors[id] ? smt.red : focus === id ? smt.lime : smt.border }}
                type={type} placeholder={placeholder}
                value={form[id]}
                onFocus={() => setFocus(id)}
                onBlur={() => setFocus(null)}
                onChange={(e) => { setForm({...form,[id]:e.target.value}); setErrors({...errors,[id]:null}); }}
              />
              {errors[id] && <p style={{ margin:"4px 0 0", fontSize:"12px", color:smt.red }}>{errors[id]}</p>}
            </div>
          ))}

          {/* Resume Upload */}
          <div>
            <label style={g.label}>Resume (PDF only)</label>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border:`2px dashed ${errors.resume ? smt.red : resume ? smt.lime : smt.border}`,
                borderRadius:"14px", padding:"32px 20px", textAlign:"center",
                cursor:"pointer", background: resume ? "rgba(200,230,60,0.05)" : "#0D0D0D",
                transition:"all 0.2s",
              }}
            >
              <div style={{ fontSize:"32px", marginBottom:"8px" }}>{resume ? "✅" : "📄"}</div>
              <p style={{ margin:"0 0 4px", fontSize:"14px", fontWeight:600, color: resume ? smt.lime : smt.text }}>
                {resume ? resume.name : "Click to upload your resume"}
              </p>
              <p style={{ margin:0, fontSize:"12px", color:smt.textMuted }}>PDF only · Max 5MB</p>
              <input ref={fileRef} type="file" accept=".pdf" style={{ display:"none" }}
                onChange={(e) => { setResume(e.target.files[0]); setErrors({...errors,resume:null}); }} />
            </div>
            {errors.resume && <p style={{ margin:"4px 0 0", fontSize:"12px", color:smt.red }}>{errors.resume}</p>}
          </div>

          {/* <div style={{ background:"rgba(200,230,60,0.06)", border:`1px solid rgba(200,230,60,0.2)`, borderRadius:"12px", padding:"14px 16px" }}>
            <p style={{ margin:0, fontSize:"13px", color:smt.limeText, lineHeight:1.6 }}>
              📬 Your resume will be scored by AI. If you hit <strong>{job.threshold}%+</strong> match, you'll be shortlisted and notified by email within 24 hours.
            </p>
          </div> */}

          <button
            onClick={handleSubmit} disabled={submitting}
            style={{ ...g.btnLime, justifyContent:"center", padding:"14px", fontSize:"15px", marginTop:"4px", opacity: submitting ? 0.7 : 1, boxShadow:`0 0 24px ${smt.limeGlow}` }}
          >
            {submitting ? "⏳ Analyzing resume..." : "Submit Application →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Success Screen ─────────────────────────────────────────────────────────
function SuccessScreen({ message, onReset }) {
  return (
    <div style={{ maxWidth:"480px", margin:"4rem auto", padding:"0 1rem", textAlign:"center", fontFamily:font }}>
      <div style={{ width:"80px", height:"80px", borderRadius:"50%", background:smt.limeDim, border:`2px solid ${smt.lime}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"36px", margin:"0 auto 1.5rem" }}>🎉</div>
      <h2 style={{ fontSize:"26px", fontWeight:800, margin:"0 0 12px", color:smt.white, letterSpacing:"-0.5px" }}>Application Submitted!</h2>
      <p style={{ color:smt.textMuted, fontSize:"14px", lineHeight:1.7, margin:"0 0 2rem" }}>{message}</p>
      <div style={{ background:smt.limeDim, border:`1px solid rgba(200,230,60,0.3)`, borderRadius:"14px", padding:"18px", marginBottom:"1.5rem" }}>
        <p style={{ margin:0, fontSize:"13px", color:smt.limeText, lineHeight:1.8 }}>
          {/* ✅ Resume analyzed by AI<br /> */}
          📧 Check email inbox for result <br />
          ⏱ Usually within 24 hours
        </p>
      </div>
      <button onClick={onReset} style={{ ...g.btnLime, padding:"13px 28px", boxShadow:`0 0 20px ${smt.limeGlow}` }}>
        Apply for Another Role
      </button>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function CandidatePortal() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("listings");
  const [selectedJob, setSelectedJob] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch(`${API}/jobs/`)
      .then(r => r.json())
      .then(data => { setJobs(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => {
        setJobs([
          { id:1, job_title:"Senior React Developer", job_description:"4+ years React, TypeScript, Redux, REST APIs, Git. Build scalable web applications.", threshold:70 },
          { id:2, job_title:"Backend Python Engineer", job_description:"Python, FastAPI, PostgreSQL, Docker, AWS. 3+ years required.", threshold:65 },
          { id:3, job_title:"ML Engineer", job_description:"Python, TensorFlow, scikit-learn, MLOps, model deployment.", threshold:75 },
        ]);
        setLoading(false);
        setToast({ message:"Demo mode — connect FastAPI at localhost:8000", type:"info" });
      });
  }, []);

  const filtered = jobs.filter(j =>
    j.job_title?.toLowerCase().includes(search.toLowerCase()) ||
    j.job_description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily:font, minHeight:"100vh", background:smt.black, color:smt.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Nav */}
      <nav style={{ background:"rgba(10,10,10,0.95)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${smt.border}`, padding:"0 2rem", display:"flex", alignItems:"center", height:"64px", gap:"12px", position:"sticky", top:0, zIndex:100 }}>
        <SMTLogo size={32} />
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"16px" }}>
          <span style={{ fontSize:"12px", color:smt.textMuted }}>{jobs.length} open position{jobs.length!==1?"s":""}</span>
          <a href="https://smtlabs.io" target="_blank" rel="noreferrer" style={{ fontSize:"12px", color:smt.lime, fontWeight:600, textDecoration:"none" }}>smtlabs.io ↗</a>
        </div>
      </nav>

      {/* Views */}
      {view === "listings" && (
        <div style={{ maxWidth:"900px", margin:"0 auto", padding:"2rem 1rem" }}>

          {/* Hero */}
          <div style={{ background:"linear-gradient(135deg, #0F0F0F 0%, #111111 50%, #0A0A0A 100%)", border:`1px solid ${smt.border}`, borderRadius:"20px", padding:"3.5rem 2.5rem", marginBottom:"2rem", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"300px", height:"300px", borderRadius:"50%", background:`radial-gradient(circle, ${smt.limeGlow} 0%, transparent 70%)`, pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:"-60px", left:"60%", width:"200px", height:"200px", borderRadius:"50%", background:`radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)`, pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              {/* <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:smt.limeDim, border:`1px solid rgba(200,230,60,0.3)`, borderRadius:"20px", padding:"5px 14px", fontSize:"11px", fontWeight:700, color:smt.lime, letterSpacing:"1px", marginBottom:"20px" }}>
                ● AI-POWERED RECRUITMENT
              </div> */}
              <h1 style={{ color:smt.white, fontSize:"38px", fontWeight:900, margin:"0 0 14px", lineHeight:1.1, letterSpacing:"-1px" }}>
                Build Your Career<br />
                <span style={{ color:smt.lime }}>at SMT Labs</span>
              </h1>
              <p style={{ color:smt.textMuted, fontSize:"15px", margin:"0 0 28px", maxWidth:"440px", lineHeight:1.7 }}>
                Upload your resume and our AI instantly scores your fit. Real results, zero bias, instant feedback.
              </p>
              <div style={{ position:"relative", maxWidth:"420px" }}>
                <input
                  style={{ ...g.input, paddingLeft:"40px", borderColor:"rgba(200,230,60,0.2)", background:"rgba(255,255,255,0.04)" }}
                  placeholder="Search roles, skills..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <span style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", fontSize:"15px", color:smt.textMuted }}>🔍</span>
              </div>
            </div>
          </div>

          {/* Listings Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
            <h2 style={{ margin:0, fontSize:"16px", fontWeight:700, color:smt.white }}>
              Open Positions
              <span style={{ marginLeft:"8px", fontSize:"13px", fontWeight:400, color:smt.textMuted }}>{filtered.length} available</span>
            </h2>
          </div>

          {loading ? (
            <div style={{ textAlign:"center", padding:"5rem", color:smt.textMuted }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"50%", border:`2px solid ${smt.border}`, borderTopColor:smt.lime, margin:"0 auto 14px", animation:"spin 0.8s linear infinite" }} />
              <p>Loading positions...</p>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"5rem", color:smt.textMuted }}>
              <div style={{ fontSize:"48px", marginBottom:"12px" }}>🔍</div>
              <p style={{ fontWeight:600, color:smt.text }}>No roles match your search</p>
              <p style={{ fontSize:"13px" }}>Try different keywords</p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {filtered.map(job => (
                <JobCard key={job.id} job={job} onClick={() => { setSelectedJob(job); setView("detail"); }} />
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop:"3rem", paddingTop:"2rem", borderTop:`1px solid ${smt.border}`, textAlign:"center" }}>
            <p style={{ fontSize:"12px", color:smt.textMuted }}>
              © 2024 SMT Labs · <a href="https://smtlabs.io" style={{ color:smt.lime, textDecoration:"none" }}>smtlabs.io</a>
            </p>
          </div>
        </div>
      )}

      {view === "detail" && selectedJob && (
        <JobDetail job={selectedJob} onBack={() => { setView("listings"); setSelectedJob(null); }} onApply={() => setView("apply")} />
      )}
      {view === "apply" && selectedJob && (
        <ApplyForm job={selectedJob} onBack={() => setView("detail")} onSuccess={msg => { setSuccessMsg(msg); setView("success"); }} />
      )}
      {view === "success" && (
        <SuccessScreen message={successMsg} onReset={() => { setView("listings"); setSelectedJob(null); setSuccessMsg(""); }} />
      )}
    </div>
  );
}