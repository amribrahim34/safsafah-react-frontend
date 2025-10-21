
// ---------------- components: src/pages/quiz/components/ ----------------
// QuizSteps.jsx
import React from "react";

export default function QuizSteps({ lang, brand, step, setStep, answers, setAnswers }){
  const next = ()=> setStep(s=>s+1);
  const back = ()=> setStep(s=>Math.max(0,s-1));

  const Btn = ({children,onClick,variant="primary"}) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-2xl font-semibold ${variant==="primary"?"text-white":"border"}`} style={variant==="primary"?{background:brand.primary}:{borderColor:brand.primary,color:brand.primary}}>{children}</button>
  );

  return (
    <div className="rounded-3xl border border-neutral-200 p-4">
      <Progress value={(step+1)/3*100} brand={brand} />

      {step===0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">{lang==="ar"?"ما نوع بشرتك؟":"What’s your skin type?"}</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              {k:'oily', ar:'دهنية', en:'Oily'},
              {k:'dry', ar:'جافة', en:'Dry'},
              {k:'combo', ar:'مختلطة', en:'Combination'},
              {k:'normal', ar:'عادية', en:'Normal'},
              {k:'sensitive', ar:'حسّاسة', en:'Sensitive'},
            ].map(opt=> (
              <Choice key={opt.k} selected={answers.skinType===opt.k} onSelect={()=>setAnswers({...answers, skinType: opt.k})}>
                {lang==="ar"?opt.ar:opt.en}
              </Choice>
            ))}
          </div>
          <div className="mt-4 flex gap-2"><Btn onClick={next}>{lang==="ar"?"التالي":"Next"}</Btn></div>
        </div>
      )}

      {step===1 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">{lang==="ar"?"ما أهم مشاكل بشرتك؟":"Top concerns"}</h3>
          <div className="flex flex-wrap gap-2">
            {[
              {k:'acne', ar:'حبوب/انسداد', en:'Acne/Congestion'},
              {k:'hyperpigmentation', ar:'تصبغات', en:'Hyperpigmentation'},
              {k:'redness', ar:'احمرار/تهيج', en:'Redness/Irritation'},
              {k:'dehydration', ar:'جفاف/عطش', en:'Dehydration'},
              {k:'texture', ar:'ملمس/مسام', en:'Texture/Pores'},
            ].map(opt=> (
              <Tag key={opt.k}
                active={answers.concerns.includes(opt.k)}
                onToggle={()=> setAnswers({...answers, concerns: answers.concerns.includes(opt.k)? answers.concerns.filter(c=>c!==opt.k): [...answers.concerns, opt.k]})}
                brand={brand}
              >{lang==="ar"?opt.ar:opt.en}</Tag>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={answers.fragranceFree} onChange={e=>setAnswers({...answers, fragranceFree: e.target.checked})} />
              <span>{lang==="ar"?"بدون عطر":"Fragrance‑free"}</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={answers.isPregnant} onChange={e=>setAnswers({...answers, isPregnant: e.target.checked})} />
              <span>{lang==="ar"?"حامل/مرضعة":"Pregnant/Breastfeeding"}</span>
            </label>
          </div>

          <div className="mt-4 flex gap-2">
            <Btn variant="secondary" onClick={back}>{lang==="ar"?"رجوع":"Back"}</Btn>
            <Btn onClick={next}>{lang==="ar"?"التالي":"Next"}</Btn>
          </div>
        </div>
      )}

      {step===2 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">{lang==="ar"?"ما ميزانيتك؟":"What’s your budget?"}</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              {k:'low', ar:'اقتصادي', en:'Low'},
              {k:'mid', ar:'متوسط', en:'Mid'},
              {k:'high', ar:'مرتفع', en:'High'},
            ].map(opt=> (
              <Choice key={opt.k} selected={answers.budget===opt.k} onSelect={()=>setAnswers({...answers, budget: opt.k})}>
                {lang==="ar"?opt.ar:opt.en}
              </Choice>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Btn variant="secondary" onClick={back}>{lang==="ar"?"رجوع":"Back"}</Btn>
            <Btn onClick={()=>setStep(3)}>{lang==="ar"?"شاهد الروتين":"See routine"}</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

function Progress({ value, brand }){
  return (
    <div className="h-2 rounded bg-neutral-100 overflow-hidden">
      <div className="h-full" style={{ width: `${value}%`, background: brand.primary }} />
    </div>
  );
}

function Tag({ active, onToggle, brand, children }){
  return (
    <button onClick={onToggle} type="button" className={`px-3 py-1 rounded-full border ${active? 'text-white':'text-neutral-700'}`} style={{ background: active? brand.primary:'white', borderColor: active? brand.primary:'#e5e7eb' }}>
      {children}
    </button>
  );
}

function Choice({ selected, onSelect, children }){
  return (
    <button onClick={onSelect} type="button" className={`px-3 py-2 rounded-2xl border text-sm ${selected? 'text-white' : 'text-neutral-800'}`} style={{ background: selected? '#288880':'white', borderColor: selected? '#288880':'#e5e7eb' }}>
      {children}
    </button>
  );
}