import React, { useState, useEffect } from 'react';
import '../components/Navbar.css'; // Opsional, sesuaikan jika ada CSS khusus

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Ganti URL ini jika base URL backend kamu berbeda (misal port 5000 atau 8080)
        const response = await fetch('http://localhost:5000/api/leaderboard');
        const result = await response.json();
        
        if (result.success) {
          setLeaders(result.data);
        }
      } catch (error) {
        console.error('Gagal mengambil data leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white p-10 pt-28 font-urbanist">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10">
          SustainaTrack <span className="text-green-500">Leaderboard</span>
        </h1>
        
        {loading ? (
          <p className="text-center text-green-200 text-xl">Memuat data pahlawan bumi...</p>
        ) : (
          <div className="bg-black border border-green-500/30 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#111] border-b border-green-500/30">
                  <th className="p-5 text-green-500 font-semibold text-lg">Peringkat</th>
                  <th className="p-5 text-green-500 font-semibold text-lg">Nama Pengguna</th>
                  <th className="p-5 text-green-500 font-semibold text-lg text-right">Emisi Karbon</th>
                </tr>
              </thead>
              <tbody>
                {leaders.length > 0 ? (
                  leaders.map((item, index) => (
                    <tr 
                      key={item._id} 
                      className="border-b border-gray-800 hover:bg-green-900/20 transition-colors"
                    >
                      <td className="p-5 text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </td>
                      <td className="p-5 font-medium text-lg">
                        {/* Logika untuk menampilkan nama jika userId ada, jika null/guest tampilkan Anonymous */}
                        {item.userId ? (item.userId.username || item.userId.name) : 'Pengguna Guest'}
                      </td>
                      <td className="p-5 text-right font-bold text-green-400 text-lg">
                        {item.total} kg
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-10 text-gray-400">
                      Belum ada data jejak karbon yang tersimpan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;