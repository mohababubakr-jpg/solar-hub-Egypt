import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { dbService } from '../services/db';
import { RoiCalculation, QuotationRequest } from '../types';
import { History, FileText, Settings, User as UserIcon, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const [calcs, setCalcs] = useState<RoiCalculation[]>([]);
  const [quotes, setQuotes] = useState<QuotationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [c, q] = await Promise.all([
        dbService.getRoiCalculations(user.uid),
        dbService.getUserQuotations(user.uid)
      ]);
      setCalcs(c);
      setQuotes(q);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="h-24 w-24 rounded-full mx-auto mb-4 border-4 border-orange-50 shadow-lg" referrerPolicy="no-referrer" />
              ) : (
                <div className="h-24 w-24 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="h-12 w-12 text-orange-500" />
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-900">{user.displayName || 'Solar Enthusiast'}</h2>
              <p className="text-sm text-gray-400 font-medium">{user.email}</p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Dashboard</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center space-x-3 p-4 rounded-2xl bg-orange-50 text-orange-600 font-bold text-sm">
                  <History className="h-5 w-5" />
                  <span>Activity Logs</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 rounded-2xl text-gray-400 hover:text-gray-900 font-bold text-sm transition-colors">
                  <Settings className="h-5 w-5" />
                  <span>Personal Settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow space-y-8">
            {/* ROI History */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <History className="h-5 w-5 text-blue-600" />
                  </div>
                  Saved Calculations
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{calcs.length} Recorded</span>
              </div>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2].map(i => <div key={i} className="h-24 bg-white rounded-3xl" />)}
                </div>
              ) : calcs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {calcs.map((calc) => (
                    <motion.div
                      key={calc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                            {new Date(calc.createdAt).toLocaleDateString()}
                          </p>
                          <h4 className="text-lg font-black text-gray-900">EGP {calc.estimatedAnnualSavings.toLocaleString()}</h4>
                          <p className="text-xs font-medium text-gray-500 italic">Saved per year</p>
                        </div>
                        <button className="text-gray-200 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex space-x-4 border-t border-gray-50 pt-4">
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-300">System</p>
                          <p className="text-xs font-bold text-gray-700">{calc.systemSize} kWp</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-300">Payback</p>
                          <p className="text-xs font-bold text-gray-700">{calc.paybackPeriod} YRS</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-[2rem] text-center border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-medium text-sm">No saved calculations yet. Try the ROI estimator!</p>
                </div>
              )}
            </section>

            {/* Quote History */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center">
                  <div className="bg-orange-100 p-2 rounded-lg mr-3">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  B2B Quotes
                </h3>
              </div>

              {loading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="grow h-32 bg-white rounded-3xl" />
                </div>
              ) : quotes.length > 0 ? (
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <motion.div
                      key={quote.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-6">
                        <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{quote.companyName}</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                              {quote.productId === 'sh-550-ind' ? 'PV Panel 550W' : '100kW Inverter'}
                            </span>
                            <span className="h-1 w-1 bg-gray-200 rounded-full"></span>
                            <span className="text-xs font-bold text-green-600 capitalize">{quote.status}</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-gray-50 p-3 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                        <ExternalLink className="h-5 w-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-[2rem] text-center border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-medium text-sm">You haven't requested any B2B quotes yet.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
