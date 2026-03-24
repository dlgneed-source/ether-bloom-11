import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from '@/components/Landing';
import DashboardHeader from '@/components/DashboardHeader';
import Dashboard from '@/components/Dashboard';
import CommunityLounge from '@/components/CommunityLounge';
import EdTechSpace from '@/components/EdTechSpace';
import AIToolsHub from '@/components/AIToolsHub';
import BottomNav, { type PanelId } from '@/components/BottomNav';

const panelVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.15 } },
};

const Index: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelId>('dashboard');

  if (!isLoggedIn) {
    return <Landing onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col relative">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <DashboardHeader onLogout={() => setIsLoggedIn(false)} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activePanel}
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 flex flex-col relative z-10"
        >
          {activePanel === 'dashboard' && <Dashboard />}
          {activePanel === 'community' && <CommunityLounge />}
          {activePanel === 'edtech' && <EdTechSpace />}
          {activePanel === 'aitools' && <AIToolsHub />}
        </motion.div>
      </AnimatePresence>

      <BottomNav activePanel={activePanel} onNavigate={setActivePanel} />
    </div>
  );
};

export default Index;
