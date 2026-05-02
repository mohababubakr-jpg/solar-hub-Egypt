import { useState, FormEvent } from 'react';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { dbService } from '../services/db';
import { FileText, Send, CheckCircle, Package, ArrowLeft, ShieldCheck, Zap, ThermometerSun } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 'sh-550-ind',
    name: 'Mono-PERC PV Panel 550W',
    sku: 'SH-550-IND',
    description: 'High-efficiency monocrystalline PERC solar panels for large industrial applications.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop',
    specs: [
      { label: 'Efficiency', value: '21.3%', icon: Zap },
      { label: 'Warranty', value: '25 Years', icon: ShieldCheck },
      { label: 'Performance', value: 'High-Heat', icon: ThermometerSun },
    ],
  },
  {
    id: 'si-100-kw',
    name: 'Smart Industrial Inverter 100kW',
    sku: 'SI-100-KW',
    description: 'Advanced power conversion with 99% efficiency and cloud monitoring built-in.',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=2672&auto=format&fit=crop',
    specs: [
      { label: 'Max Output', value: '100kW', icon: Zap },
      { label: 'Protection', value: 'IP66 Rated', icon: ShieldCheck },
      { label: 'Tech', value: 'AI Optimized', icon: Package },
    ],
  }
];

interface B2BPortalProps {
  user: User | null;
}

export default function B2BPortal({ user }: B2BPortalProps) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [form, setForm] = useState({ company: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to request a quote.');
      return;
    }
    setSubmitting(true);
    try {
      await dbService.createQuotationRequest({
        userId: user.uid,
        productId: selectedProduct.id,
        companyName: form.company,
        contactPhone: form.phone,
        notes: form.notes,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setForm({ company: '', phone: '', notes: '' });
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 mb-12 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Solutions
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Product Showcase */}
          <div className="space-y-12">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="aspect-square rounded-[3rem] bg-gray-100 overflow-hidden shadow-2xl relative group">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>
              </div>

              <div>
                <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-1.5 rounded-full mb-4">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">SKU: {selectedProduct.sku}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                  {selectedProduct.name}
                </h1>
                <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {selectedProduct.specs.map((spec, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <spec.icon className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{spec.label}</p>
                    <p className="text-sm font-black text-gray-900">{spec.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Selector */}
            <div className="grid grid-cols-2 gap-4">
              {products.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`p-4 rounded-3xl border-2 transition-all text-left flex items-center space-x-4 ${
                    selectedProduct.id === p.id ? 'border-orange-500 bg-orange-50/50' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden shrink-0">
                    <img src={p.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{p.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{p.sku}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-gray-900 rounded-[3rem] p-12 text-white self-start lg:sticky lg:top-32 shadow-2xl shadow-gray-200">
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-2 tracking-tight">Request B2B Quote</h2>
              <p className="text-white/40 font-medium">Complete the form below to receive a personalized commercial proposal within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">Company Name</label>
                <input
                  required
                  type="text"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-all font-medium"
                  placeholder="Your organization"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">Contact Phone</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-all font-medium"
                    placeholder="+20 ..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">Attachment</label>
                  <button type="button" className="w-full bg-white/5 border border-dashed border-white/20 rounded-2xl px-6 py-4 text-white/40 flex items-center justify-center hover:bg-white/10 transition-all">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Datasheet
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">Project Notes</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-all font-medium min-h-[120px]"
                  placeholder="Tell us about your installation requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting || success}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center ${
                  success ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
                }`}
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                ) : success ? (
                  <>
                    <CheckCircle className="mr-2 h-6 w-6" />
                    Quote Requested
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Quote Request
                  </>
                )}
              </button>
            </form>

            {/* EMBA Strategy Note */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-2 flex items-center">
                <span className="bg-orange-500 text-white px-1.5 rounded mr-2 uppercase tracking-normal">EMBA</span> Strategy
              </p>
              <p className="text-xs text-white/30 leading-relaxed italic">
                For high-value electrical components, the "Add to Cart" button is replaced by "Request Quote" and "Download Datasheet." This mirrors the professional procurement workflow of engineers and procurement managers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
