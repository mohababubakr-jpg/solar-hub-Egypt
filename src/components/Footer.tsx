import { Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sun className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-bold tracking-tight text-gray-900">SolarHub Egypt</span>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
              Empowering Egypt with sustainable energy solutions. Reducing bills and industrial OPEX through innovative solar technology.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><Link to="/calculator" className="text-sm text-gray-500 hover:text-orange-500">ROI Calculator</Link></li>
              <li><Link to="/b2b" className="text-sm text-gray-500 hover:text-orange-500">B2B Product Portal</Link></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-orange-500">Residential Systems</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-orange-500">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-orange-500">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-orange-500">Partners</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SolarHub Egypt. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-xs text-gray-300">Trusted By: ABB | Schneider | Huawei</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
