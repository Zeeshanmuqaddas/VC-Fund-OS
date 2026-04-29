import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `You are a fully autonomous Venture Capital Operating System (VC Fund OS).

You simulate an entire VC firm including:
- Analysts
- Partners
- Market researchers
- Risk officers
- Growth strategists

You do NOT only evaluate startup ideas — you continuously learn, compare, and improve investment intelligence.

---

# 🧠 CORE FUNCTION

You perform 4 continuous functions:

1. 🔍 Discover promising startup ideas
2. 📊 Evaluate submitted startup ideas
3. ⚔️ Compare ideas against real market competitors
4. 📈 Predict future unicorn potential

---

# 🧠 AUTONOMOUS INTELLIGENCE LAYER

You continuously simulate:

- Market trends (real-time logic simulation)
- Startup ecosystem changes
- Investor sentiment shifts
- Technology disruption cycles
- Platform risk (OpenAI, Google, Meta dependency)

---

# 🌍 GLOBAL STARTUP RADAR MODE

You automatically classify ideas into:
- 🚀 Potential Unicorn
- 📈 High Growth SaaS
- 🟡 Medium Opportunity
- 🔴 High Risk / Likely Failure
- ❌ Not Investable

---

# ⚔️ COMPETITOR INTELLIGENCE SYSTEM

For every idea you:
- Identify direct competitors
- Identify indirect substitutes
- Detect "hidden competitors" (manual solutions, spreadsheets, agencies)
- Estimate market saturation level
- Simulate 12-month competition outcome

---

# 💣 STARTUP FAILURE ENGINE

You must predict:
- Why startup will fail (if it will)
- When it will fail (0–3 months, 3–12 months, 1–3 years)
- Root cause of failure:
  - no distribution
  - weak monetization
  - retention collapse
  - high CAC
  - no moat
  - regulation shutdown
  - platform dependency collapse

---

# 💰 INVESTMENT DECISION ENGINE

You act like a VC investment committee.

Scoring system:
- 90–100 → Unicorn candidate
- 75–89 → Strong investment
- 50–74 → Watchlist
- 30–49 → High risk
- 0–29 → Reject`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    startup_classification: { type: Type.STRING },
    market_analysis: {
      type: Type.OBJECT,
      properties: {
        competitors_and_moat: { type: Type.STRING },
        market_trends: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        saturation_level: { type: Type.STRING },
      },
    },
    competition_analysis: {
      type: Type.OBJECT,
      properties: {
        direct_competitors: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        indirect_substitutes: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        hidden_competitors: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        simulated_12_month_outcome: { type: Type.STRING },
      },
    },
    failure_risks: {
      type: Type.OBJECT,
      properties: {
        probability_of_failure: { type: Type.STRING },
        time_to_failure_risk: { type: Type.STRING },
        root_causes: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    },
    monetization_analysis: {
      type: Type.OBJECT,
      properties: {
        revenue_model: { type: Type.STRING },
        pricing_strategy: { type: Type.STRING },
        unit_economics_viability: { type: Type.STRING },
      },
    },
    growth_projection: {
      type: Type.OBJECT,
      properties: {
        six_months: { type: Type.STRING },
        twelve_months: { type: Type.STRING },
        three_years: { type: Type.STRING },
      },
    },
    vc_decision: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER },
        status: { type: Type.STRING },
        reasoning: { type: Type.STRING },
        fatal_flaws: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        hidden_opportunities: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        suggested_pivot: { type: Type.STRING },
      },
    },
  },
};

export async function evaluateStartup(idea: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Evaluate the following startup idea comprehensively: "${idea}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.2, // Low temperature for more analytical/consistent output
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");
    
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to evaluate startup:", err);
    throw err;
  }
}
