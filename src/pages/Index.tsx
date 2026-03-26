import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from '@/components/Landing';
import InternalHeader from '@/components/InternalHeader';
import InternalSidebar from '@/components/InternalSidebar';
import Dashboard from '@/components/Dashboard';
import ReferralEngine from '@/components/ReferralEngine';
import CommunityLounge from '@/components/CommunityLounge';
import EdTechSpace from '@/components/EdTechSpace';
import AIToolsHub from '@/components/AIToolsHub';
import AdminPanel from '@/components/AdminPanel';
import BottomNav, { type PanelId } from '@/components/BottomNav';
import { useIsMobile } from '@/hooks/use-mobile';

const panelVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
};

const Index: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isLoggedIn) {
    return <Landing onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen flex bg-[image:var(--gradient-dashboard)] text-foreground font-sans relative w-full max-w-full overflow-x-hidden">
      <InternalSidebar
        open={sidebarOpen || !isMobile}
        activePanel={activePanel}
        onNavigate={setActivePanel}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
        <InternalHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <AnimatePresence mode="wait">
          <motion.main
            key={activePanel}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 overflow-y-auto pb-20 lg:pb-4 min-w-0 w-full"
          >
            {activePanel === 'dashboard' && <Dashboard />}
            {activePanel === 'referral' && <ReferralEngine />}
            {activePanel === 'community' && <CommunityLounge />}
            {activePanel === 'edtech' && <EdTechSpace />}
            {activePanel === 'aitools' && <AIToolsHub />}
            {activePanel === 'admin' && <AdminPanel />}
          </motion.main>
        </AnimatePresence>

        {isMobile && <BottomNav activePanel={activePanel} onNavigate={setActivePanel} />}
      </div>
    </div>
  );
};

export default Index;
