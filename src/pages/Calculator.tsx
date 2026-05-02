import { useState, useEffect, FormEvent } from 'react';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { dbService } from '../services/db';
import { Calculator as CalcIcon, Save, ArrowLeft, TrendingUp, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoiCalculation } from '../types';

interface CalculatorProps {
  user: User | null;
}

export default function Calculator({ user }: CalculatorProps) {
  const [bill, setBill] = useState<number>(1500);
  const [roof, setRoof] = useState<number>(30);
  const [results, setResults] = useState<Omit<RoiCalculation, 'userId' | 'createdAt'> | null>(null);
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState<RoiCalculation[]>([]);

  const calculate = (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    // Simple logic for the demo estimation
    const systemSize = Math.min(bill / 100, roof / 8); 
    const annualSavings = bill * 12 * 0.85; // 85% reduction
    const cost = systemSize * 15000; // Estimated 15k per kWp
    const payback = cost / annualSavings;

    setResults({
      monthlyBill: bill,
      roofSpace: roof,
      estimatedAnnualSavings: Math.round(annualSavings),
      paybackPeriod: Number(payback.toFixed(1)),
      systemSize: Number(systemSize.toFixed(1)),
    });
  };

  const saveResult = async () => {
    if (!user || !results) return;
    setSaving(true);
    try {
      await dbService.saveRoiCalculation({
        ...results,
        userId: user.uid,
      });
      alert('Calculation saved to your profile!');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full mb-4 border border-gray-100 shadow-sm text-sm font-bold text-gray-900">
            <span className="text-orange-500 uppercase tracking-wider">Blueprint 02</span>
            <span className="h-1 w-1 bg-gray-200 rounded-full"></span>
            <span>The ROI Calculator</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Instant Savings Estimator</h1>
          <p className="text-gray-500 font-medium">Use our lead magnet tool to identify your potential savings today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-5 bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <form onSubmit={calculate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Monthly Electricity Bill (EGP)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={bill}
                    onChange={(e) => setBill(Number(e.target.value))}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl px-6 py-4 text-xl font-bold text-gray-900 transition-all outline-none"
                    placeholder="e.g. 1500"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold">EGP</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Available Roof Space (sqm)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={roof}
                    onChange={(e) => setRoof(Number(e.target.value))}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl px-6 py-4 text-xl font-bold text-gray-900 transition-all outline-none"
                    placeholder="e.g. 30"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold">m²</div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-500/30 flex items-center justify-center"
              >
                <CalcIcon className="mr-2 h-5 w-5" />
                View ROI Analysis
              </button>
            </form>
          </motion.div>

          {/* Results */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-7"
          >
            <AnimatePresence mode="wait">
              {results && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-orange-400 uppercase tracking-widest text-center mb-4">Estimated Annual Savings</p>
                    <div className="text-center mb-10">
                      <span className="text-2xl font-bold text-orange-400 mr-2">EGP</span>
                      <span className="text-7xl font-black text-white tracking-tighter">
                        {results.estimatedAnnualSavings.toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center space-x-3 text-orange-400 mb-2">
                          <Clock className="h-5 w-5" />
                          <p className="text-xs font-bold uppercase tracking-wider opacity-60">Payback Period</p>
                        </div>
                        <p className="text-3xl font-bold">{results.paybackPeriod} <span className="text-sm opacity-50">Years</span></p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center space-x-3 text-orange-400 mb-2">
                          <Zap className="h-5 w-5" />
                          <p className="text-xs font-bold uppercase tracking-wider opacity-60">System Size</p>
                        </div>
                        <p className="text-3xl font-bold">{results.systemSize} <span className="text-sm opacity-50">kWp</span></p>
                      </div>
                    </div>

                    {user && (
                      <button
                        onClick={saveResult}
                        disabled={saving}
                        className="w-full mt-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center disabled:opacity-50"
                      >
                        {saving ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        ) : (
                          <>
                            <Save className="mr-2 h-5 w-5" />
                            Save to Progress
                          </>
                        )}
                      </button>
                    )}
                    
                    {!user && (
                      <p className="text-center mt-8 text-sm text-white/40 font-medium">
                        Sign in to save your results and track progress over time.
                      </p>
                    )}
                  </div>
                  
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 p-8">
                    <TrendingUp className="h-24 w-24 text-white/5" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Strategy Note */}
        <div className="mt-12 bg-white border border-gray-100 rounded-3xl p-8">
          <div className="flex items-start space-x-6">
            <div className="bg-orange-50 p-4 rounded-2xl shrink-0">
              <span className="font-black text-orange-600">EMBA</span>
            </div>
            <div>
              <p className="text-gray-600 text-sm leading-relaxed">
                <span className="font-bold text-gray-900 block mb-1 uppercase tracking-widest text-[10px]">Strategy Note</span>
                This tool is a "Lead Magnet." It provides immediate utility (quantitative data) to the user. For the business, it serves as a pre-qualification filter, identifying high-intent customers before they ever speak to a sales representative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
