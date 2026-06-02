import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';
import '../components/Navbar/Navbar.css';
import { apiUrl } from '../config/api';
import './Leaderboard.css';

const QuizLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizLeaderboard = async () => {
      try {
        const response = await fetch(apiUrl('/api/leaderboard/quiz'));

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setLeaders(result.data);
        } else {
          setLeaders([]);
        }
      } catch (error) {
        console.error('Gagal mengambil data quiz leaderboard:', error);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizLeaderboard();
  }, []);

  const maxPoints = leaders.length > 0 ? Math.max(...leaders.map((l) => l.points || 0)) : 100;

  return (
    <div className="leaderboard-page min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] text-white pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="text-purple-500" size={40} />
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Quiz Champions
            </h1>
            <TrendingUp className="text-purple-500" size={40} />
          </div>
          <p className="text-gray-400 text-lg">Ranking pengguna dengan poin quiz tertinggi</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-spin"></div>
              <div className="absolute inset-2 bg-[#111] rounded-full"></div>
            </div>
            <p className="ml-4 text-purple-400 text-xl">Memuat data quiz champions...</p>
          </div>
        ) : (
          <motion.div
            className="leaderboard-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {/* Top 3 Cards */}
            {leaders.slice(0, 3).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {leaders.slice(0, 3).map((item, index) => {
                  const medalColors = [
                    'border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 hover:border-yellow-500 hover:shadow-[0_0_40px_rgba(234,179,8,0.2)]',
                    'border-gray-400/50 bg-gradient-to-br from-gray-400/10 to-gray-500/5 hover:border-gray-400 hover:shadow-[0_0_40px_rgba(156,163,175,0.2)]',
                    'border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-orange-600/5 hover:border-orange-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]',
                  ];
                  const medals = ['🥇', '🥈', '🥉'];

                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`top-card group relative overflow-hidden rounded-2xl p-8 border-2 transition-all duration-300 ${medalColors[index]}`}
                      whileHover={{ scale: 1.05, y: -10 }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
                      <div className="relative z-10">
                        <div className="text-6xl font-black mb-4 text-center">{medals[index]}</div>
                        <h3 className="text-2xl font-bold text-white text-center mb-2">
                          {item.username || item.name || 'Quiz Master'}
                        </h3>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Zap className="text-purple-400" size={20} />
                          <p className="text-3xl font-black text-purple-400">{item.points || 0}</p>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-pink-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max((item.points / maxPoints) * 100, 10)}%` }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Rest of Leaderboard */}
            {leaders.length > 0 ? (
              <div className="leaderboard-list space-y-3">
                {leaders.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="leaderboard-item group relative overflow-hidden bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300"
                    whileHover={{ x: 10 }}
                  >
                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-500 to-transparent group-hover:from-purple-400 transition-colors"></div>
                    <div className="flex items-center gap-6">
                      {/* Rank */}
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/30 font-bold text-lg text-purple-400">
                        {index + 1}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-white truncate">
                          {item.username || item.name || 'Quiz Master'}
                        </p>
                        <p className="text-sm text-gray-400">Quiz Points</p>
                      </div>

                      {/* Score and Progress */}
                      <div className="flex-shrink-0 flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Zap className="text-purple-400" size={18} />
                          <span className="text-2xl font-black text-purple-400">
                            {item.points || 0}
                          </span>
                          <span className="text-sm text-gray-400">pts</span>
                        </div>
                        <div className="w-32 bg-gray-700/50 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-pink-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(item.points / maxPoints) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <Zap className="mx-auto text-gray-500 mb-4" size={48} />
                <p className="text-gray-400 text-lg">Belum ada data poin quiz yang tersimpan.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizLeaderboard;
