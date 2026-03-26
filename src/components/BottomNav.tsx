import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Network, MessageCircle, GraduationCap, Sparkles, Shield } from 'lucide-react';

export type PanelId = 'dashboard' | 'referral' | 'community' | 'edtech' | 'aitools' | 'admin';

interface BottomNavProps {
  activePanel: PanelId;
  onNavigate: (panel: PanelId) => void;
}

const navItems: { id: PanelId; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Hub', icon: LayoutDashboard },
  { id: 'referral', label: 'Referral', icon: Network },
  { id: 'community', label: 'Lounge', icon: MessageCircle },
  { id: 'edtech', label: 'Learn', icon: GraduationCap },
  { id: 'aitools', label: 'AI Tools', icon: Sparkles },
  { id: 'admin', label: 'Admin', icon: Shield },
];

const BottomNav: React.FC<BottomNavProps> = ({ activePanel, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-primary/20 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activePanel === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-[1px] w-8 h-[3px] rounded-full bg-primary glow-fuchsia"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
