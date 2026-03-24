import React from 'react';

interface DashboardHeaderProps {
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onLogout }) => {
  return (
    <header className="flex justify-between items-center py-3 px-4 sm:px-6 glass-strong border-b border-primary/20 relative z-20">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center font-bold text-primary-foreground text-sm cursor-pointer glow-fuchsia"
          onClick={onLogout}
        >
          EA
        </div>
        <span className="font-bold tracking-wide text-primary-foreground text-lg sm:text-xl">Dashboard</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 bg-secondary border border-primary/30 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-semibold text-primary">0x1A4...B9F2</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
