import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Lock, Send, X, Bot, Clock, Paperclip, Trophy, GraduationCap, 
  ArrowLeft, FileText, Download, Video, CheckCircle2,
  Star, Sparkles, Zap, BookOpen, Flame, Award,
  TrendingUp, Users, Check, Circle, LockKeyhole
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════ */
/*                    PREMIUM COURSE DATA                          */
/* ═══════════════════════════════════════════════════════════════ */
const originalModules = [
  { 
    id: 1, 
    title: 'HTML, CSS & JS Fundamentals', 
    duration: '12h 30m', 
    thumbnail: '🌐', 
    locked: false, 
    progress: 100, 
    category: 'Foundation',
    lessons: 24,
    students: '12.5K',
    rating: 4.9
  },
  { 
    id: 2, 
    title: 'Python for Termux Users', 
    duration: '8h 45m', 
    thumbnail: '🐍', 
    locked: false, 
    progress: 65, 
    category: 'Foundation',
    lessons: 18,
    students: '9.2K',
    rating: 4.8
  },
  { 
    id: 3, 
    title: 'Linux Command Line Mastery', 
    duration: '6h 20m', 
    thumbnail: '🐧', 
    locked: false, 
    progress: 30, 
    category: 'Foundation',
    lessons: 15,
    students: '15.1K',
    rating: 4.9
  },
  { 
    id: 4, 
    title: 'React.js & Tailwind CSS', 
    duration: '18h 15m', 
    thumbnail: '⚛️', 
    locked: true, 
    progress: 0, 
    category: 'Pro Builder',
    lessons: 32,
    students: '22.3K',
    rating: 4.9
  },
  { 
    id: 5, 
    title: 'SQL & DBMS Foundations', 
    duration: '10h 40m', 
    thumbnail: '🗄️', 
    locked: true, 
    progress: 0, 
    category: 'Pro Builder',
    lessons: 22,
    students: '8.7K',
    rating: 4.7
  },
  { 
    id: 6, 
    title: 'Git & Github Complete', 
    duration: '5h 55m', 
    thumbnail: '🔀', 
    locked: true, 
    progress: 0, 
    category: 'Pro Builder',
    lessons: 14,
    students: '18.9K',
    rating: 4.8
  },
  { 
    id: 7, 
    title: 'Bot Architecture (TG/Discord)', 
    duration: '14h 20m', 
    thumbnail: '🤖', 
    locked: true, 
    progress: 0, 
    category: 'Pro Builder',
    lessons: 28,
    students: '6.4K',
    rating: 4.9
  },
  { 
    id: 8, 
    title: 'Ethical Hacking Foundations', 
    duration: '22h 10m', 
    thumbnail: '🔓', 
    locked: true, 
    progress: 0, 
    category: 'Cyber Elite',
    lessons: 42,
    students: '11.2K',
    rating: 5.0
  },
  { 
    id: 9, 
    title: 'Network Analysis (Wireshark)', 
    duration: '11h 25m', 
    thumbnail: '📡', 
    locked: true, 
    progress: 0, 
    category: 'Cyber Elite',
    lessons: 24,
    students: '7.8K',
    rating: 4.8
  },
  { 
    id: 10, 
    title: 'Neural Networks Deep Dive', 
    duration: '16h 50m', 
    thumbnail: '🧠', 
    locked: true, 
    progress: 0, 
    category: 'AI Mastery',
    lessons: 35,
    students: '5.3K',
    rating: 4.9
  },
];

const attachments = [
  { name: 'Course_Syllabus.pdf', size: '2.4 MB', icon: FileText },
  { name: 'Python_Cheatsheet.pdf', size: '1.1 MB', icon: FileText },
  { name: 'Project_Starter.zip', size: '8.7 MB', icon: Paperclip },
  { name: 'Source_Code.zip', size: '15.2 MB', icon: Paperclip },
];

/* ═══════════════════════════════════════════════════════════════ */
/*                    PREMIUM STYLES                               */
/* ═══════════════════════════════════════════════════════════════ */
const getCategoryStyles = (category: string) => {
  switch(category) {
    case 'Foundation': 
      return { 
        gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
        bg: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/5',
        border: 'border-emerald-400/40',
        text: 'text-emerald-400',
        glow: 'shadow-[0_0_40px_rgba(16,185,129,0.3)]',
        button: 'from-emerald-500 to-teal-500'
      };
    case 'Pro Builder': 
      return { 
        gradient: 'from-blue-400 via-indigo-400 to-violet-400',
        bg: 'from-blue-500/20 via-indigo-500/10 to-violet-500/5',
        border: 'border-blue-400/40',
        text: 'text-blue-400',
        glow: 'shadow-[0_0_40px_rgba(59,130,246,0.3)]',
        button: 'from-blue-500 to-indigo-500'
      };
    case 'Cyber Elite': 
      return { 
        gradient: 'from-rose-400 via-pink-400 to-fuchsia-400',
        bg: 'from-rose-500/20 via-pink-500/10 to-fuchsia-500/5',
        border: 'border-rose-400/40',
        text: 'text-rose-400',
        glow: 'shadow-[0_0_40px_rgba(244,63,94,0.3)]',
        button: 'from-rose-500 to-pink-500'
      };
    case 'AI Mastery': 
      return { 
        gradient: 'from-amber-400 via-orange-400 to-red-400',
        bg: 'from-amber-500/20 via-orange-500/10 to-red-500/5',
        border: 'border-amber-400/40',
        text: 'text-amber-400',
        glow: 'shadow-[0_0_40px_rgba(251,191,36,0.3)]',
        button: 'from-amber-500 to-orange-500'
      };
    default: 
      return { 
        gradient: 'from-slate-400 via-gray-400 to-zinc-400',
        bg: 'from-slate-500/20 via-gray-500/10 to-zinc-500/5',
        border: 'border-slate-400/40',
        text: 'text-slate-400',
        glow: 'shadow-slate-500/20',
        button: 'from-slate-500 to-gray-500'
      };
  }
};

interface ChatMsg { role: 'user' | 'ai'; text: string; }

/* ═══════════════════════════════════════════════════════════════ */
/*                    MAIN COMPONENT                               */
/* ═══════════════════════════════════════════════════════════════ */
const EdTechSpace: React.FC = () => {
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'attachments' | 'certificate'>('overview');
  const [showAI, setShowAI] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { role: 'ai', text: "👋 Welcome! I'm your AI learning assistant. I can help explain concepts, guide you through exercises, or answer any questions about your courses." },
  ]);

  const activeCourse = originalModules.find((c) => c.id === activeCourseId);
  const activeStyles = activeCourse ? getCategoryStyles(activeCourse.category) : getCategoryStyles('Foundation');

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: 'ai', text: `🎯 Great question! Let me guide you through this concept. Based on your progress, I'd recommend reviewing Module 3 for a deeper understanding.` },
      ]);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col pb-16 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 font-sans min-h-screen">
      
      {/* PREMIUM HEADER */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-6 py-4 border-b border-slate-700/30 bg-slate-900/60 backdrop-blur-xl shrink-0 sticky top-0 z-30"
      >
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/30 relative overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <GraduationCap className="w-6 h-6 text-white relative z-10" />
          </motion.div>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-tight">E@Akhuwat Academy</h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Premium Learning Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-white">12</span>
            <span className="text-xs text-slate-400">day streak</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-sm font-bold text-white">JD</span>
          </div>
        </div>
      </motion.div>

      {/* CATALOG VIEW */}
      {activeCourseId === null ? (
        <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 scrollbar-hide relative">
          {/* Background Orbs */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-96 h-96 -top-20 -left-20 rounded-full bg-violet-500/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-80 h-80 top-1/3 right-0 rounded-full bg-fuchsia-500/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-64 h-64 bottom-20 left-1/4 rounded-full bg-cyan-500/20 blur-3xl"
          />
          
          <div className="max-w-7xl mx-auto space-y-10 relative z-10">
            
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-8 sm:p-12"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fuchsia-500/20 to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-bold uppercase tracking-wider mb-6"
                >
                  <Sparkles className="w-4 h-4" /> Premium Access Active
                </motion.div>
                
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Master the Future of
                  <span className="block bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                    Technology
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Unlock 200+ hours of premium content across Web Development, Cybersecurity, 
                  and Artificial Intelligence. Learn from industry experts.
                </p>

                <div className="flex flex-wrap gap-6 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <BookOpen className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">10</p>
                      <p className="text-xs text-slate-400">Courses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <Video className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">250+</p>
                      <p className="text-xs text-slate-400">Video Lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                      <Users className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">50K+</p>
                      <p className="text-xs text-slate-400">Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Course Grid */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-fuchsia-400" /> Your Learning Path
                </h3>
                <div className="flex gap-2">
                  {['All', 'Foundation', 'Pro', 'Cyber', 'AI'].map((filter, i) => (
                    <button 
                      key={filter}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        i === 0 
                          ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30' 
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {originalModules.map((course, index) => {
                  const aura = getCategoryStyles(course.category);
                  return (
                    <motion.button
                      key={course.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -8 }}
                      onClick={() => !course.locked && setActiveCourseId(course.id)}
                      className={`group relative flex flex-col text-left rounded-3xl border overflow-hidden ${
                        course.locked 
                          ? 'bg-slate-800/40 border-slate-700/50 opacity-70 cursor-not-allowed' 
                          : `bg-gradient-to-br from-slate-800/80 to-slate-900/80 ${aura.border} ${aura.glow}`
                      }`}
                    >
                      {/* Shimmer Overlay */}
                      {!course.locked && (
                        <motion.div
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 3 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent z-20 pointer-events-none"
                        />
                      )}

                      {/* Card Cover */}
                      <div className={`h-40 w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${course.locked ? 'from-slate-800 to-slate-900' : aura.bg}`}>
                        {/* Floating Emoji */}
                        <motion.span 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          className="text-6xl drop-shadow-2xl filter group-hover:scale-110 transition-transform duration-300"
                        >
                          {course.thumbnail}
                        </motion.span>

                        {/* Locked Overlay */}
                        {course.locked && (
                          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-10">
                            <motion.div 
                              whileHover={{ scale: 1.05 }}
                              className="bg-slate-900/90 px-5 py-3 rounded-2xl border border-slate-600 flex items-center gap-3 shadow-2xl"
                            >
                              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                                <LockKeyhole className="w-5 h-5 text-rose-400" />
                              </div>
                              <div>
                                <span className="text-sm font-bold text-white block">Premium Locked</span>
                                <span className="text-xs text-slate-400">Upgrade to unlock</span>
                              </div>
                            </motion.div>
                          </div>
                        )}

                        {/* Progress Badge */}
                        {course.progress > 0 && !course.locked && (
                          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                            <span className={`text-xs font-bold ${aura.text}`}>{course.progress}% Done</span>
                          </div>
                        )}

                        {/* Glow Effect */}
                        <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-gradient-to-r ${aura.gradient} opacity-40 blur-3xl`} />
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex-1 flex flex-col bg-slate-900/60 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${aura.border} ${aura.text} bg-gradient-to-r ${aura.bg}`}>
                            {course.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-bold text-slate-300">{course.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-fuchsia-300 transition-colors">
                          {course.title}
                        </h3>

                        <div className="flex items-center gap-4 mb-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5" /> {course.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {course.duration}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
                              <TrendingUp className="w-3.5 h-3.5" /> Progress
                            </span>
                            <span className={`font-bold ${aura.text}`}>{course.progress}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className={`h-full rounded-full bg-gradient-to-r ${aura.gradient} relative`}
                            >
                              <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 3 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              />
                            </motion.div>
                          </div>
                        </div>

                        {/* Action Button */}
                        {!course.locked && (
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className={`mt-4 w-full py-3 rounded-xl bg-gradient-to-r ${aura.button} text-white text-sm font-bold text-center shadow-lg`}
                          >
                            {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      ) : (

        /* ACTIVE COURSE VIEW */
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-96 h-96 -top-20 -left-20 rounded-full bg-violet-500/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-80 h-80 bottom-0 right-0 rounded-full bg-fuchsia-500/20 blur-3xl"
          />
          
          {/* Left Side: Video & Content */}
          <div className="flex-1 flex flex-col lg:border-r border-slate-700/30 min-w-0 overflow-y-auto relative z-10">
            
            {/* Premium Video Player */}
            <div className="w-full bg-black aspect-video relative group overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Animated Background */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className={`absolute w-[200%] h-[200%] bg-gradient-to-r ${activeStyles.gradient} opacity-10`}
                  style={{ borderRadius: '50%' }}
                />
                
                <div className="text-center relative z-10">
                  <motion.button 
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(59,130,246,0.3)',
                        '0 0 40px rgba(59,130,246,0.5)',
                        '0 0 20px rgba(59,130,246,0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-2xl"
                  >
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </motion.button>
                  <p className="text-lg font-bold text-white">Resume Learning</p>
                  <p className="text-sm text-slate-400 mt-1">Module 3: Advanced Concepts</p>
                </div>
              </div>

              {/* Player Controls */}
              <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-start justify-between z-20">
                <motion.button 
                  whileHover={{ x: -5 }}
                  onClick={() => setActiveCourseId(null)} 
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 text-white text-sm font-bold transition-colors border border-slate-700/50"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </motion.button>
                
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-slate-700/50 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">HD 1080p</span>
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-fuchsia-500/20 backdrop-blur-md border border-fuchsia-500/30 flex items-center gap-2">
                    <Award className="w-4 h-4 text-fuchsia-400" />
                    <span className="text-xs font-bold text-fuchsia-300">Premium</span>
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-800">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '35%' }}
                  className={`h-full bg-gradient-to-r ${activeStyles.gradient}`}
                />
              </div>
            </div>

            {/* Premium Tabs */}
            <div className="flex border-b border-slate-700/30 bg-slate-900/60 backdrop-blur-md px-2 sm:px-6 sticky top-0 z-20">
              {(['overview', 'attachments', 'certificate'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ y: -2 }}
                  className={`px-6 sm:px-8 py-5 text-sm font-bold uppercase tracking-wider transition-all relative ${
                    activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${activeStyles.gradient}`}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-10 flex-1 bg-slate-900/30">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-4xl space-y-8"
                  >
                    {/* Course Header */}
                    <div className="flex items-start gap-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeStyles.gradient} flex items-center justify-center text-4xl shadow-xl`}>
                        {activeCourse?.thumbnail}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${activeStyles.border} ${activeStyles.text}`}>
                            {activeCourse?.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Users className="w-3.5 h-3.5" /> {activeCourse?.students} students
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                          {activeCourse?.title}
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                          Master the fundamentals and advanced concepts through hands-on projects. 
                          This comprehensive course includes {activeCourse?.lessons} video lessons, 
                          practical assignments, and a verified completion certificate.
                        </p>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { icon: Video, label: 'Lessons', value: `${activeCourse?.lessons}+` },
                        { icon: Clock, label: 'Duration', value: activeCourse?.duration },
                        { icon: Star, label: 'Rating', value: activeCourse?.rating },
                        { icon: Trophy, label: 'Certificate', value: 'Yes' },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm"
                        >
                          <stat.icon className={`w-5 h-5 mb-2 ${activeStyles.text}`} />
                          <p className="text-xl font-bold text-white">{stat.value}</p>
                          <p className="text-xs text-slate-400">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-slate-700/50">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white">
                        EA
                      </div>
                      <div>
                        <p className="text-base font-bold text-white">E@Akhuwat Academy</p>
                        <p className="text-sm text-fuchsia-400">Official Instructor</p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm text-slate-400">Verified</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'attachments' && (
                  <motion.div
                    key="attachments"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-2xl space-y-4"
                  >
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Paperclip className="w-5 h-5 text-fuchsia-400" /> Course Resources
                    </h3>
                    {attachments.map((file, i) => (
                      <motion.div
                        key={file.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center justify-between p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:border-fuchsia-500/50 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeStyles.bg} border ${activeStyles.border} flex items-center justify-center`}>
                            <file.icon className={`w-5 h-5 ${activeStyles.text}`} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors">{file.name}</p>
                            <p className="text-xs text-slate-400">{file.size}</p>
                          </div>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 rounded-xl bg-slate-700 hover:bg-gradient-to-r ${activeStyles.button} text-slate-300 hover:text-white flex items-center justify-center transition-all`}
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'certificate' && (
                  <motion.div
                    key="certificate"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-xl mx-auto"
                  >
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${activeStyles.gradient} rounded-3xl opacity-30 blur-xl`} />
                      
                      <div className="relative rounded-3xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl p-8 overflow-hidden">
                        {/* Certificate Content */}
                        <div className="text-center">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className={`w-24 h-24 rounded-full bg-gradient-to-br ${activeStyles.gradient} flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                          >
                            <Trophy className="w-10 h-10 text-white" />
                          </motion.div>
                          
                          <h3 className="text-2xl font-extrabold text-white mb-2">Certificate of Completion</h3>
                          <p className="text-slate-400 mb-8">
                            Complete all lessons and assignments to unlock your verified credential.
                          </p>

                          {/* Progress Circle */}
                          <div className="relative w-40 h-40 mx-auto mb-8">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                              <motion.circle 
                                cx="50" cy="50" r="45" fill="none" 
                                stroke="url(#gradient)" strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                                animate={{ strokeDashoffset: `${2 * Math.PI * 45 * (1 - (activeCourse?.progress || 0) / 100)}` }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                              />
                              <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#a855f7" />
                                  <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-3xl font-bold text-white">{activeCourse?.progress}%</span>
                            </div>
                          </div>

                          <motion.button 
                            whileHover={activeCourse?.progress === 100 ? { scale: 1.05 } : {}}
                            whileTap={activeCourse?.progress === 100 ? { scale: 0.95 } : {}}
                            disabled={activeCourse?.progress !== 100}
                            className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                              activeCourse?.progress === 100 
                                ? `bg-gradient-to-r ${activeStyles.button} text-white shadow-xl` 
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                            }`}
                          >
                            {activeCourse?.progress === 100 ? (
                              <span className="flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> Download Certificate
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                <Lock className="w-4 h-4" /> Complete Course to Unlock
                              </span>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Lesson List */}
          <div className="w-full lg:w-[400px] bg-slate-900/60 backdrop-blur-xl flex flex-col border-t lg:border-t-0 lg:border-l border-slate-700/30">
            <div className="p-5 border-b border-slate-700/30 bg-slate-800/60">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-fuchsia-400" /> Course Content
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                {activeCourse?.lessons} lessons • {activeCourse?.duration} total
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {/* Section Header */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 mb-4">
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Section 1: Introduction
                </p>
                <p className="text-xs text-slate-400 mt-1">5 lessons • 45 mins</p>
              </div>

              {/* Lesson Items */}
              {[1, 2, 3, 4, 5].map((lesson, i) => (
                <motion.button
                  key={lesson}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 5, backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    i === 0 
                      ? `bg-gradient-to-r ${activeStyles.bg} border ${activeStyles.border}` 
                      : 'bg-slate-800/40 border border-transparent hover:border-slate-700/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    i === 0 ? `bg-gradient-to-r ${activeStyles.button}` : 'bg-slate-700'
                  }`}>
                    {i === 0 ? <Play className="w-4 h-4 text-white ml-0.5" /> : 
                     i < 3 ? <Check className="w-4 h-4 text-emerald-400" /> : 
                     <Circle className="w-4 h-4 text-slate-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${i === 0 ? 'text-white' : 'text-slate-300'}`}>
                      {i + 1}. {i === 0 ? 'Course Introduction' : i === 1 ? 'Setting Up Environment' : i === 2 ? 'Basic Concepts' : i === 3 ? 'Advanced Topics' : 'Project Walkthrough'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">12:30</p>
                  </div>
                  {i === 0 && (
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${activeStyles.text} bg-slate-900/50`}>
                      NOW
                    </span>
                  )}
                </motion.button>
              ))}

              {/* More Sections */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 mt-4 opacity-60">
                <p className="text-sm font-bold text-slate-400 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Section 2: Advanced Concepts
                </p>
                <p className="text-xs text-slate-500 mt-1">8 lessons • 1h 20m</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING AI CHAT BUTTON */}
      <AnimatePresence>
        {!showAI && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAI(true)}
            className="fixed bottom-24 right-4 sm:right-8 w-16 h-16 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 flex items-center justify-center z-40 shadow-2xl shadow-fuchsia-500/40 border-2 border-white/10"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bot className="w-7 h-7 text-white" />
            </motion.div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Chat Panel */}
      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-[420px] h-[500px] z-50 bg-slate-900 border border-slate-700/50 flex flex-col rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10" />
            
            {/* AI Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/30 bg-slate-800/60 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-white">AI Learning Assistant</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAI(false)} 
                className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-900/50 scrollbar-hide">
              {chatMessages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-5 py-3.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-2xl rounded-tr-sm shadow-lg'
                      : 'bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-sm text-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700/30 bg-slate-800/60 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-700/50 rounded-2xl px-4 py-3 focus-within:border-fuchsia-500/50 transition-colors">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                  placeholder="Ask anything about the course..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={sendChat}
                  disabled={!chatInput.trim()} 
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-lg transition-all"
                >
                  <Send className="w-4 h-4 text-white ml-0.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EdTechSpace;
