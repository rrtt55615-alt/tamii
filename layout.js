
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Wrench, Phone, MessageSquare, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Ana Sayfa", page: "Home" },
    { name: "Hizmetler", page: "Services" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20">
      <style>{`
        :root {
          --neon-blue: #00BFFF;
          --dark-navy: #1e3a8a;
          --light-blue: #dbeafe;
        }
        
        .neon-glow-blue {
          box-shadow: 
            0 0 10px rgba(0, 191, 255, 0.5),
            0 0 20px rgba(0, 191, 255, 0.3),
            0 0 30px rgba(0, 191, 255, 0.2);
        }
        
        .neon-border-blue {
          border: 2px solid #00BFFF;
          box-shadow: 
            0 0 10px rgba(0, 191, 255, 0.4),
            inset 0 0 10px rgba(0, 191, 255, 0.1);
        }
        
        .smooth-transition {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .card-3d-inner {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-3d:hover .card-3d-inner {
          transform: rotateY(5deg) rotateX(5deg) translateZ(20px);
        }
      `}</style>

      {/* Navigation Header - Made Thinner */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 backdrop-blur-md border-b border-blue-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shrink-0 neon-glow-blue"
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 180,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                <Wrench className="w-5 h-5 text-white" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">Beyaz Eşya Teknik Servis</h1>
                <p className="text-xs text-blue-200">İzmir - Buca / Karabağlar / Konak</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map(link => (
                <motion.div key={link.page}>
                  <Link 
                    to={createPageUrl(link.page)} 
                    className={`text-sm font-medium smooth-transition relative ${
                      currentPageName === link.page ? 'text-cyan-300' : 'text-blue-100 hover:text-cyan-300'
                    }`}
                  >
                    {link.name}
                    {currentPageName === link.page && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 neon-glow-blue"
                        layoutId="underline"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.a 
                href="https://wa.me/905314918035"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 smooth-transition neon-glow-blue hover:shadow-lg"
                whileHover={{ scale: 1.05, rotateX: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">WhatsApp</span>
              </motion.a>
              <motion.a 
                href="tel:+905314918035"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 smooth-transition neon-glow-blue"
                whileHover={{ scale: 1.05, rotateX: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Ara</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-blue-100 hover:bg-blue-700/50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, rotateX: -90 }}
              animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
              exit={{ opacity: 0, height: 0, rotateX: -90 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden border-t border-blue-700"
              style={{ transformOrigin: 'top' }}
            >
              <nav className="flex flex-col p-4 space-y-2 bg-blue-800">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.page}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={createPageUrl(link.page)} 
                      className={`px-4 py-2 rounded-md font-medium block ${
                        currentPageName === link.page ? 'bg-blue-600 text-cyan-300' : 'text-blue-100 hover:bg-blue-700'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content with Advanced Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ 
            opacity: 0, 
            rotateY: -90,
            scale: 0.8,
            z: -100
          }}
          animate={{ 
            opacity: 1, 
            rotateY: 0,
            scale: 1,
            z: 0
          }}
          exit={{ 
            opacity: 0, 
            rotateY: 90,
            scale: 0.8,
            z: -100
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut",
            type: "spring",
            stiffness: 50
          }}
          className="flex-1"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center neon-glow-blue">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Beyaz Eşya Teknik Servis</h3>
              </div>
              <p className="text-gray-400 text-sm">
                İzmir'in güvenilir beyaz eşya tamiri. Profesyonel hizmet, uygun fiyat.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Hizmet Bölgeleri</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Buca</li>
                <li>Karabağlar</li>
                <li>Konak</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Telefon: +90 531 491 8035</li>
                <li>WhatsApp: Hızlı destek</li>
                <li>7/24 Acil servis</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Beyaz Eşya Teknik Servis. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
