import { motion } from 'motion/react';
import { ArrowRight, Lightbulb, Factory, Wheat, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Residential',
    subtitle: 'Water Heaters & Lighting',
    icon: Lightbulb,
    description: 'Reduce monthly home bills with efficient solar lighting and heating solutions.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Industrial',
    subtitle: 'Inverters & PV Panels',
    icon: Factory,
    description: 'Minimize OPEX for your business with large-scale solar installations and smart inverters.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Agricultural',
    subtitle: 'Solar Water Pumps',
    icon: Wheat,
    description: 'Sustainable irrigation solutions designed for the future of farming in Egypt.',
    color: 'bg-green-50 text-green-600',
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center space-x-2 bg-orange-50 px-4 py-1.5 rounded-full mb-8">
                  <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">Blueprint 01</span>
                  <span className="h-1 w-1 bg-orange-300 rounded-full"></span>
                  <span className="text-sm font-medium text-orange-600">The Landing Experience</span>
                </div>
                <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8">
                  Sustainable <br />
                  <span className="text-orange-500">Energy</span> for <br />
                  Egypt
                </h1>
                <p className="text-xl text-gray-500 max-w-xl mb-12 leading-relaxed">
                  Reducing Industrial OPEX & Residential Bills with clean, reliable, and sustainable solar energy solutions tailored for Egypt.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/calculator"
                    className="flex items-center justify-center px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                  >
                    Calculate Savings
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/b2b"
                    className="flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-bold text-lg hover:border-gray-200 transition-all active:scale-95"
                  >
                    B2B Portal
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 mt-16 lg:mt-0 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2672&auto=format&fit=crop" 
                    alt="Solar Energy" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-lg font-medium opacity-90 leading-snug">
                      "Powering the transition to a greener Egypt, one roof at a time."
                    </p>
                  </div>
                </div>
                {/* Float elements */}
                <div className="absolute -top-12 -right-12 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex items-center space-x-4 max-w-[240px]">
                  <div className="bg-orange-50 p-2.5 rounded-xl">
                    <CheckCircle2 className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">4.2 Years</p>
                    <p className="text-xs text-gray-500 font-medium">Avg. Payback Period</p>
                  </div>
                </div>
              </motion.div>
              {/* Background gradient blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Sectors</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">
              We minimize bounce rates and ensure technical users and homeowners find their specific value propositions immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm font-bold text-orange-500 mb-4 uppercase tracking-wider">{item.subtitle}</p>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="mt-8 pt-6 border-t border-gray-50">
                  <Link to={idx === 1 ? "/b2b" : "/calculator"} className="inline-flex items-center text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                    Explore Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Trusted By Leading Tech Partners</h4>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl font-black text-gray-900 tracking-tighter">ABB</span>
              <span className="text-2xl font-black text-gray-900 tracking-tighter italic">Schneider</span>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">HUAWEI</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* EMBA Strategy Note */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 border-l-4 border-orange-500 pl-6 py-2">
            <p className="text-orange-200 text-sm leading-relaxed max-w-4xl">
              <span className="font-bold text-orange-500 mr-2 uppercase tracking-widest">EMBA Strategy:</span>
              The homepage acts as a high-level routing engine. By categorizing into three distinct sectors, we minimize "bounce rates" and ensure technical users (B2B) and homeowners (B2C) find their specific value propositions immediately.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
