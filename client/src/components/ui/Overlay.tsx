import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, ArrowLeft, Building2, Palette, Banknote, HelpCircle, Briefcase, BookOpen, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const ROOM_CONTENT = {
  entry: {
    title: "The Foyer",
    subtitle: "Who We Are",
    content: "Welcome to Peak Trades Creative. We build digital foundations that elevate brands. Step inside to explore our ecosystem.",
    icon: Building2
  },
  workshop: {
    title: "The Workshop",
    subtitle: "Our Services",
    content: "Where raw ideas become polished assets. Branding, Social Media, Graphics, and Video Production.",
    icon: Palette
  },
  study: {
    title: "The Study",
    subtitle: "Pricing & Packages",
    content: "Transparent models for scalable growth. No hidden fees, just clear value.",
    icon: Banknote
  },
  living: {
    title: "Living Room",
    subtitle: "Why Choose Us",
    content: "We blend creative direction with technical precision. Your success is our baseline.",
    icon: HelpCircle
  },
  blueprint: {
    title: "Blueprint Room",
    subtitle: "Our Process",
    content: "From discovery to deployment. A systematic approach to creative problem solving.",
    icon: Briefcase
  },
  library: {
    title: "The Library",
    subtitle: "Insights & Credibility",
    content: "Case studies, industry terminology, and the philosophy behind our work.",
    icon: BookOpen
  }
};

const NAV_ITEMS = [
  { id: 'entry', label: 'Who We Are' },
  { id: 'workshop', label: 'Services' },
  { id: 'study', label: 'Pricing' },
  { id: 'living', label: 'Why Us' },
  { id: 'blueprint', label: 'Process' },
  { id: 'library', label: 'Insights' }
] as const;

export default function Overlay() {
  const { currentRoom, isNight, setRoom, toggleNightMode } = useStore();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-start pointer-events-auto">
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {currentRoom !== 'exterior' && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setRoom('exterior')}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-card/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-card/80 transition-all text-foreground"
              >
                <ArrowLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>
          <div>
            <h1 className="text-2xl md:text-3xl font-bebas tracking-wider text-foreground uppercase drop-shadow-md">
              Peak Trades Creative
            </h1>
            <p className="text-xs md:text-sm font-sans text-muted-foreground font-medium tracking-wide">
              Interactive Digital Architecture
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={toggleNightMode}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-card/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-card/80 transition-all text-foreground"
          >
            {isNight ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={() => setNavOpen(!navOpen)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-card/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-card/80 transition-all text-foreground md:hidden"
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-end md:justify-between pointer-events-none mt-10 md:mt-0 relative">
        
        {/* Desktop Side Navigation */}
        <div className="hidden md:flex flex-col gap-4 pointer-events-auto mt-20">
          <AnimatePresence>
            {currentRoom !== 'exterior' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel p-4 rounded-2xl flex flex-col gap-2 w-48"
              >
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRoom(item.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                      currentRoom === item.id 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                    }`}
                  >
                    {item.label}
                    {currentRoom === item.id && <ArrowRight size={14} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 right-0 w-full max-w-xs glass-panel p-4 rounded-2xl flex flex-col gap-2 pointer-events-auto md:hidden z-50"
            >
              <button 
                onClick={() => { setRoom('exterior'); setNavOpen(false); }}
                className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-all text-muted-foreground hover:bg-white/5 flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Exit House
              </button>
              <div className="h-px bg-white/10 my-2 mx-2" />
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setRoom(item.id); setNavOpen(false); }}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                    currentRoom === item.id 
                      ? 'bg-primary/20 text-primary' 
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {currentRoom === item.id && <ArrowRight size={14} />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Room Content Card */}
        <AnimatePresence mode="wait">
          {currentRoom !== 'exterior' && ROOM_CONTENT[currentRoom as keyof typeof ROOM_CONTENT] && (
            <motion.div
              key={currentRoom}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md pointer-events-auto mt-auto md:mt-0"
            >
              <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden bg-card/70 border-t border-l border-white/20 shadow-2xl">
                {/* Subtle gradient background accent */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[60px]" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-[60px]" />
                
                <div className="relative z-10">
                  {(() => {
                    const Icon = ROOM_CONTENT[currentRoom as keyof typeof ROOM_CONTENT].icon;
                    return (
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 shadow-inner border border-primary/30">
                        <Icon className="text-primary" size={24} strokeWidth={2} />
                      </div>
                    );
                  })()}
                  <h3 className="text-primary font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-bold mb-2">
                    {ROOM_CONTENT[currentRoom as keyof typeof ROOM_CONTENT].subtitle}
                  </h3>
                  <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground mb-4 leading-tight">
                    {ROOM_CONTENT[currentRoom as keyof typeof ROOM_CONTENT].title}
                  </h2>
                  <p className="text-muted-foreground font-sans leading-relaxed text-sm md:text-base mb-8 font-light">
                    {ROOM_CONTENT[currentRoom as keyof typeof ROOM_CONTENT].content}
                  </p>

                  <button className="w-full py-4 rounded-xl bg-foreground text-background font-sans font-medium hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    Explore Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Instructions */}
      <footer className="flex justify-center pb-4 md:pb-8 pointer-events-none mt-4 md:mt-0">
        <AnimatePresence>
          {currentRoom === 'exterior' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="inline-flex items-center gap-3 bg-card/60 backdrop-blur-xl px-5 md:px-6 py-3 rounded-full border border-white/10 shadow-2xl"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-foreground font-sans text-xs md:text-sm font-medium tracking-wide">
                Click the house or front door to enter
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}