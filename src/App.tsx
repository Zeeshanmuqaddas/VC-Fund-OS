import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  DollarSign, 
  Crosshair,
  Shield,
  Zap,
  Swords,
  Search,
  ChevronRight,
  Database,
  LineChart,
  BrainCircuit,
  PieChart
} from 'lucide-react';
import { evaluateStartup } from './services/gemini';
import { WorkspaceData } from './types';

// Components
import Dashboard from './components/Dashboard';

export default function App() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WorkspaceData | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setError("");
    
    try {
      const data = await evaluateStartup(idea);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-300 selection:bg-emerald-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-black">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-mono text-sm tracking-wider font-bold text-zinc-100 flex items-center gap-2">
                VC FUND OS
                <span className="px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-400 text-[10px]">ULTRA PRO</span>
              </h1>
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-0.5">Autonomous Venture Capital</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-zinc-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              SYSTEM ONLINE
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!result && !loading ? (
            <motion.div 
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mt-20"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-zinc-100 mb-4 tracking-tight">Deploy Autonomous Intelligence</h2>
                <p className="text-zinc-500 text-sm">Submit your startup concept. Our AI-driven VC simulation will perform deep market analysis, predict failure risks, and calculate the Unicorn Potential Score.</p>
              </div>

              <form onSubmit={handleAnalyze} className="relative">
                <div className="relative border border-white/10 rounded-2xl bg-black/40 p-1 group hover:border-white/20 transition-colors focus-within:border-emerald-500/50 flex">
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe the startup idea, target market, and business model..."
                    className="w-full bg-transparent min-h-[160px] resize-y p-5 outline-none text-zinc-200 placeholder:text-zinc-600"
                    autoFocus
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <button 
                      type="submit"
                      disabled={!idea.trim() || loading}
                      className="h-10 px-5 rounded-xl bg-white text-black font-medium text-sm flex items-center gap-2 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Zap className="w-4 h-4" />
                      Run Analysis
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
              </form>
              
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                <div className="flex flex-col gap-2">
                  <PieChart className="w-5 h-5 text-zinc-500" />
                  <h4 className="font-medium text-sm text-zinc-400">Market Dynamics</h4>
                  <p className="text-xs text-zinc-600">Simulates market trends and estimates saturation levels.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Swords className="w-5 h-5 text-zinc-500" />
                  <h4 className="font-medium text-sm text-zinc-400">Competitor Intel</h4>
                  <p className="text-xs text-zinc-600">Identifies direct, indirect, and hidden spreadsheet competitors.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Target className="w-5 h-5 text-zinc-500" />
                  <h4 className="font-medium text-sm text-zinc-400">Failure Prediction</h4>
                  <p className="text-xs text-zinc-600">Calculates probability of failure across multi-year horizons.</p>
                </div>
              </div>
            </motion.div>
          ) : loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 border-2 border-zinc-800 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h3 className="mt-6 font-mono text-emerald-400 tracking-widest text-sm uppercase">Simulating Market Variables</h3>
              <p className="text-zinc-500 text-xs mt-2 max-w-sm text-center">Deploying analysts, risk officers, and growth strategists to evaluate unicorn potential...</p>
            </motion.div>
          ) : result && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <button 
                  onClick={() => setResult(null)}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
                >
                   ← NEW ANALYSIS
                </button>
              </div>
              <Dashboard data={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
