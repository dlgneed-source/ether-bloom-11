import React, { useState } from 'react';
import { Bell, ChevronLeft, Menu } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface InternalHeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onNavigateHome?: () => void;
}

const InternalHeader: React.FC<InternalHeaderProps> = ({ onToggleSidebar, sidebarOpen }) => {
  const [creditUsage] = useState(62);

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border/40 bg-white/[0.03] backdrop-blur-md sticky top-0 z-30">
      {/* Left: sidebar toggle + logo */}
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
          {sidebarOpen ? <ChevronLeft className="w-5 h-5 text-muted-foreground" /> : <Menu className="w-5 h-5 text-muted-foreground" />}
        </button>
        <svg className="h-8 w-auto" viewBox="0 0 600 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hdrGrad" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor="hsl(270, 100%, 70%)" />
              <stop offset="100%" stopColor="hsl(270, 80%, 50%)" />
            </linearGradient>
          </defs>
          <text x="0" y="52" fontFamily="Inter, sans-serif" fontSize="32" fontWeight="800" fill="url(#hdrGrad)" letterSpacing="1">𝐞＠𝐀𝐤𝐡𝐮𝐰𝐚𝐭</text>
        </svg>
      </div>

      {/* Center: AI Credit meter (hidden on mobile) */}
      <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs mx-8">
        <span className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase whitespace-nowrap">AI Credits</span>
        <Progress value={creditUsage} className="h-1.5 flex-1 bg-white/5 [&>div]:bg-primary" />
        <span className="text-[10px] font-bold text-primary">{creditUsage}%</span>
      </div>

      {/* Right: notification + wallet */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Bell className="w-4.5 h-4.5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
        </button>
        <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-[11px] font-mono font-semibold text-foreground">0x4F...a1B</span>
        </div>
      </div>
    </header>
  );
};

export default InternalHeader;
