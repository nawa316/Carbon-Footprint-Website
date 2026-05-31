import Footprint from '../models/Footprint.js'; // Sesuaikan ekstensi file jika perlu

export const getLeaderboard = async (req, res) => {
  try {
    // Mencari data, populate data user, urutkan berdasarkan 'total' terkecil, ambil top 10
    const leaderboardData = await Footprint.find()
      .populate('userId', 'username name') // Mengambil field username & name dari collection User
      .sort({ total: 1 }) // 1 berarti Ascending (terkecil ke terbesar)
      .limit(10);
      
    res.status(200).json({ success: true, data: leaderboardData });
  } catch (error) {
    console.error("Error saat mengambil leaderboard:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
};