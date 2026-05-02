import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import { signInWithGoogle, logout } from '../lib/firebase';
import { Sun, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold tracking-tight text-gray-900">SolarHub Egypt</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">Home</Link>
            <Link to="/calculator" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">Calculator</Link>
            <Link to="/b2b" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">B2B Portal</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="h-8 w-8 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
                  ) : (
                    <UserIcon className="h-6 w-6" />
                  )}
                </Link>
                <button 
                  onClick={() => logout()}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => signInWithGoogle()}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg">Home</Link>
              <Link to="/calculator" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg">Calculator</Link>
              <Link to="/b2b" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg">B2B Portal</Link>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg">Profile</Link>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { signInWithGoogle(); setIsOpen(false); }}
                  className="block w-full text-center bg-gray-900 text-white px-3 py-4 rounded-xl text-base font-semibold"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
