import DaftarHewan from "../models/DaftarHewanModel.js";

// Get all hewan by pemilikId
export const getHewanByPemilik = async (req, res) => {
  const { id } = req.params; // id = pemilikId
  try {
    const hewan = await DaftarHewan.findAll({
      where: { pemilikId: id }
    });

    if (!hewan || hewan.length === 0) {
      return res.status(404).json({ message: "Tidak ada hewan untuk pemilik ini" });
    }

    res.status(200).json({
      message: "Data hewan untuk pemilik berhasil diambil",
      data: hewan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create
export const createHewan = async (req, res) => {
  const { nama_hewan, bobot_hewan, keterangan_khusus, ras, gambar, pemilikId } = req.body;
  const userId = req.user.id;

  if (!nama_hewan || !bobot_hewan || !pemilikId) {
    return res.status(400).json({ message: "Nama hewan, bobot, dan pemilikId wajib diisi" });
  }

  try {
    const hewan = await DaftarHewan.create({
      nama_hewan,
      bobot_hewan,
      keterangan_khusus,
      ras,
      gambar,
      pemilikId,
      userId: req.user.id, // admin pencatat
    });

    res.status(201).json({ message: "Hewan berhasil ditambahkan", data: hewan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read All - milik user login
export const getHewan = async (req, res) => {
  const userId = req.user.id;

  try {
    const hewan = await DaftarHewan.findAll({ where: { userId } });
    res.status(200).json({
      message: "Data hewan berhasil diambil",
      data: hewan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read by ID - hanya milik user login
export const getHewanById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const hewan = await DaftarHewan.findOne({ where: { id, userId } });
    if (!hewan) {
      return res.status(404).json({ message: "Hewan tidak ditemukan atau bukan milik Anda" });
    }

    res.status(200).json({
      message: "Data hewan berhasil diambil",
      data: hewan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - hanya jika milik user
export const updateHewan = async (req, res) => {
  const { id } = req.params;
  const { nama_hewan, bobot_hewan, keterangan_khusus, ras, gambar } = req.body;
  const userId = req.user.id;

  try {
    const hewan = await DaftarHewan.findOne({ where: { id, userId } });
    if (!hewan) {
      return res.status(404).json({ message: "Hewan tidak ditemukan atau bukan milik Anda" });
    }

    // Partial update
    if (nama_hewan !== undefined) hewan.nama_hewan = nama_hewan;
    if (bobot_hewan !== undefined) hewan.bobot_hewan = bobot_hewan;
    if (keterangan_khusus !== undefined) hewan.keterangan_khusus = keterangan_khusus;
    if (ras !== undefined) hewan.ras = ras;
    if (gambar !== undefined) hewan.gambar = gambar;

    await hewan.save();

    res.status(200).json({
      message: "Data hewan berhasil diperbarui",
      data: hewan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete - hanya jika milik user
export const deleteHewan = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const hewan = await DaftarHewan.findOne({ where: { id, userId } });
    if (!hewan) {
      return res.status(404).json({ message: "Hewan tidak ditemukan atau bukan milik Anda" });
    }

    await hewan.destroy();

    res.status(200).json({
      message: "Data hewan berhasil dihapus",
      data: hewan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
