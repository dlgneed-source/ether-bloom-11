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
import BottomNav, { type PanelId } from '@/components/BottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
...
            {activePanel === 'dashboard' && <Dashboard />}
            {activePanel === 'referral' && <ReferralEngine />}
            {activePanel === 'community' && <CommunityLounge />}
            {activePanel === 'edtech' && <EdTechSpace />}
            {activePanel === 'aitools' && <AIToolsHub />}
          </motion.main>
        </AnimatePresence>

        {/* Bottom nav — mobile only */}
        {isMobile && <BottomNav activePanel={activePanel} onNavigate={setActivePanel} />}
      </div>
    </div>
  );
};

export default Index;
