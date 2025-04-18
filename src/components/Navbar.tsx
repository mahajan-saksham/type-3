import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu,
  X,
  Home,
  ShoppingBag,
  LogOut
} from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';
import { Card } from './Card';
import { supabase } from '../lib/supabaseClient';
// Site Visit form will be used in Contact page instead

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Add body class to prevent scrolling when menu is open and handle keyboard trap
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
      
      // Handle escape key to close menu
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      
      window.addEventListener('keydown', handleEscKey);
      return () => {
        document.body.classList.remove('overflow-hidden');
        window.removeEventListener('keydown', handleEscKey);
      };
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-300 bg-white/10 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link 
              to="/" 
              className={`nav-link group flex flex-col items-center justify-center px-3 py-1.5 transition-colors hover:bg-black/10 rounded-lg ${
                isActive('/') 
                  ? 'text-primary' 
                  : 'text-light/80 hover:text-primary'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-[10px] mt-0.5">Home</span>
            </Link>
            <Link 
              to="/products" 
              className={`nav-link group flex flex-col items-center justify-center px-3 py-1.5 transition-colors hover:bg-black/10 rounded-lg ${
                isActive('/products') 
                  ? 'text-primary' 
                  : 'text-light/80 hover:text-primary'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-[10px] mt-0.5">Products</span>
            </Link>
            {/* Contact tab removed */}
            
            {user ? (
              <div className="flex items-center gap-4">
                <Button 
                  to="/dashboard"
                  variant="primary"
                  size="md"
                  radius="xl"
                >
                  Dashboard
                </Button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-light/60 hover:text-primary transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Button 
                to="/auth"
                variant="primary"
                size="md"
                radius="xl"
                className="ml-2"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-light hover:text-primary transition-colors relative z-50 rounded-lg"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-30 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-x-0 top-20 z-40 transition-all duration-300 transform ${
          isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <Card 
          variant="glass" 
          className="mx-4 border border-white/20 shadow-lg max-h-[80vh] overflow-y-auto backdrop-blur-200 bg-gradient-to-br from-[#1a1d23] to-[#2f343a] rounded-3xl"
          id="mobile-menu"
        >
          <div className="p-4 space-y-4">
            {user ? (
              <div className="flex flex-col gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="text-light text-sm mb-1 px-2">Welcome, {user.email?.split('@')[0]}</div>
                <Button 
                  to="/dashboard"
                  variant="primary"
                  size="md"
                  radius="xl"
                  fullWidth
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Button>
                <Button
                  to="#"
                  variant="ghost"
                  size="md"
                  radius="xl"
                  fullWidth
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="mb-6 border-b border-white/10 pb-4">
                <Button 
                  to="/auth"
                  variant="primary"
                  size="md"
                  radius="xl"
                  fullWidth
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In / Register
                </Button>
              </div>
            )}
            <Link 
              to="/"
              className={`flex justify-between items-center px-4 py-3 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'text-primary bg-light/5' 
                  : 'text-light hover:text-primary hover:bg-light/5'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-sm font-medium">Home</span>
              <Home className="h-5 w-5" />
            </Link>
            <Link 
              to="/products"
              className={`flex justify-between items-center px-4 py-3 rounded-lg transition-colors ${
                isActive('/products') 
                  ? 'text-primary bg-light/5' 
                  : 'text-light hover:text-primary hover:bg-light/5'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-sm font-medium">Products</span>
              <ShoppingBag className="h-5 w-5" />
            </Link>
            {/* Contact tab removed from mobile menu */}

          </div>
        </Card>
      </div>

      {/* Site Visit Form has been moved to Contact page */}
    </nav>
  );
}