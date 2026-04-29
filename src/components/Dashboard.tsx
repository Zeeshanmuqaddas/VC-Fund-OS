import React from 'react';
import { WorkspaceData, VCDecision } from '../types';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Crosshair,
  ShieldAlert,
  Zap,
  Swords,
  Search,
  Eye,
  LineChart,
  PieChart,
  AlertOctagon,
  Lightbulb,
  Coins
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  data: WorkspaceData;
}

const ScoreDial = ({ score }: { score: number }) => {
  let colorClass = "text-red-500";
  let bgClass = "fill-red-500/10";
  let strokeClass = "stroke-red-500";
  
  if (score >= 90) {
    colorClass = "text-emerald-500";
    bgClass = "fill-emerald-500/10";
    strokeClass = "stroke-emerald-500";
  } else if (score >= 75) {
    colorClass = "text-blue-500";
    bgClass = "fill-blue-500/10";
    strokeClass = "stroke-blue-500";
  } else if (score >= 50) {
    colorClass = "text-yellow-500";
    bgClass = "fill-yellow-500/10";
    strokeClass = "stroke-yellow-500";
  } else if (score >= 30) {
    colorClass = "text-orange-500";
    bgClass = "fill-orange-500/10";
    strokeClass = "stroke-orange-500";
  }

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = Math.max(0, circumference - (score / 100) * circumference);

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} className="fill-transparent stroke-white/5" strokeWidth="6" />
        <circle cx="40" cy="40" r={radius} className={`fill-transparent ${strokeClass} transition-all duration-1000 ease-out`} strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-light tracking-tighter ${colorClass}`}>{score}</span>
      </div>
    </div>
  );
};

export default function Dashboard({ data }: DashboardProps) {
  const {
    startup_classification,
    vc_decision,
    market_analysis,
    competition_analysis,
    failure_risks,
    monetization_analysis,
    growth_projection
  } = data;

  const StatusBadge = ({ status }: { status: string }) => {
    const s = status.toUpperCase();
    if (s.includes('UNICORN')) return <span className="bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest">UNICORN CANDIDATE</span>;
    if (s.includes('INVEST')) return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest">STRONG INVEST</span>;
    if (s.includes('WATCH')) return <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest">WATCHLIST</span>;
    if (s.includes('RISK')) return <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest">HIGH RISK</span>;
    return <span className="bg-red-500/20 text-red-500 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest">REJECT</span>;
  };

  return (
    <div className="space-y-6">
      {/* Top Section - Primary Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="md:col-span-2 bg-[#141519] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-sm font-mono text-zinc-500 mb-1 flex items-center gap-2">
                <Rocket className="w-4 h-4" /> 
                STARTUP CLASSIFICATION
              </h2>
              <div className="text-2xl font-semibold text-zinc-100">{startup_classification}</div>
            </div>
            <StatusBadge status={vc_decision.status} />
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-zinc-300 text-sm leading-relaxed mb-6">
            {vc_decision.reasoning}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vc_decision.suggested_pivot && (
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                <h4 className="text-xs font-mono text-indigo-400 mb-2 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> REQUIRED PIVOT</h4>
                <p className="text-sm text-indigo-200/90">{vc_decision.suggested_pivot}</p>
              </div>
            )}
            <div className="bg-black/20 border border-white/5 rounded-xl p-4">
              <h4 className="text-xs font-mono text-emerald-400 mb-2 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> HIDDEN OPP</h4>
              <ul className="space-y-1">
                {vc_decision.hidden_opportunities?.slice(0, 3).map((opp, i) => (
                  <li key={i} className="text-xs text-zinc-400 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-emerald-500/50 before:rounded-full">{opp}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#141519] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative"
        >
          <h3 className="text-xs font-mono text-zinc-500 absolute top-6 flex items-center gap-1.5">
            <LineChart className="w-4 h-4" /> UNICORN POTENTIAL
          </h3>
          <div className="mt-8 mb-4">
            <ScoreDial score={vc_decision.score} />
          </div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">VC Committee Score</p>
          <div className="w-full mt-8 pt-6 border-t border-white/5">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-zinc-500">6mo Projection</span>
              <span className="text-zinc-300 font-medium">{growth_projection.six_months}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">3yr Horizon</span>
              <span className="text-zinc-300 font-medium">{growth_projection.three_years}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Middle Section - Failure Matrix & Competitors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Failure Engine */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-black/20 border border-red-500/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center text-red-500">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-zinc-100">Failure Prediction Engine</h2>
              <p className="text-xs font-mono text-red-400">PROBABILITY: {failure_risks.probability_of_failure}</p>
            </div>
          </div>
          
          <div className="mb-6 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
            <div className="text-xs text-zinc-500 mb-1 font-mono uppercase tracking-wider">Estimated Time to Failure Risk</div>
            <div className="text-red-400 font-medium">{failure_risks.time_to_failure_risk}</div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-zinc-500 mb-2 font-mono uppercase tracking-wider">Root Cause Vectors</div>
            {failure_risks.root_causes.map((cause, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <AlertTriangle className="w-4 h-4 text-red-500/70 mt-0.5 shrink-0" />
                <span className="text-sm text-zinc-300">{cause}</span>
              </div>
            ))}
          </div>

          {vc_decision.fatal_flaws?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-red-500/10">
              <div className="text-xs text-red-500 mb-3 font-mono uppercase tracking-wider flex items-center gap-2">
                <AlertOctagon className="w-3.5 h-3.5" /> System-Identified Fatal Flaws
              </div>
              <ul className="space-y-2">
                {vc_decision.fatal_flaws.map((flaw, idx) => (
                  <li key={idx} className="text-sm text-red-200/70 flex gap-2">
                    <span className="text-red-500/50">—</span> {flaw}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Competitor Intel */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-black/20 border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-500">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-zinc-100">Competitor Intelligence</h2>
              <p className="text-xs font-mono text-blue-400">MARKET SATURATION: {market_analysis.saturation_level}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-widest flex items-center gap-1.5"><Search className="w-3 h-3" /> Direct Competitors</div>
              <div className="flex flex-wrap gap-2">
                {competition_analysis.direct_competitors.map((comp, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-[#1A1B20] border border-white/5 text-xs text-zinc-300 font-medium">{comp}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-widest flex items-center gap-1.5"><Eye className="w-3 h-3" /> Hidden Competitors (Substitutes)</div>
              <div className="flex flex-wrap gap-2">
                {[...competition_analysis.hidden_competitors, ...competition_analysis.indirect_substitutes].map((comp, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-zinc-800/30 text-xs text-zinc-400 border border-transparent border-dashed">{comp}</span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <div className="text-xs text-blue-400/80 mb-2 font-mono uppercase tracking-wider">12-Month Outcome Simulation</div>
              <p className="text-sm text-zinc-300 leading-relaxed">{competition_analysis.simulated_12_month_outcome}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section - Monetization & Market */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="md:col-span-1 bg-[#141519] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5 text-emerald-400">
            <Coins className="w-4 h-4" />
            <h3 className="text-sm font-mono tracking-wider">MONETIZATION</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-zinc-500 mb-1">Revenue Model</div>
              <div className="text-sm text-zinc-200">{monetization_analysis.revenue_model}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">Pricing Strategy</div>
              <div className="text-sm text-zinc-200">{monetization_analysis.pricing_strategy}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">Unit Economics</div>
              <div className="text-sm text-zinc-200">{monetization_analysis.unit_economics_viability}</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="md:col-span-2 bg-[#141519] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5 text-purple-400">
            <PieChart className="w-4 h-4" />
            <h3 className="text-sm font-mono tracking-wider">MARKET DYNAMICS</h3>
          </div>
          <div className="space-y-4 pb-4">
            <p className="text-sm text-zinc-300 leading-relaxed">{market_analysis.competitors_and_moat}</p>
          </div>
          
          <div className="pt-4 border-t border-white/5">
            <div className="text-xs text-zinc-500 mb-3 font-mono">IDENTIFIED TRENDS</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {market_analysis.market_trends.map((trend, idx) => (
                <div key={idx} className="flex gap-2 text-sm text-zinc-400">
                  <TrendingUp className="w-4 h-4 text-purple-500/50 shrink-0 mt-0.5" />
                  <span>{trend}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
