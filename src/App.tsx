import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, auth } from './lib/firebase';
import { User } from 'firebase/auth';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import B2BPortal from './pages/B2BPortal';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar user={user} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator user={user} />} />
            <Route path="/b2b" element={<B2BPortal user={user} />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
