import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingDown } from 'lucide-react';
import '../components/Navbar/Navbar.css';
import { apiUrl } from '../config/api';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(apiUrl('/api/leaderboard'));

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
        console.error('Gagal mengambil data leaderboard:', error);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

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
            <TrendingDown className="text-green-500" size={40} />
            <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Carbon Footprint
            </h1>
            <TrendingDown className="text-green-500" size={40} />
          </div>
          <p className="text-gray-400 text-lg">Ranking pengguna dengan emisi karbon terendah</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-spin"></div>
              <div className="absolute inset-2 bg-[#111] rounded-full"></div>
            </div>
            <p className="ml-4 text-green-400 text-xl">Memuat data pahlawan bumi...</p>
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
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors"></div>
                      <div className="relative z-10">
                        <div className="text-6xl font-black mb-4 text-center">{medals[index]}</div>
                        <h3 className="text-2xl font-bold text-white text-center mb-2">
                          {item.userId ? item.userId.username || item.userId.name : 'Guest'}
                        </h3>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Leaf className="text-green-400" size={20} />
                          <p className="text-3xl font-black text-green-400">{item.total} kg</p>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.max((item.total / leaders[0].total) * 100, 10)}%`,
                            }}
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
                    className="leaderboard-item group relative overflow-hidden bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-green-500/20 rounded-xl p-4 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-300"
                    whileHover={{ x: 10 }}
                  >
                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-green-500 to-transparent group-hover:from-green-400 transition-colors"></div>
                    <div className="flex items-center gap-6">
                      {/* Rank */}
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-green-500/10 border border-green-500/30 font-bold text-lg text-green-400">
                        {index + 1}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-white truncate">
                          {item.userId
                            ? item.userId.username || item.userId.name
                            : 'Pengguna Guest'}
                        </p>
                        <p className="text-sm text-gray-400">Carbon Footprint</p>
                      </div>

                      {/* Score */}
                      <div className="flex-shrink-0 flex items-center gap-2">
                        <Leaf className="text-green-400" size={20} />
                        <span className="text-2xl font-black text-green-400 min-w-[80px] text-right">
                          {item.total}
                        </span>
                        <span className="text-sm text-gray-400">kg</span>
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
                <Leaf className="mx-auto text-gray-500 mb-4" size={48} />
                <p className="text-gray-400 text-lg">Belum ada data jejak karbon yang tersimpan.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
