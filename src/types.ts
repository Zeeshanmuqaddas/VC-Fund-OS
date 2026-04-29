export interface VCDecision {
  score: number;
  status: string; // "UNICORN | INVEST | WATCHLIST | REJECT"
  reasoning: string;
  fatal_flaws: string[];
  hidden_opportunities: string[];
  suggested_pivot: string;
}

export interface GrowthProjection {
  six_months: string;
  twelve_months: string;
  three_years: string;
}

export interface MonetizationAnalysis {
  revenue_model: string;
  pricing_strategy: string;
  unit_economics_viability: string;
}

export interface FailureRisks {
  probability_of_failure: string;
  time_to_failure_risk: string;
  root_causes: string[];
}

export interface CompetitionAnalysis {
  direct_competitors: string[];
  indirect_substitutes: string[];
  hidden_competitors: string[];
  simulated_12_month_outcome: string;
}

export interface MarketAnalysis {
  competitors_and_moat: string;
  market_trends: string[];
  saturation_level: string;
}

export interface WorkspaceData {
  startup_classification: string;
  market_analysis: MarketAnalysis;
  competition_analysis: CompetitionAnalysis;
  failure_risks: FailureRisks;
  monetization_analysis: MonetizationAnalysis;
  growth_projection: GrowthProjection;
  vc_decision: VCDecision;
}
