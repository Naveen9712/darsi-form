import { useState } from "react";

const mandals = ["దర్శి", "డొనకొండ", "కురిచేడు", "జాట్లూరు", "ముందుమూరు"];

const villagesByMandal = {
  దర్శి: ["దర్శి", "పొదిలి", "రాచర్ల", "రంగారెడ్డిపాలెం", "వల్లూరు"],
  డొనకొండ: ["డొనకొండ", "ఆత్మకూరు", "కంభం", "మార్కాపురం"],
  కురిచేడు: ["కురిచేడు", "బెస్తవారిపేట", "వేదులపాడు"],
  జాట్లూరు: ["జాట్లూరు", "కనిగిరి", "పొదిలి"],
  ముందుమూరు: ["ముందుమూరు", "ఒంగోలు", "చేబ్రోలు"],
};

const RadioGroup = ({ name, options, value, onChange, required }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
    {options.map((opt) => (
      <label key={opt} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <div
          onClick={() => onChange(opt)}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: `2px solid ${value === opt ? "#d4380d" : "#ccc"}`,
            background: value === opt ? "#d4380d" : "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
            boxShadow: value === opt ? "0 0 0 3px rgba(212,56,13,0.15)" : "none",
          }}
        >
          {value === opt && (
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "white" }} />
          )}
        </div>
        <span style={{ fontSize: "15px", color: "#333", fontFamily: "'Noto Sans Telugu', sans-serif" }}>{opt}</span>
      </label>
    ))}
  </div>
);

const QuestionCard = ({ number, label, required, children }) => (
  <div
    style={{
      background: "white",
      borderRadius: "12px",
      padding: "22px 26px",
      marginBottom: "16px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      border: "1px solid #f0f0f0",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "4px",
        height: "100%",
        background: "linear-gradient(180deg, #d4380d, #fa8c16)",
        borderRadius: "4px 0 0 4px",
      }}
    />
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "4px" }}>
      <span
        style={{
          background: "linear-gradient(135deg, #d4380d, #fa8c16)",
          color: "white",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "700",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {number}
      </span>
      <label style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a2e", fontFamily: "'Noto Sans Telugu', sans-serif", lineHeight: "1.5" }}>
        {label}
        {required && <span style={{ color: "#d4380d", marginLeft: "4px" }}>*</span>}
      </label>
    </div>
    <div style={{ paddingLeft: "34px" }}>{children}</div>
  </div>
);

export default function DarsiPoliticalSurvey() {
  const [form, setForm] = useState({
    mandal: "",
    village: "",
    age: "",
    gender: "",
    voted2024: "",
    voteNext: "",
    gottipatiRating: "",
    bachepalliBRating: "",
    sarpanchSupport: "",
    mainProblem: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const API_URL = "https://trendyhomevibe.com/wp-json/darsi-survey/v1/submit"; // ← change to your backend URL

  const set = (key) => (val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: false }));
  };

  const validate = () => {
    const required = ["mandal", "village", "age", "gender", "voted2024", "voteNext", "gottipatiRating", "bachepalliBRating", "sarpanchSupport"];
    const newErrors = {};
    required.forEach((k) => {
      if (!form[k]) newErrors[k] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mandal: form.mandal,
          village: form.village,
          age: form.age,
          gender: form.gender,
          voted_2024: form.voted2024,
          vote_next: form.voteNext,
          gottipati_rating: form.gottipatiRating,
          bachepalli_rating: form.bachepalliBRating,
          sarpanch_support: form.sarpanchSupport,
          main_problem: form.mainProblem,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setApiError(data.message || "సమర్పించడంలో లోపం జరిగింది. మళ్ళీ ప్రయత్నించండి.");
      }
    } catch (err) {
      setApiError("నెట్‌వర్క్ లోపం. దయచేసి మీ కనెక్షన్ తనిఖీ చేసి మళ్ళీ ప్రయత్నించండి.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#faf7f4", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans Telugu', sans-serif", padding: "20px" }}>
        <div style={{ background: "white", borderRadius: "20px", padding: "48px", textAlign: "center", maxWidth: "480px", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🙏</div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e", marginBottom: "12px" }}>ధన్యవాదాలు!</h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: "1.7" }}>మీ సర్వే విజయవంతంగా సమర్పించబడింది. మీ అభిప్రాయం మాకు చాలా విలువైనది.</p>
          <button
            onClick={() => { setForm({ mandal:"",village:"",age:"",gender:"",voted2024:"",voteNext:"",gottipatiRating:"",bachepalliBRating:"",sarpanchSupport:"",mainProblem:"" }); setSubmitted(false); }}
            style={{ marginTop: "24px", background: "linear-gradient(135deg, #d4380d, #fa8c16)", color: "white", border: "none", borderRadius: "10px", padding: "12px 32px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}
          >
            మళ్ళీ సమర్పించు
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: "#faf7f4", padding: "0 0 60px 0" }}>

        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
            padding: "36px 0 32px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative saffron stripe */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: "linear-gradient(90deg, #ff9933, #ffffff, #138808, #ffffff, #ff9933)" }} />

          <div style={{ display: "inline-block", background: "rgba(212,56,13,0.2)", border: "1px solid rgba(212,56,13,0.5)", borderRadius: "20px", padding: "4px 16px", marginBottom: "14px" }}>
            <span style={{ color: "#fa8c16", fontSize: "12px", fontWeight: "700", letterSpacing: "2px" }}>BSR NEWS · PUBLIC POLL</span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "white",
              fontSize: "28px",
              fontWeight: "700",
              letterSpacing: "1px",
              margin: "0 0 6px",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            DARSI POLITICAL SURVEY
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", maxWidth: "460px", margin: "0 auto", lineHeight: "1.6", fontFamily: "'Noto Sans Telugu', sans-serif" }}>
            ఈ సర్వే దర్శి నియోజకవర్గంలో ప్రజల అభిప్రాయాన్ని అర్థం చేసుకోవడానికి BSR News నిర్వహిస్తోంది. ఇది పూర్తిగా అనామకంగా ఉంటుంది.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "20px" }}>
            {["🔒 Anonymous", "⏱ 30 Seconds", "📊 Public Poll"].map((tag) => (
              <span key={tag} style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: "500" }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div style={{ width: "100%", padding: "28px 24px 0 24px", boxSizing: "border-box" }}>

          <QuestionCard number="1" label="మీ మండలం ఏది?" required>
            <RadioGroup name="mandal" options={mandals} value={form.mandal} onChange={set("mandal")} />
            {errors.mandal && <p style={{ color: "#d4380d", fontSize: "12px", marginTop: "8px" }}>దయచేసి మండలం ఎంచుకోండి</p>}
          </QuestionCard>

          <QuestionCard number="2" label="మీ గ్రామం ఏది?" required>
            <select
              value={form.village}
              onChange={(e) => { set("village")(e.target.value); setErrors(er => ({...er, village: false})); }}
              disabled={!form.mandal}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: `1.5px solid ${errors.village ? "#d4380d" : "#e0e0e0"}`,
                fontSize: "14px",
                color: form.village ? "#333" : "#999",
                background: "white",
                marginTop: "8px",
                fontFamily: "'Noto Sans Telugu', sans-serif",
                cursor: form.mandal ? "pointer" : "not-allowed",
                outline: "none",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}
            >
              <option value="">మీ గ్రామం ఎంచుకోండి</option>
              {(villagesByMandal[form.mandal] || []).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            {errors.village && <p style={{ color: "#d4380d", fontSize: "12px", marginTop: "6px" }}>దయచేసి గ్రామం ఎంచుకోండి</p>}
          </QuestionCard>

          <QuestionCard number="3" label="మీ వయస్సు?" required>
            <RadioGroup name="age" options={["18-25", "26-40", "41-60", "60+"]} value={form.age} onChange={set("age")} />
            {errors.age && <p style={{ color: "#d4380d", fontSize: "12px", marginTop: "8px" }}>దయచేసి వయస్సు ఎంచుకోండి</p>}
          </QuestionCard>

          <QuestionCard number="4" label="మీ లింగం?" required>
            <RadioGroup name="gender" options={["స్త్రీ", "పురుషుడు"]} value={form.gender} onChange={set("gender")} />
            {errors.gender && <p style={{ color: "#d4380d", fontSize: "12px", marginTop: "8px" }}>దయచేసి లింగం ఎంచుకోండి</p>}
          </QuestionCard>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "8px 0 16px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #ddd)" }} />
            <span style={{ color: "#999", fontSize: "11px", fontWeight: "600", letterSpacing: "1px" }}>రాజకీయ అభిప్రాయాలు</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #ddd, transparent)" }} />
          </div>

          <QuestionCard number="5" label="2024 లో ఎవరికి ఓటు వేకారు?">
            <RadioGroup
              name="voted2024"
              options={["వైఎస్ఆర్ కాంగ్రెస్ పార్టీ", "తెలుగుదేశం పార్టీ"]}
              value={form.voted2024}
              onChange={set("voted2024")}
            />
          </QuestionCard>

          <QuestionCard number="6" label="ఇప్పుడు MLA ఎన్నికలు జరిగితే ఎవరికి ఓటు వేస్తారు?" required>
            <RadioGroup
              name="voteNext"
              options={["తెలుగుదేశం పార్టీ", "వైఎస్ఆర్ కాంగ్రెస్ పార్టీ", "జనసేన పార్టీ", "బీజేపీ పార్టీ", "BCY పార్టీ"]}
              value={form.voteNext}
              onChange={set("voteNext")}
            />
            {errors.voteNext && <p style={{ color: "#d4380d", fontSize: "12px", marginTop: "8px" }}>దయచేసి ఒక పార్టీ ఎంచుకోండి</p>}
          </QuestionCard>

          <QuestionCard number="7" label="గొట్టిపాటి లక్ష్మి నాయకత్వం ఎలా ఉంది?" required>
            <RadioGroup
              name="gottipatiRating"
              options={["బాగుంది", "బాగలేదు"]}
              value={form.gottipatiRating}
              onChange={set("gottipatiRating")}
            />
            {errors.gottipatiRating && <p style={{ color: "#d4380d", fontSize: "12px", marginTop: "8px" }}>దయచేసి సమాధానం ఎంచుకోండి</p>}
          </QuestionCard>

          <QuestionCard number="8" label="బాచేపల్లి శివప్రసాద్ రెడ్డి నాయకత్వం ఎలా ఉంది?" required>
            <RadioGroup
              name="bachepalliBRating"
              options={["బాగుంది", "బాగలేదు"]}
              value={form.bachepalliBRating}
              onChange={set("bachepalliBRating")}
            />
            {errors.bachepalliBRating && <p style={{ color: "#d4380d", fontSize: "12px", marginTop: "8px" }}>దయచేసి సమాధానం ఎంచుకోండి</p>}
          </QuestionCard>

          <QuestionCard number="9" label="రాబోయే సర్పంచ్ ఎన్నికల్లో మీ మద్దతు ఎవరికి?" required>
            <RadioGroup
              name="sarpanchSupport"
              options={["టీడీపీ", "వైఎస్పీ", "జనసేన", "ఇండిపెండెంట్"]}
              value={form.sarpanchSupport}
              onChange={set("sarpanchSupport")}
            />
            {errors.sarpanchSupport && <p style={{ color: "#d4380d", fontSize: "12px", marginTop: "8px" }}>దయచేసి సమాధానం ఎంచుకోండి</p>}
          </QuestionCard>

          <QuestionCard number="10" label="మీ ఊరిలో ప్రధాన సమస్య ఏంటి?">
            <textarea
              value={form.mainProblem}
              onChange={(e) => set("mainProblem")(e.target.value)}
              placeholder="మీ అభిప్రాయం ఇక్కడ రాయండి..."
              rows={4}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1.5px solid #e0e0e0",
                fontSize: "14px",
                fontFamily: "'Noto Sans Telugu', sans-serif",
                color: "#333",
                resize: "vertical",
                marginTop: "8px",
                outline: "none",
                boxSizing: "border-box",
                lineHeight: "1.6",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#d4380d")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
          </QuestionCard>

          {/* Submit */}
          <div style={{ background: "white", borderRadius: "12px", padding: "22px 26px", border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            {Object.keys(errors).length > 0 && (
              <div style={{ background: "#fff2f0", border: "1px solid #ffccc7", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px" }}>
                <p style={{ color: "#d4380d", fontSize: "13px", margin: 0 }}>⚠️ దయచేసి అన్ని తప్పనిసరి ప్రశ్నలకు సమాధానం ఇవ్వండి.</p>
              </div>
            )}

            {apiError && (
              <div style={{ background: "#fff2f0", border: "1px solid #ffccc7", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px" }}>
                <p style={{ color: "#d4380d", fontSize: "13px", margin: 0 }}>⚠️ {apiError}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#ccc" : "linear-gradient(135deg, #d4380d 0%, #fa8c16 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "14px 24px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Noto Sans Telugu', sans-serif",
                letterSpacing: "0.5px",
                boxShadow: loading ? "none" : "0 4px 16px rgba(212,56,13,0.35)",
                transition: "all 0.2s",
              }}
            >
              {loading ? "సమర్పిస్తోంది..." : "సమర్పించు →"}
            </button>

            <p style={{ textAlign: "center", color: "#999", fontSize: "12px", marginTop: "12px", fontFamily: "'Noto Sans Telugu', sans-serif" }}>
              🔒 మీ డేటా పూర్తిగా అనామకంగా ఉంటుంది · BSR News
            </p>
          </div>
        </div>
      </div>
    </>
  );
}