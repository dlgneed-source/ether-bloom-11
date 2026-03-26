import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, Award, Calendar, Wallet, TrendingUp, Copy, Check, Settings, ChevronRight, ShieldCheck, Headphones, X } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const ProfilePanel: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePic(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const copyWallet = () => {
    navigator.clipboard.writeText('0x1A4F...B9F2');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const settingsOptions = [
    { label: 'Update Wallet', icon: Wallet, desc: 'Change your connected wallet address' },
    { label: '2-Step Verification', icon: ShieldCheck, desc: 'Enable extra security for your account' },
    { label: 'Contact Support', icon: Headphones, desc: 'Get help from our team' },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
      <div className="p-4 sm:p-6 max-w-2xl mx-auto flex flex-col gap-6">
        {/* Profile Header */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="glass-strong rounded-2xl p-6 flex flex-col items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-3xl font-bold text-primary-foreground glow-fuchsia overflow-hidden">
              {profilePic ? (
                <img src={profilePic} alt="DP" className="w-full h-full object-cover" />
              ) : (
                'EA'
              )}
            </div>
            <label className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer glow-fuchsia">
              <Camera className="w-4 h-4 text-primary-foreground" />
              <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
            </label>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-primary-foreground">e-Akhuwat User</h2>
            <button onClick={copyWallet} className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors mt-1 mx-auto">
              0x1A4F...B9F2
              {copied ? <Check className="w-3 h-3 text-neon-green" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="glass rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Level</span>
            </div>
            <p className="text-2xl font-extrabold text-primary">2</p>
          </motion.div>
          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="glass rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Referrals</span>
            </div>
            <p className="text-2xl font-extrabold text-primary-foreground">24</p>
          </motion.div>
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="glass rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Joined</span>
            </div>
            <p className="text-sm font-bold text-primary-foreground">Jan 2026</p>
          </motion.div>
          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="glass rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-neon-green" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">ROI</span>
            </div>
            <p className="text-2xl font-extrabold text-neon-green">35.7%</p>
          </motion.div>
        </div>

        {/* Wallet Details */}
        <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp} className="glass-strong rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Wallet Overview</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/20">
              <span className="text-xs text-muted-foreground">Total Balance</span>
              <span className="text-sm font-bold text-primary-foreground">$4,892.50</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/20">
              <span className="text-xs text-muted-foreground">Total Invested</span>
              <span className="text-sm font-bold text-primary-foreground">$2,500.00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/20">
              <span className="text-xs text-muted-foreground">Total Earnings</span>
              <span className="text-sm font-bold text-neon-green">$892.50</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-muted-foreground">Active Plan</span>
              <span className="text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-400/60 px-2.5 py-0.5 rounded-full">Plan 1 • $7</span>
            </div>
          </div>
        </motion.div>

        {/* Settings Button */}
        <motion.div initial="hidden" animate="visible" custom={6} variants={fadeUp}>
          <button
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all min-h-[52px]"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground">Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </motion.div>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-background border border-white/10 p-5 pb-8"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-foreground">Settings</h3>
                  <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {settingsOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.label}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all min-h-[52px] text-left"
                      >
                        <Icon className="w-5 h-5 text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                          <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePanel;
