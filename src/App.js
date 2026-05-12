/* eslint-disable */
import cyntegrityLogo from './cyntegrity-logo.png';
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

const USERS = [
  { email:"demo@cyntegrity.com", password:"demo123", name:"Jane Mitchell", initials:"JM", role:"Clinical Monitor" },
  { email:"admin@cyntegrity.com", password:"admin123", name:"Dr. Ali Yılmaz", initials:"AY", role:"Study Director" },
];

const STUDIES = [
  { _id:"s01", studyId:"CYN-2024-01", title:"CARDIA-PROTECT III", phase:"III", indication:"Cardiovascular", sponsor:"PharmaCo AG", sites:42, enrolled:387, target:420, status:"active", riskScore:72, signals:4, startDate:"2023-03-10", endDate:"2025-09-30", kris:[{name:"Enrollment Rate",value:88,threshold:80,unit:"%",ok:true},{name:"Data Completeness",value:96,threshold:90,unit:"%",ok:true},{name:"Protocol Deviation",value:3.2,threshold:5,unit:"%",ok:true},{name:"SAE Reporting",value:98,threshold:95,unit:"%",ok:true}], signalList:[{type:"info",msg:"Enrollment on track at site US-04"},{type:"warn",msg:"Minor protocol deviation at site DE-02"},{type:"info",msg:"Data lock scheduled in 14 days"},{type:"ok",msg:"All KRIs within threshold"}], siteList:[{id:"US-04",country:"USA",patients:38,status:"active"},{id:"DE-02",country:"Germany",patients:29,status:"warn"},{id:"FR-07",country:"France",patients:44,status:"active"},{id:"IT-01",country:"Italy",patients:31,status:"active"}],
    bubbles:[{r:14,color:"#1d9e75"},{r:11,color:"#1d9e75"},{r:13,color:"#ba7517"},{r:10,color:"#1d9e75"},{r:9,color:"#ba7517"},{r:12,color:"#1d9e75"},{r:8,color:"#1d9e75"},{r:10,color:"#1d9e75"}] },
  { _id:"s02", studyId:"CYN-2024-03", title:"NEURO-FLEX II", phase:"II", indication:"Neurology", sponsor:"BioNova Ltd", sites:18, enrolled:142, target:200, status:"at_risk", riskScore:54, signals:9, startDate:"2023-11-01", endDate:"2026-04-30", kris:[{name:"Enrollment Rate",value:61,threshold:80,unit:"%",ok:false},{name:"Data Completeness",value:87,threshold:90,unit:"%",ok:false},{name:"Protocol Deviation",value:7.1,threshold:5,unit:"%",ok:false},{name:"SAE Reporting",value:97,threshold:95,unit:"%",ok:true}], signalList:[{type:"crit",msg:"Enrollment rate deviation >15% at 3 sites"},{type:"warn",msg:"Data completeness below threshold at UK-03"},{type:"warn",msg:"Protocol deviation rate elevated"},{type:"crit",msg:"Site JP-02 on hold pending IRB review"}], siteList:[{id:"UK-03",country:"UK",patients:18,status:"warn"},{id:"JP-02",country:"Japan",patients:12,status:"crit"},{id:"CA-01",country:"Canada",patients:24,status:"active"},{id:"AU-05",country:"Australia",patients:19,status:"warn"}],
    bubbles:[{r:13,color:"#ba7517"},{r:11,color:"#e24b4a"},{r:10,color:"#ba7517"},{r:12,color:"#e24b4a"},{r:9,color:"#ba7517"},{r:11,color:"#1d9e75"},{r:8,color:"#ba7517"},{r:10,color:"#e24b4a"}] },
  { _id:"s03", studyId:"CYN-2023-09", title:"ONCO-SHIELD III", phase:"III", indication:"Oncology", sponsor:"GeneTech SA", sites:67, enrolled:891, target:950, status:"critical", riskScore:31, signals:17, startDate:"2022-06-15", endDate:"2025-12-31", kris:[{name:"Enrollment Rate",value:74,threshold:80,unit:"%",ok:false},{name:"Data Completeness",value:78,threshold:90,unit:"%",ok:false},{name:"Protocol Deviation",value:9.4,threshold:5,unit:"%",ok:false},{name:"SAE Reporting",value:91,threshold:95,unit:"%",ok:false}], signalList:[{type:"crit",msg:"Data completeness <80% at site DE-07"},{type:"crit",msg:"SAE reporting delays detected"},{type:"crit",msg:"Protocol deviation rate critically high"},{type:"warn",msg:"Site audit scheduled for 6 locations"}], siteList:[{id:"DE-07",country:"Germany",patients:55,status:"crit"},{id:"ES-03",country:"Spain",patients:43,status:"warn"},{id:"PL-01",country:"Poland",patients:67,status:"warn"},{id:"CZ-02",country:"Czechia",patients:38,status:"crit"}],
    bubbles:[{r:14,color:"#e24b4a"},{r:12,color:"#e24b4a"},{r:13,color:"#e24b4a"},{r:10,color:"#ba7517"},{r:11,color:"#e24b4a"},{r:9,color:"#e24b4a"},{r:12,color:"#ba7517"},{r:10,color:"#e24b4a"}] },
  { _id:"s04", studyId:"CYN-2025-02", title:"IMMUNO-GATE I", phase:"I", indication:"Immunology", sponsor:"ImmuCore BV", sites:8, enrolled:24, target:60, status:"planning", riskScore:85, signals:1, startDate:"2025-02-01", endDate:"2026-08-31", kris:[{name:"Enrollment Rate",value:40,threshold:80,unit:"%",ok:false},{name:"Data Completeness",value:100,threshold:90,unit:"%",ok:true},{name:"Protocol Deviation",value:0,threshold:5,unit:"%",ok:true},{name:"SAE Reporting",value:100,threshold:95,unit:"%",ok:true}], signalList:[{type:"info",msg:"Study in early enrollment phase"},{type:"ok",msg:"All sites activated successfully"}], siteList:[{id:"NL-01",country:"Netherlands",patients:8,status:"active"},{id:"BE-02",country:"Belgium",patients:7,status:"active"},{id:"SE-01",country:"Sweden",patients:9,status:"active"}],
    bubbles:[{r:10,color:"#1d9e75"},{r:8,color:"#1d9e75"},{r:9,color:"#1d9e75"},{r:7,color:"#ba7517"},{r:8,color:"#1d9e75"},{r:6,color:"#1d9e75"}] },
  { _id:"s05", studyId:"CYN-2024-07", title:"CARDIO-RENEW II", phase:"II", indication:"Cardiovascular", sponsor:"HeartCure GmbH", sites:29, enrolled:253, target:280, status:"active", riskScore:78, signals:3, startDate:"2023-07-20", endDate:"2025-11-30", kris:[{name:"Enrollment Rate",value:90,threshold:80,unit:"%",ok:true},{name:"Data Completeness",value:94,threshold:90,unit:"%",ok:true},{name:"Protocol Deviation",value:2.8,threshold:5,unit:"%",ok:true},{name:"SAE Reporting",value:99,threshold:95,unit:"%",ok:true}], signalList:[{type:"info",msg:"Enrollment ahead of schedule"},{type:"ok",msg:"No protocol deviations this month"},{type:"info",msg:"Interim analysis due in 30 days"}], siteList:[{id:"US-11",country:"USA",patients:42,status:"active"},{id:"DE-04",country:"Germany",patients:38,status:"active"},{id:"FR-02",country:"France",patients:31,status:"active"}],
    bubbles:[{r:13,color:"#1d9e75"},{r:11,color:"#1d9e75"},{r:12,color:"#1d9e75"},{r:9,color:"#ba7517"},{r:10,color:"#1d9e75"},{r:11,color:"#1d9e75"},{r:8,color:"#1d9e75"}] },
  { _id:"s06", studyId:"CYN-2024-11", title:"RESP-CLEAR IV", phase:"IV", indication:"Respiratory", sponsor:"PulmoTech Inc", sites:55, enrolled:1204, target:1300, status:"at_risk", riskScore:58, signals:7, startDate:"2022-01-10", endDate:"2025-06-30", kris:[{name:"Enrollment Rate",value:75,threshold:80,unit:"%",ok:false},{name:"Data Completeness",value:88,threshold:90,unit:"%",ok:false},{name:"Protocol Deviation",value:4.9,threshold:5,unit:"%",ok:true},{name:"SAE Reporting",value:96,threshold:95,unit:"%",ok:true}], signalList:[{type:"warn",msg:"Enrollment slowdown at 4 European sites"},{type:"warn",msg:"Data completeness approaching threshold"},{type:"info",msg:"Study close-out planned for Q2 2025"}], siteList:[{id:"IT-05",country:"Italy",patients:88,status:"warn"},{id:"ES-07",country:"Spain",patients:76,status:"active"},{id:"GR-01",country:"Greece",patients:54,status:"warn"}],
    bubbles:[{r:12,color:"#ba7517"},{r:11,color:"#ba7517"},{r:10,color:"#1d9e75"},{r:13,color:"#ba7517"},{r:9,color:"#1d9e75"},{r:10,color:"#ba7517"},{r:8,color:"#e24b4a"}] },
  { _id:"s07", studyId:"CYN-2022-14", title:"DIAB-CONTROL III", phase:"III", indication:"Endocrinology", sponsor:"GlucoMed SA", sites:38, enrolled:620, target:620, status:"completed", riskScore:91, signals:0, startDate:"2021-05-01", endDate:"2024-12-31", kris:[{name:"Enrollment Rate",value:100,threshold:80,unit:"%",ok:true},{name:"Data Completeness",value:99,threshold:90,unit:"%",ok:true},{name:"Protocol Deviation",value:1.2,threshold:5,unit:"%",ok:true},{name:"SAE Reporting",value:100,threshold:95,unit:"%",ok:true}], signalList:[{type:"ok",msg:"Study completed successfully"},{type:"ok",msg:"Final data lock achieved"},{type:"ok",msg:"CSR submitted to regulatory authority"}], siteList:[{id:"US-01",country:"USA",patients:120,status:"active"},{id:"DE-01",country:"Germany",patients:95,status:"active"},{id:"FR-01",country:"France",patients:88,status:"active"}],
    bubbles:[{r:14,color:"#1d9e75"},{r:12,color:"#1d9e75"},{r:13,color:"#1d9e75"},{r:11,color:"#1d9e75"},{r:10,color:"#1d9e75"},{r:12,color:"#1d9e75"},{r:9,color:"#1d9e75"},{r:11,color:"#1d9e75"}] },
  { _id:"s08", studyId:"CYN-2024-05", title:"ARTHRO-EASE II", phase:"II", indication:"Rheumatology", sponsor:"JointCare BV", sites:22, enrolled:178, target:220, status:"active", riskScore:69, signals:5, startDate:"2024-01-15", endDate:"2026-07-31", kris:[{name:"Enrollment Rate",value:81,threshold:80,unit:"%",ok:true},{name:"Data Completeness",value:91,threshold:90,unit:"%",ok:true},{name:"Protocol Deviation",value:5.8,threshold:5,unit:"%",ok:false},{name:"SAE Reporting",value:94,threshold:95,unit:"%",ok:false}], signalList:[{type:"warn",msg:"Protocol deviation rate slightly above threshold"},{type:"warn",msg:"SAE reporting timeliness declining"},{type:"info",msg:"Site monitoring visit scheduled at UK-07"}], siteList:[{id:"UK-07",country:"UK",patients:34,status:"warn"},{id:"NL-03",country:"Netherlands",patients:28,status:"active"},{id:"AT-01",country:"Austria",patients:22,status:"active"}],
    bubbles:[{r:12,color:"#1d9e75"},{r:10,color:"#ba7517"},{r:11,color:"#ba7517"},{r:9,color:"#1d9e75"},{r:10,color:"#e24b4a"},{r:8,color:"#ba7517"},{r:11,color:"#1d9e75"}] },
  { _id:"s09", studyId:"CYN-2023-17", title:"PSYCH-RESTORE I", phase:"I", indication:"Psychiatry", sponsor:"MindBridge AG", sites:6, enrolled:31, target:40, status:"active", riskScore:82, signals:2, startDate:"2023-09-01", endDate:"2025-03-31", kris:[{name:"Enrollment Rate",value:85,threshold:80,unit:"%",ok:true},{name:"Data Completeness",value:97,threshold:90,unit:"%",ok:true},{name:"Protocol Deviation",value:2.1,threshold:5,unit:"%",ok:true},{name:"SAE Reporting",value:100,threshold:95,unit:"%",ok:true}], signalList:[{type:"info",msg:"Enrollment nearing completion"},{type:"ok",msg:"All safety reporting timely"}], siteList:[{id:"CH-01",country:"Switzerland",patients:12,status:"active"},{id:"DE-09",country:"Germany",patients:10,status:"active"},{id:"AT-02",country:"Austria",patients:9,status:"active"}],
    bubbles:[{r:11,color:"#1d9e75"},{r:9,color:"#1d9e75"},{r:10,color:"#1d9e75"},{r:8,color:"#ba7517"},{r:9,color:"#1d9e75"},{r:7,color:"#1d9e75"}] },
  { _id:"s10", studyId:"CYN-2021-08", title:"HEMA-BOOST II", phase:"II", indication:"Hematology", sponsor:"BloodTech Ltd", sites:31, enrolled:410, target:410, status:"completed", riskScore:88, signals:0, startDate:"2020-11-01", endDate:"2023-10-31", kris:[{name:"Enrollment Rate",value:100,threshold:80,unit:"%",ok:true},{name:"Data Completeness",value:98,threshold:90,unit:"%",ok:true},{name:"Protocol Deviation",value:1.8,threshold:5,unit:"%",ok:true},{name:"SAE Reporting",value:99,threshold:95,unit:"%",ok:true}], signalList:[{type:"ok",msg:"Study completed, all data locked"},{type:"ok",msg:"Regulatory submission completed"}], siteList:[{id:"US-08",country:"USA",patients:95,status:"active"},{id:"CA-03",country:"Canada",patients:72,status:"active"},{id:"AU-02",country:"Australia",patients:68,status:"active"}],
    bubbles:[{r:13,color:"#1d9e75"},{r:11,color:"#1d9e75"},{r:12,color:"#1d9e75"},{r:10,color:"#1d9e75"},{r:11,color:"#1d9e75"},{r:9,color:"#1d9e75"},{r:10,color:"#1d9e75"}] },
  { _id:"s11", studyId:"CYN-2025-04", title:"DERM-CLEAR I", phase:"I", indication:"Dermatology", sponsor:"SkinBio GmbH", sites:5, enrolled:12, target:30, status:"planning", riskScore:90, signals:0, startDate:"2025-04-01", endDate:"2026-10-31", kris:[{name:"Enrollment Rate",value:40,threshold:80,unit:"%",ok:false},{name:"Data Completeness",value:100,threshold:90,unit:"%",ok:true},{name:"Protocol Deviation",value:0,threshold:5,unit:"%",ok:true},{name:"SAE Reporting",value:100,threshold:95,unit:"%",ok:true}], signalList:[{type:"info",msg:"Site activation in progress"},{type:"ok",msg:"Protocol approved by all IRBs"}], siteList:[{id:"DE-12",country:"Germany",patients:5,status:"active"},{id:"FR-09",country:"France",patients:4,status:"active"},{id:"IT-08",country:"Italy",patients:3,status:"active"}],
    bubbles:[{r:9,color:"#1d9e75"},{r:7,color:"#1d9e75"},{r:8,color:"#ba7517"},{r:6,color:"#1d9e75"},{r:7,color:"#1d9e75"}] },
  { _id:"s12", studyId:"CYN-2024-09", title:"RENAL-GUARD III", phase:"III", indication:"Nephrology", sponsor:"KidneyCare SA", sites:48, enrolled:534, target:600, status:"at_risk", riskScore:51, signals:11, startDate:"2023-05-15", endDate:"2026-02-28", kris:[{name:"Enrollment Rate",value:70,threshold:80,unit:"%",ok:false},{name:"Data Completeness",value:84,threshold:90,unit:"%",ok:false},{name:"Protocol Deviation",value:6.3,threshold:5,unit:"%",ok:false},{name:"SAE Reporting",value:93,threshold:95,unit:"%",ok:false}], signalList:[{type:"crit",msg:"All KRIs below threshold — escalation triggered"},{type:"warn",msg:"Site closures being considered at 3 locations"},{type:"crit",msg:"Sponsor review meeting scheduled urgently"}], siteList:[{id:"US-15",country:"USA",patients:78,status:"crit"},{id:"BR-01",country:"Brazil",patients:62,status:"warn"},{id:"MX-02",country:"Mexico",patients:55,status:"warn"}],
    bubbles:[{r:13,color:"#e24b4a"},{r:11,color:"#ba7517"},{r:12,color:"#e24b4a"},{r:10,color:"#e24b4a"},{r:11,color:"#ba7517"},{r:9,color:"#e24b4a"},{r:10,color:"#e24b4a"},{r:8,color:"#ba7517"}] },
];

const EMAILJS_SERVICE = 'service_e2y2ntt';
const EMAILJS_REQUEST_TEMPLATE = 'template_9hmtuzo';
const EMAILJS_REVIEW_TEMPLATE = 'template_umy39pz';
const EMAILJS_PUBLIC_KEY = 'n8OqD6LfB3l7bkcYy';

const C = { navy:"#0f2a4a", teal:"#1d9e75", blue:"#185fa5", warn:"#ba7517", danger:"#e24b4a", purple:"#534ab7", bg:"#f0f4f8", card:"#ffffff", border:"#e2e8f0", textPrimary:"#1a2233", textSecondary:"#64748b", textMuted:"#94a3b8" };
const statusCfg = { active:{label:"Active",bg:"#eaf3de",color:"#3b6d11"}, at_risk:{label:"At Risk",bg:"#faeeda",color:"#854f0b"}, critical:{label:"Critical",bg:"#fcebeb",color:"#a32d2d"}, planning:{label:"Planning",bg:"#e6f1fb",color:"#185fa5"}, completed:{label:"Completed",bg:"#eeedfe",color:"#534ab7"} };
const siteCfg = { active:{color:"#1d9e75"}, warn:{color:"#ba7517"}, crit:{color:"#e24b4a"} };
const signalIcon = { crit:"⛔", warn:"⚠️", info:"ℹ️", ok:"✅" };
const ALL_ALERTS = STUDIES.flatMap(s => s.signalList.filter(sig=>sig.type==="crit"||sig.type==="warn"||sig.type==="info").map(sig=>({...sig,studyId:s.studyId,studyTitle:s.title,studyRef:s})));

// ── BUBBLE CHART ──
function BubbleChart({ bubbles, size=110 }) {
  // Pack bubbles into a simple grid-like layout
  
  const cols = [
    [0.18, 0.22], [0.42, 0.18], [0.68, 0.24], [0.82, 0.48],
    [0.62, 0.62], [0.38, 0.70], [0.15, 0.58], [0.28, 0.40],
    [0.52, 0.42], [0.72, 0.72], [0.20, 0.78], [0.48, 0.82],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 110 110" style={{flexShrink:0}}>
      {bubbles.map((b, i) => {
        const [cx, cy] = cols[i % cols.length];
        return (
          <g key={i}>
            <circle cx={cx*110} cy={cy*110} r={b.r} fill={b.color} opacity={0.85}/>
            <circle cx={cx*110} cy={cy*110} r={b.r} fill="none" stroke="white" strokeWidth={1.2} opacity={0.4}/>
          </g>
        );
      })}
    </svg>
  );
}

// ── BUBBLE CHART LARGE (for detail page) ──
function BubbleChartLarge({ bubbles }) {
  const cols = [
    [0.15,0.20],[0.38,0.14],[0.62,0.18],[0.82,0.32],[0.78,0.58],
    [0.60,0.72],[0.36,0.78],[0.14,0.62],[0.28,0.42],[0.54,0.46],
    [0.72,0.44],[0.46,0.28],[0.20,0.80],[0.68,0.82],
  ];
  return (
    <svg width="100%" viewBox="0 0 260 160" style={{width:"100%"}}>
      {bubbles.map((b,i)=>{
        const [cx,cy]=cols[i%cols.length];
        const r=b.r*1.5;
        return (
          <g key={i}>
            <circle cx={cx*260} cy={cy*160} r={r} fill={b.color} opacity={0.82}/>
            <circle cx={cx*260} cy={cy*160} r={r} fill="none" stroke="white" strokeWidth={1.5} opacity={0.35}/>
          </g>
        );
      })}
    </svg>
  );
}

function CyntegrityLogo({ size=40, style={} }) {
  return (
    <img src={cyntegrityLogo} alt="Cyntegrity Logo" width={size} height={size}
      style={{borderRadius:"50%", display:"block", objectFit:"cover", ...style}}/>
  );
}

function PageTransition({ id, children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(false); const t = setTimeout(()=>setVisible(true), 30); return ()=>clearTimeout(t); }, [id]);
  return (
    <div style={{ opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(14px)", transition:"opacity 1.2s ease, transform 1.2s ease", minHeight:"100%", willChange:"opacity,transform" }}>
      {children}
    </div>
  );
}

function Badge({ status }) {
  const c = statusCfg[status]||statusCfg.active;
  return <span style={{background:c.bg,color:c.color,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap"}}>{c.label}</span>;
}
function RiskBar({ value }) {
  const color = value>=75?C.teal:value>=50?C.warn:C.danger;
  return <div style={{background:"#e2e8f0",borderRadius:4,height:5,overflow:"hidden",flex:1}}><div style={{width:`${value}%`,background:color,height:"100%",borderRadius:4}}/></div>;
}
function KRIRow({ kri }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <div style={{width:110,fontSize:11,color:C.textSecondary,flexShrink:0}}>{kri.name}</div>
      <div style={{flex:1,background:"#e2e8f0",borderRadius:4,height:6,overflow:"hidden"}}><div style={{width:`${Math.min(kri.value,100)}%`,background:kri.ok?C.teal:C.danger,height:"100%",borderRadius:4}}/></div>
      <div style={{fontSize:12,fontWeight:600,color:kri.ok?C.teal:C.danger,width:38,textAlign:"right"}}>{kri.value}{kri.unit}</div>
      <div style={{fontSize:14}}>{kri.ok?"✅":"⚠️"}</div>
    </div>
  );
}

// ── SPLASH ──
function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setPhase(1),200);
    const t2=setTimeout(()=>setPhase(2),1100);
    const t3=setTimeout(()=>setPhase(3),2800);
    const t4=setTimeout(()=>onDone(),3400);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);clearTimeout(t4);};
  },[]);
  return (
    <div style={{position:"absolute",inset:0,zIndex:99,background:`linear-gradient(160deg,#0f2a4a 0%,#1a3f6e 50%,#0f4d5e 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:phase===3?0:1,transition:"opacity 0.6s ease"}}>
      <div style={{transform:phase>=1?"scale(1) translateY(0)":"scale(0.4) translateY(30px)",opacity:phase>=1?1:0,transition:"transform 1.2s cubic-bezier(.34,1.4,.64,1), opacity 0.9s ease"}}>
        <CyntegrityLogo size={100}/>
      </div>
      <div style={{marginTop:22,opacity:phase>=2?1:0,transform:phase>=2?"translateY(0)":"translateY(10px)",transition:"opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",textAlign:"center"}}>
        <div style={{color:"#fff",fontSize:22,fontWeight:700,letterSpacing:0.5}}>Cyntegrity</div>
        <div style={{color:"rgba(255,255,255,0.55)",fontSize:13,marginTop:5,letterSpacing:0.3}}>MyRBQM Portal</div>
      </div>
      <div style={{position:"absolute",width:140,height:140,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.12)",opacity:phase>=1?0.6:0,transition:"opacity 1s ease 0.5s"}}/>
    </div>
  );
}

// ── LOGIN ──
function LoginScreen({ onLogin, visible }) {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");
  const submit=()=>{
    const u=USERS.find(u=>u.email===email.trim().toLowerCase()&&u.password===pass);
    if(!u){setErr("Invalid credentials. Try demo@cyntegrity.com / demo123");return;}
    setErr(""); onLogin(u);
  };
  return (
    <div style={{minHeight:"100%",background:`linear-gradient(160deg,#0f2a4a 0%,#1a3f6e 50%,#0f4d5e 100%)`,display:"flex",alignItems:"center",justifyContent:"center",padding:20,opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(16px)",transition:"opacity 2.3s ease, transform 2.3s ease"}}>
      <div style={{background:C.card,borderRadius:20,padding:"36px 28px",width:"100%"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:28}}>
          <CyntegrityLogo size={72} style={{marginBottom:16}}/>
          <div style={{fontSize:20,fontWeight:700,color:C.navy}}>MyRBQM Portal App</div>
          <div style={{fontSize:11,color:C.textSecondary,marginTop:4}}>Cyntegrity · Clinical Technology</div>
        </div>
        <div style={{fontSize:15,fontWeight:700,color:C.navy,marginBottom:3}}>Sign in</div>
        <div style={{fontSize:13,color:C.textSecondary,marginBottom:20}}>Access your clinical studies</div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:500,color:"#475569",marginBottom:5}}>Email address</div>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@organization.com" style={{width:"100%",padding:"10px 12px",border:`1px solid ${C.border}`,borderRadius:9,fontSize:14,outline:"none",color:C.textPrimary}}/>
        </div>
        <div style={{marginBottom:6}}>
          <div style={{fontSize:12,fontWeight:500,color:"#475569",marginBottom:5}}>Password</div>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&submit()} style={{width:"100%",padding:"10px 12px",border:`1px solid ${C.border}`,borderRadius:9,fontSize:14,outline:"none",color:C.textPrimary}}/>
        </div>
        {err&&<div style={{fontSize:12,color:C.danger,marginBottom:8}}>{err}</div>}
        <button onClick={submit} style={{width:"100%",padding:"12px",background:C.navy,color:"#fff",border:"none",borderRadius:9,fontSize:14,fontWeight:600,cursor:"pointer",marginTop:8}}>Sign in →</button>
        <div style={{fontSize:11,color:C.textMuted,textAlign:"center",marginTop:14}}>Demo: demo@cyntegrity.com · demo123</div>
      </div>
    </div>
  );
}

// ── WELCOME ──
function WelcomeScreen({ user, onContinue }) {
  const [going,setGoing]=useState(false);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setVisible(true),60); return()=>clearTimeout(t); },[]);
  const go=()=>{ setGoing(true); setTimeout(onContinue,500); };
  return (
    <div style={{minHeight:"100%",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20,opacity:going?0:visible?1:0,transform:going?"scale(0.96)":visible?"translateY(0)":"translateY(16px)",transition:"opacity 1.2s ease, transform 1.2s ease"}}>
      <div style={{background:C.card,borderRadius:20,padding:"36px 24px",width:"100%",textAlign:"center",border:`0.5px solid ${C.border}`}}>
        <CyntegrityLogo size={68} style={{margin:"0 auto 16px"}}/>
        <div style={{fontSize:22,fontWeight:700,color:C.navy,marginBottom:6}}>Welcome back</div>
        <div style={{fontSize:13,color:C.textSecondary,lineHeight:1.6,marginBottom:24}}>You have <strong style={{color:C.navy}}>4 new alerts</strong> and <strong style={{color:C.danger}}>3 studies</strong> requiring attention.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:28}}>
          {[{val:12,label:"Studies"},{val:37,label:"Risk Signals",color:C.danger},{val:"82%",label:"Oversight",color:C.teal}].map(m=>(
            <div key={m.label} style={{background:"#f8fafc",borderRadius:10,padding:"12px 8px",border:`0.5px solid ${C.border}`}}>
              <div style={{fontSize:22,fontWeight:700,color:m.color||C.navy}}>{m.val}</div>
              <div style={{fontSize:10,color:C.textSecondary,marginTop:2}}>{m.label}</div>
            </div>
          ))}
        </div>
        <button onClick={go} style={{width:"100%",padding:"13px",background:C.navy,color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer"}}>Go to Dashboard →</button>
      </div>
    </div>
  );
}

// ── NOTIFICATION DROPDOWN ──
function NotifDropdown({ onClose, onGoStudy, onViewAll }) {
  const notifs=ALL_ALERTS.filter(a=>a.type==="crit"||a.type==="warn").slice(0,6);
  return (
    <div style={{position:"absolute",top:44,right:0,width:290,background:C.card,borderRadius:14,border:`1px solid ${C.border}`,boxShadow:"0 8px 24px rgba(0,0,0,.15)",zIndex:100,overflow:"hidden"}}>
      <div style={{padding:"12px 14px 8px",borderBottom:`0.5px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:13,fontWeight:700,color:C.navy}}>Notifications</span>
        <span onClick={onClose} style={{fontSize:20,cursor:"pointer",color:C.textMuted,lineHeight:1}}>×</span>
      </div>
      {notifs.map((n,i)=>(
        <div key={i} onClick={()=>{onGoStudy(n.studyRef);onClose();}} style={{padding:"10px 14px",borderBottom:i<notifs.length-1?`0.5px solid ${C.border}`:"none",cursor:"pointer",display:"flex",gap:8,alignItems:"flex-start"}}>
          <span style={{fontSize:14,flexShrink:0}}>{signalIcon[n.type]}</span>
          <div>
            <div style={{fontSize:11,color:C.blue,fontWeight:500,marginBottom:2}}>{n.studyId}</div>
            <div style={{fontSize:12,color:C.textPrimary,lineHeight:1.4}}>{n.msg}</div>
          </div>
        </div>
      ))}
      <div onClick={()=>{onViewAll();onClose();}} style={{padding:"10px 14px",background:"#f8fafc",textAlign:"center",cursor:"pointer"}}>
        <span style={{fontSize:12,color:C.blue,fontWeight:500}}>View all alerts →</span>
      </div>
    </div>
  );
}

// ── DASHBOARD ──
function DashboardScreen({ onRequestStudy }) {
  const total=STUDIES.length,active=STUDIES.filter(s=>s.status==="active").length;
  const atRisk=STUDIES.filter(s=>s.status==="at_risk"||s.status==="critical").length;
  const completed=STUDIES.filter(s=>s.status==="completed").length;
  const withSignals=STUDIES.filter(s=>s.signals>0).length;
  return (
    <PageTransition id="dashboard">
      <div style={{background:C.bg,minHeight:"100%",padding:"14px 12px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {[{label:"Total Studies",val:total,color:C.navy},{label:"Active",val:active,color:C.teal},{label:"Need Attention",val:atRisk,color:C.danger},{label:"Completed",val:completed,color:C.purple}].map(m=>(
            <div key={m.label} style={{background:C.card,borderRadius:12,padding:"12px 14px",border:`0.5px solid ${C.border}`}}>
              <div style={{fontSize:10,color:C.textSecondary,textTransform:"uppercase",letterSpacing:.5}}>{m.label}</div>
              <div style={{fontSize:26,fontWeight:700,color:m.color,marginTop:2}}>{m.val}</div>
            </div>
          ))}
        </div>
        <div style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"14px 16px",marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:600,color:C.navy,marginBottom:10}}>Portfolio Health</div>
          {[{label:"Active & On Track",pct:Math.round(active/total*100),color:C.teal},{label:"At Risk / Critical",pct:Math.round(atRisk/total*100),color:C.danger},{label:"Completed",pct:Math.round(completed/total*100),color:C.purple}].map(row=>(
            <div key={row.label} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:12,color:C.textSecondary}}>{row.label}</span>
                <span style={{fontSize:12,fontWeight:600,color:row.color}}>{row.pct}%</span>
              </div>
              <div style={{background:"#e2e8f0",borderRadius:4,height:6}}><div style={{width:`${row.pct}%`,background:row.color,height:"100%",borderRadius:4}}/></div>
            </div>
          ))}
        </div>
        <div style={{background:"#fcebeb",borderRadius:12,border:`0.5px solid #f7c1c1`,padding:"14px 16px",marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:600,color:"#a32d2d",marginBottom:4}}>⚠️ Active Risk Signals</div>
          <div style={{fontSize:28,fontWeight:800,color:C.danger}}>{withSignals}</div>
          <div style={{fontSize:12,color:"#a32d2d",marginTop:2}}>studies with active signals</div>
        </div>
        <div style={{background:`linear-gradient(135deg,${C.navy} 0%,#1a4a7a 100%)`,borderRadius:14,padding:"18px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}} onClick={onRequestStudy}>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>Request New Study</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.65)"}}>Submit a new clinical study request to the Cyntegrity team</div>
          </div>
          <div style={{width:40,height:40,background:"rgba(255,255,255,0.15)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginLeft:12,fontSize:22}}>＋</div>
        </div>
      </div>
    </PageTransition>
  );
}

// ── REQUEST STUDY MODAL ──
function RequestStudyModal({ onClose }) {
  const [form,setForm]=useState({title:"",indication:"",phase:"",sponsor:"",sites:"",notes:""});
  const [submitted,setSubmitted]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submit=()=>{
  if(!form.title||!form.indication) return;
  emailjs.send(EMAILJS_SERVICE, EMAILJS_REQUEST_TEMPLATE, {
    study_title: form.title,
    indication: form.indication,
    phase: form.phase,
    sponsor: form.sponsor,
    sites: form.sites,
    notes: form.notes,
    from_name: "MyRBQM Portal User",
    from_email: "portal@cyntegrity.com",
  }, EMAILJS_PUBLIC_KEY);
  setSubmitted(true);
};
  return (
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",alignItems:"flex-end"}}>
      <div style={{background:C.card,borderRadius:"20px 20px 0 0",width:"100%",maxHeight:"85%",overflowY:"auto",padding:"20px 18px 30px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontSize:16,fontWeight:700,color:C.navy}}>Request New Study</div>
          <span onClick={onClose} style={{fontSize:22,cursor:"pointer",color:C.textMuted}}>×</span>
        </div>
        {submitted?(
          <div style={{textAlign:"center",padding:"30px 0"}}>
            <div style={{fontSize:40,marginBottom:12}}>✅</div>
            <div style={{fontSize:16,fontWeight:700,color:C.navy,marginBottom:6}}>Request Submitted!</div>
            <div style={{fontSize:13,color:C.textSecondary,lineHeight:1.6}}>Your study request has been sent to the Cyntegrity team. You will be contacted within 2 business days.</div>
            <button onClick={onClose} style={{marginTop:20,padding:"11px 32px",background:C.navy,color:"#fff",border:"none",borderRadius:9,fontSize:14,fontWeight:600,cursor:"pointer"}}>Close</button>
          </div>
        ):(
          <>
            {[{key:"title",label:"Study Title *",placeholder:"e.g. CARDIO-PROTECT IV"},{key:"indication",label:"Therapeutic Area *",placeholder:"e.g. Cardiovascular"},{key:"phase",label:"Phase",placeholder:"e.g. Phase II"},{key:"sponsor",label:"Sponsor",placeholder:"e.g. PharmaCo AG"},{key:"sites",label:"Estimated Sites",placeholder:"e.g. 30"}].map(f=>(
              <div key={f.key} style={{marginBottom:13}}>
                <div style={{fontSize:12,fontWeight:500,color:"#475569",marginBottom:5}}>{f.label}</div>
                <input value={form[f.key]} onChange={e=>set(f.key,e.target.value)} placeholder={f.placeholder} style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,outline:"none",color:C.textPrimary}}/>
              </div>
            ))}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:500,color:"#475569",marginBottom:5}}>Additional Notes</div>
              <textarea value={form.notes} onChange={e=>set("notes",e.target.value)} rows={3} placeholder="Any additional information..." style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,outline:"none",color:C.textPrimary,resize:"none",fontFamily:"inherit"}}/>
            </div>
            <button onClick={submit} style={{width:"100%",padding:"12px",background:C.navy,color:"#fff",border:"none",borderRadius:9,fontSize:14,fontWeight:600,cursor:"pointer"}}>Submit Request →</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── STUDIES ──
function StudiesScreen({ onSelect }) {
  const [filter,setFilter]=useState("all");
  const [search,setSearch]=useState("");
  const tabs=[{key:"all",label:"All"},{key:"active",label:"Active"},{key:"at_risk",label:"At Risk"},{key:"critical",label:"Critical"},{key:"completed",label:"Done"}];
  const filtered=STUDIES.filter(s=>{
    const matchTab=filter==="all"||s.status===filter;
    const q=search.toLowerCase();
    return matchTab&&(s.studyId.toLowerCase().includes(q)||s.title.toLowerCase().includes(q)||s.indication.toLowerCase().includes(q));
  });
  return (
    <PageTransition id="studies">
      <div style={{background:C.bg,minHeight:"100%",paddingBottom:20}}>
        <div style={{background:C.navy,padding:"16px 16px 12px"}}>
          <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:10}}>Clinical Studies</div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search by ID, title, indication..." style={{width:"100%",padding:"9px 12px",borderRadius:10,border:"none",fontSize:13,outline:"none",background:"rgba(255,255,255,.12)",color:"#fff"}}/>
        </div>
        <div style={{display:"flex",gap:6,padding:"10px 12px",overflowX:"auto",background:C.card,borderBottom:`1px solid ${C.border}`,scrollbarWidth:"none"}} >
          {tabs.map(t=>(
            <button key={t.key} onClick={()=>setFilter(t.key)} style={{whiteSpace:"nowrap",padding:"5px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:500,background:filter===t.key?C.navy:"#f1f5f9",color:filter===t.key?"#fff":C.textSecondary}}>
              {t.label} ({t.key==="all"?STUDIES.length:STUDIES.filter(s=>s.status===t.key).length})
            </button>
          ))}
        </div>
        <div style={{padding:"12px 12px 0"}}>
          {filtered.length===0&&<div style={{textAlign:"center",color:C.textMuted,padding:40,fontSize:14}}>No studies found.</div>}
          {filtered.map(s=>{
            const pct=Math.round(s.enrolled/s.target*100);
            return (
              <div key={s._id} onClick={()=>onSelect(s)} style={{background:C.card,borderRadius:14,border:`0.5px solid ${C.border}`,padding:"14px 16px",marginBottom:12,cursor:"pointer"}}>
                {/* Header */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div><div style={{fontSize:11,color:C.textSecondary,fontWeight:500}}>{s.studyId}</div><div style={{fontSize:14,fontWeight:700,color:C.navy,marginTop:1}}>{s.title}</div></div>
                  <Badge status={s.status}/>
                </div>
                {/* Bubble chart + info side by side */}
                <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
                  <div style={{background:"#f8fafc",borderRadius:10,border:`0.5px solid ${C.border}`,padding:4,flexShrink:0}}>
                    <BubbleChart bubbles={s.bubbles} size={90}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:10,marginBottom:8,flexWrap:"wrap"}}>
                      <div style={{fontSize:11,color:C.textSecondary}}>Phase <strong style={{color:C.textPrimary}}>{s.phase}</strong></div>
                      <div style={{fontSize:11,color:C.textSecondary}}>Sites <strong style={{color:C.textPrimary}}>{s.sites}</strong></div>
                      <div style={{fontSize:11,color:C.textSecondary}}>{s.indication}</div>
                    </div>
                    <div style={{marginBottom:6}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                        <span style={{fontSize:11,color:C.textSecondary}}>Enrollment</span>
                        <span style={{fontSize:11,fontWeight:600,color:C.textPrimary}}>{pct}%</span>
                      </div>
                      <div style={{background:"#e2e8f0",borderRadius:4,height:5}}><div style={{width:`${pct}%`,background:pct>=90?C.teal:pct>=60?C.warn:C.danger,height:"100%",borderRadius:4}}/></div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <RiskBar value={s.riskScore}/>
                      <span style={{fontSize:11,color:C.textSecondary,whiteSpace:"nowrap"}}>Score <strong style={{color:C.textPrimary}}>{s.riskScore}</strong></span>
                    </div>
                  </div>
                </div>
                {/* Bubble legend */}
                <div style={{display:"flex",gap:10,marginTop:4}}>
                  {[{color:C.teal,label:"Low"},{color:C.warn,label:"Medium"},{color:C.danger,label:"High"}].map(l=>(
                    <div key={l.label} style={{display:"flex",alignItems:"center",gap:4}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:l.color}}/>
                      <span style={{fontSize:10,color:C.textSecondary}}>{l.label}</span>
                    </div>
                  ))}
                  {s.signals>0&&<span style={{marginLeft:"auto",background:"#fcebeb",color:"#a32d2d",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{s.signals} signal{s.signals>1?"s":""}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}

// ── DETAIL ──
function DetailScreen({ study, onBack }) {
  const [tab,setTab]=useState("overview");
  const pct=Math.round(study.enrolled/study.target*100);
  const tabs2=["overview","kri","signals","sites"];
  const tabLabels={overview:"Overview",kri:"KRIs",signals:"Signals",sites:"Sites"};
  return (
    <PageTransition id={study._id+tab}>
      <div style={{background:C.bg,minHeight:"100%"}}>
        <div style={{background:C.navy,padding:"14px 16px 0"}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",fontSize:13,cursor:"pointer",marginBottom:8}}>← Back</button>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
            <div><div style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{study.studyId}</div><div style={{fontSize:16,fontWeight:700,color:"#fff",marginTop:2,lineHeight:1.2}}>{study.title}</div><div style={{fontSize:11,color:"rgba(255,255,255,.6)",marginTop:4}}>{study.indication} · {study.sponsor}</div></div>
            <Badge status={study.status}/>
          </div>
          <div style={{display:"flex",gap:4,marginTop:12}}>
            {tabs2.map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"8px 4px",background:"none",border:"none",cursor:"pointer",fontSize:11,fontWeight:600,color:tab===t?"#fff":"rgba(255,255,255,.5)",borderBottom:tab===t?"2px solid #5eaee0":"2px solid transparent"}}>{tabLabels[t]}</button>
            ))}
          </div>
        </div>
        <div style={{padding:"14px 12px"}}>
          {tab==="overview"&&<>
            {/* Bubble chart on detail page */}
            <div style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"14px 16px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{fontSize:13,fontWeight:600,color:C.navy}}>Risk Bubble Overview</div>
                <div style={{display:"flex",gap:8}}>
                  {[{color:C.teal,label:"Low"},{color:C.warn,label:"Med"},{color:C.danger,label:"High"}].map(l=>(
                    <div key={l.label} style={{display:"flex",alignItems:"center",gap:3}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:l.color}}/>
                      <span style={{fontSize:10,color:C.textSecondary}}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <BubbleChartLarge bubbles={study.bubbles}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[{label:"Phase",val:study.phase},{label:"Sites",val:study.sites},{label:"Enrolled",val:`${study.enrolled}/${study.target}`},{label:"Risk Score",val:study.riskScore,color:study.riskScore>=75?C.teal:study.riskScore>=50?C.warn:C.danger}].map(m=>(
                <div key={m.label} style={{background:C.card,borderRadius:12,padding:"12px 14px",border:`0.5px solid ${C.border}`}}>
                  <div style={{fontSize:10,color:C.textSecondary,textTransform:"uppercase",letterSpacing:.5}}>{m.label}</div>
                  <div style={{fontSize:22,fontWeight:700,color:m.color||C.navy,marginTop:3}}>{m.val}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"14px 16px",marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,color:C.navy,marginBottom:10}}>Enrollment Progress</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,color:C.textSecondary}}>{study.enrolled} enrolled</span><span style={{fontSize:12,fontWeight:600,color:C.navy}}>{pct}%</span></div>
              <div style={{background:"#e2e8f0",borderRadius:6,height:10}}><div style={{width:`${pct}%`,background:pct>=90?C.teal:pct>=60?C.warn:C.danger,height:"100%",borderRadius:6}}/></div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}><span style={{fontSize:11,color:C.textMuted}}>Start: {study.startDate}</span><span style={{fontSize:11,color:C.textMuted}}>End: {study.endDate}</span></div>
            </div>
            <div style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"14px 16px"}}>
              <div style={{fontSize:13,fontWeight:600,color:C.navy,marginBottom:10}}>Overall Risk Score</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:36,fontWeight:800,color:study.riskScore>=75?C.teal:study.riskScore>=50?C.warn:C.danger}}>{study.riskScore}</div>
                <div style={{flex:1}}><RiskBar value={study.riskScore}/><div style={{fontSize:11,color:C.textSecondary,marginTop:4}}>{study.riskScore>=75?"Good — all major KRIs within range":study.riskScore>=50?"Moderate — some KRIs require attention":"Critical — immediate action required"}</div></div>
              </div>
            </div>
          </>}
          {tab==="kri"&&<div style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"16px"}}><div style={{fontSize:13,fontWeight:600,color:C.navy,marginBottom:14}}>Key Risk Indicators</div>{study.kris.map((k,i)=><KRIRow key={i} kri={k}/>)}<div style={{marginTop:12,padding:"10px 12px",background:"#f8fafc",borderRadius:8,fontSize:12,color:C.textSecondary}}>✅ = within threshold · ⚠️ = below threshold</div></div>}
          {tab==="signals"&&<div>{study.signalList.map((sig,i)=><div key={i} style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"12px 14px",marginBottom:10,display:"flex",gap:10,alignItems:"flex-start"}}><div style={{fontSize:18,flexShrink:0}}>{signalIcon[sig.type]}</div><div style={{fontSize:13,color:C.textPrimary,lineHeight:1.5}}>{sig.msg}</div></div>)}</div>}
          {tab==="sites"&&<div>{study.siteList.map((site,i)=><div key={i} style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"12px 16px",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:10,height:10,borderRadius:"50%",background:siteCfg[site.status]?.color||C.teal,flexShrink:0}}/><div><div style={{fontSize:14,fontWeight:600,color:C.navy}}>{site.id}</div><div style={{fontSize:11,color:C.textSecondary}}>{site.country}</div></div></div><div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:600,color:C.navy}}>{site.patients}</div><div style={{fontSize:11,color:C.textSecondary}}>patients</div></div></div>)}</div>}
        </div>
      </div>
    </PageTransition>
  );
}

// ── ALERTS ──
function AlertsScreen({ onGoStudy }) {
  return (
    <PageTransition id="alerts">
      <div style={{background:C.bg,minHeight:"100%",padding:"14px 12px"}}>
        <div style={{fontSize:16,fontWeight:700,color:C.navy,marginBottom:14}}>Alerts</div>
        {ALL_ALERTS.map((a,i)=>(
          <div key={i} onClick={()=>onGoStudy(a.studyRef)} style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"12px 14px",marginBottom:10,cursor:"pointer"}}>
            <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <div style={{fontSize:16,flexShrink:0}}>{signalIcon[a.type]}</div>
              <div style={{flex:1}}><div style={{fontSize:11,color:C.blue,fontWeight:500,marginBottom:2}}>{a.studyId} · {a.studyTitle}</div><div style={{fontSize:13,color:C.textPrimary,lineHeight:1.5}}>{a.msg}</div></div>
              <span style={{fontSize:18,color:C.textMuted}}>›</span>
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}

// ── PROFILE ──
function ProfileScreen({ user, onLogout, onUserUpdate }) {
  const [editName,setEditName]=useState(user.name);
  const [editEmail,setEditEmail]=useState(user.email);
  const [photo,setPhoto]=useState(null);
  const [editing,setEditing]=useState(false);
  const [helpOpen,setHelpOpen]=useState(false);
  const [helpMsg,setHelpMsg]=useState("");
  const [helpSent,setHelpSent]=useState(false);
  const [rating,setRating]=useState(0);
  const [hoverRating,setHoverRating]=useState(0);
  const [reviewNote,setReviewNote]=useState("");
  const [reviewSubmitted,setReviewSubmitted]=useState(false);
  const initials=editName.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  const handlePhoto=e=>{ const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>setPhoto(ev.target.result);r.readAsDataURL(file); };
  const saveProfile=()=>{ onUserUpdate({...user,name:editName,email:editEmail,initials}); setEditing(false); };
  const sendHelp=()=>{ if(!helpMsg.trim())return;setHelpSent(true);setHelpMsg("");setTimeout(()=>setHelpSent(false),3000); };
  const submitReview=()=>{
  if(rating===0)return;
  emailjs.send(EMAILJS_SERVICE, EMAILJS_REVIEW_TEMPLATE, {
    rating: rating,
    review_note: reviewNote,
    from_name: user.name,
    from_email: user.email,
  }, EMAILJS_PUBLIC_KEY);
  setReviewSubmitted(true);
};
  return (
    <PageTransition id="profile">
      <div style={{background:C.bg,minHeight:"100%",padding:"14px 12px",paddingBottom:30}}>
        <div style={{background:C.card,borderRadius:14,border:`0.5px solid ${C.border}`,padding:"20px 16px",textAlign:"center",marginBottom:16}}>
          <div style={{position:"relative",width:64,height:64,margin:"0 auto 12px"}}>
            {photo?<img src={photo} alt="profile" style={{width:64,height:64,borderRadius:"50%",objectFit:"cover"}}/>:<div style={{width:64,height:64,borderRadius:"50%",background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff"}}>{initials}</div>}
            <label style={{position:"absolute",bottom:0,right:0,background:C.navy,borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"2px solid #fff"}}>
              <span style={{fontSize:11,color:"#fff"}}>✏️</span>
              <input type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/>
            </label>
          </div>
          {editing?(
            <><input value={editName} onChange={e=>setEditName(e.target.value)} style={{width:"100%",padding:"8px 10px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:14,marginBottom:8,textAlign:"center",outline:"none"}}/><input value={editEmail} onChange={e=>setEditEmail(e.target.value)} style={{width:"100%",padding:"8px 10px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,marginBottom:10,textAlign:"center",outline:"none"}}/><div style={{display:"flex",gap:8}}><button onClick={()=>setEditing(false)} style={{flex:1,padding:"8px",background:"#f1f5f9",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,cursor:"pointer",color:C.textSecondary}}>Cancel</button><button onClick={saveProfile} style={{flex:1,padding:"8px",background:C.navy,border:"none",borderRadius:8,fontSize:13,cursor:"pointer",color:"#fff",fontWeight:600}}>Save</button></div></>
          ):(
            <><div style={{fontSize:17,fontWeight:700,color:C.navy}}>{editName}</div><div style={{fontSize:12,color:C.textSecondary,marginTop:3}}>{user.role}</div><div style={{fontSize:12,color:C.textMuted,marginTop:2}}>{editEmail}</div><button onClick={()=>setEditing(true)} style={{marginTop:10,padding:"6px 20px",background:"#f1f5f9",border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,cursor:"pointer",color:C.textSecondary}}>Edit Profile</button></>
          )}
        </div>
        <div style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,overflow:"hidden",marginBottom:14}}>
          <div onClick={()=>setHelpOpen(!helpOpen)} style={{padding:"14px 16px",fontSize:14,color:C.textPrimary,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span>🛠 Help &amp; Support</span>
            <span style={{color:C.textMuted,display:"inline-block",transform:helpOpen?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
          </div>
          {helpOpen&&<div style={{padding:"0 16px 16px",borderTop:`0.5px solid ${C.border}`}}>
            <div style={{fontSize:12,color:C.textSecondary,margin:"12px 0 8px"}}>Describe your issue and we'll get back to you:</div>
            <textarea value={helpMsg} onChange={e=>setHelpMsg(e.target.value)} rows={4} placeholder="Write your message here..." style={{width:"100%",padding:"10px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,resize:"none",outline:"none",color:C.textPrimary,fontFamily:"inherit"}}/>
            {helpSent&&<div style={{fontSize:12,color:C.teal,marginTop:6}}>✅ Message sent to our support team!</div>}
            <button onClick={sendHelp} style={{marginTop:8,width:"100%",padding:"10px",background:C.navy,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>Send to Support →</button>
          </div>}
        </div>
        <div style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"16px",marginBottom:14}}>
          <div style={{fontSize:14,fontWeight:600,color:C.navy,marginBottom:12}}>⭐ Rate the App</div>
          {reviewSubmitted?(
            <div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:28,marginBottom:8}}>🎉</div><div style={{fontSize:14,fontWeight:600,color:C.navy}}>Thank you for your feedback!</div><div style={{fontSize:12,color:C.textSecondary,marginTop:4}}>Your review helps us improve MyRBQM Portal.</div></div>
          ):(
            <>
              <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:14}}>
                {[1,2,3,4,5].map(s=><span key={s} onMouseEnter={()=>setHoverRating(s)} onMouseLeave={()=>setHoverRating(0)} onClick={()=>setRating(s)} style={{fontSize:32,cursor:"pointer",color:s<=(hoverRating||rating)?"#f59e0b":"#d1d5db",transition:"color .15s"}}>★</span>)}
              </div>
              {rating>0&&<div style={{fontSize:12,color:C.textSecondary,textAlign:"center",marginBottom:10}}>{["","Poor","Fair","Good","Very Good","Excellent!"][rating]}</div>}
              <textarea value={reviewNote} onChange={e=>setReviewNote(e.target.value)} rows={3} placeholder="Add a note (optional)..." style={{width:"100%",padding:"10px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,resize:"none",outline:"none",color:C.textPrimary,fontFamily:"inherit",marginBottom:8}}/>
              <button onClick={submitReview} disabled={rating===0} style={{width:"100%",padding:"10px",background:rating>0?C.navy:"#e2e8f0",color:rating>0?"#fff":C.textMuted,border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:rating>0?"pointer":"not-allowed"}}>Submit Review</button>
            </>
          )}
        </div>
        <button onClick={onLogout} style={{width:"100%",padding:"13px",background:"#fcebeb",color:"#a32d2d",border:`1px solid #f7c1c1`,borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer"}}>Sign out</button>
      </div>
    </PageTransition>
  );
}

function BottomNav({ tab, setTab }) {
  const tabs=[{key:"dashboard",icon:"🏠",label:"Home"},{key:"studies",icon:"🔬",label:"Studies"},{key:"alerts",icon:"🔔",label:"Alerts"},{key:"profile",icon:"👤",label:"Profile"}];
  return (
    <div style={{position:"sticky",bottom:0,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
      {tabs.map(t=>(
        <button key={t.key} onClick={()=>setTab(t.key)} style={{flex:1,padding:"10px 4px 8px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <span style={{fontSize:20}}>{t.icon}</span>
          <span style={{fontSize:10,fontWeight:500,color:tab===t.key?C.navy:C.textMuted}}>{t.label}</span>
          {tab===t.key&&<div style={{width:20,height:2,background:C.navy,borderRadius:2}}/>}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [splashDone,setSplashDone]=useState(false);
  const [loginVisible,setLoginVisible]=useState(false);
  const [screen,setScreen]=useState("login");
  const [user,setUser]=useState(null);
  const [navTab,setNavTab]=useState("dashboard");
  const [selectedStudy,setSelectedStudy]=useState(null);
  const [showNotif,setShowNotif]=useState(false);
  const [showRequestModal,setShowRequestModal]=useState(false);

  const handleSplashDone=()=>{ setSplashDone(true); setTimeout(()=>setLoginVisible(true),80); };
  const handleLogin=(u)=>{ setUser(u); setScreen("welcome"); };
  const handleContinue=()=>{ setScreen("portal"); setNavTab("dashboard"); };
  const handleLogout=()=>{ setUser(null); setScreen("login"); setSelectedStudy(null); setNavTab("dashboard"); setShowNotif(false); setSplashDone(false); setLoginVisible(false); setTimeout(handleSplashDone,80); };
  const handleUserUpdate=(u)=>setUser(u);
  const goToStudy=(study)=>{ setNavTab("studies"); setSelectedStudy(study); };
  const totalAlerts=ALL_ALERTS.filter(a=>a.type==="crit"||a.type==="warn").length;

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#d1d9e6"}}>
      <div style={{width:"100%",maxWidth:480,height:"100vh",background:C.card,overflow:"hidden",display:"flex",flexDirection:"column",position:"relative"}}>
        {!splashDone&&<SplashScreen onDone={handleSplashDone}/>}
        <style>{`
          *::-webkit-scrollbar{display:none}
          *{scrollbar-width:none;-ms-overflow-style:none}
        `}</style>
        
        {screen==="login"&&<div style={{flex:1,overflowY:"auto"}}><LoginScreen onLogin={handleLogin} visible={loginVisible}/></div>}
        {screen==="welcome"&&<div style={{flex:1,overflowY:"auto"}}><WelcomeScreen user={user} onContinue={handleContinue}/></div>}
        {screen==="portal"&&<>
          <div style={{background:C.navy,padding:"6px 16px 10px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,position:"relative"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <CyntegrityLogo size={36}/>
              <span style={{fontSize:16,fontWeight:700,color:"#fff"}}>MyRBQM Portal App</span>
            </div>
            <div style={{position:"relative"}}>
              <button onClick={()=>setShowNotif(!showNotif)} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:"#fff",display:"flex",alignItems:"center",position:"relative",padding:4}}>
                🔔
                <span style={{position:"absolute",top:0,right:0,background:C.danger,color:"#fff",fontSize:9,fontWeight:700,borderRadius:"50%",width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{totalAlerts}</span>
              </button>
              {showNotif&&<NotifDropdown onClose={()=>setShowNotif(false)} onGoStudy={(s)=>{goToStudy(s);setShowNotif(false);}} onViewAll={()=>{setNavTab("alerts");setSelectedStudy(null);}}/>}
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto"}}>
            {navTab==="dashboard"&&<DashboardScreen onRequestStudy={()=>setShowRequestModal(true)}/>}
            {navTab==="studies"&&!selectedStudy&&<StudiesScreen onSelect={s=>setSelectedStudy(s)}/>}
            {navTab==="studies"&&selectedStudy&&<DetailScreen study={selectedStudy} onBack={()=>setSelectedStudy(null)}/>}
            {navTab==="alerts"&&<AlertsScreen onGoStudy={(s)=>{setSelectedStudy(s);setNavTab("studies");}}/>}
            {navTab==="profile"&&<ProfileScreen user={user} onLogout={handleLogout} onUserUpdate={handleUserUpdate}/>}
          </div>
          <BottomNav tab={navTab} setTab={t=>{setNavTab(t);setSelectedStudy(null);setShowNotif(false);}}/>
          {showRequestModal&&<RequestStudyModal onClose={()=>setShowRequestModal(false)}/>}
        </>}
      </div>
    </div>
  );
}