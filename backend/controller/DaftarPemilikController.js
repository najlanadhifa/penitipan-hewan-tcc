import DaftarPemilik from "../models/DaftarPemilikModel.js";

// Create
export const createPemilik = async (req, res) => {
  const { nama_pemilik, no_hp, alamat, email } = req.body;
  const userId = req.user.id;

  if (!nama_pemilik || !no_hp || !alamat || !email) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    const pemilik = await DaftarPemilik.create({
      nama_pemilik,
      no_hp,
      alamat,
      email,
      userId,
    });

    res.status(201).json({ message: "Pemilik berhasil ditambahkan", data: pemilik });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Read All
export const getPemilik = async (req, res) => {
  try {
    const pemilik = await DaftarPemilik.findAll();
    res.status(200).json({
      message: "Data pemilik berhasil diambil",
      data: pemilik,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read by ID
export const getPemilikById = async (req, res) => {
  const { id } = req.params;
  try {
    const pemilik = await DaftarPemilik.findByPk(id);
    if (!pemilik) {
      return res.status(404).json({ message: "Pemilik tidak ditemukan" });
    }
    res.status(200).json({
      message: "Data pemilik berhasil diambil",
      data: pemilik,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updatePemilik = async (req, res) => {
  const { id } = req.params;
  const { nama_pemilik, no_hp, alamat, email } = req.body;

  // Validasi field wajib diisi
  if (!nama_pemilik || !no_hp || !alamat || !email) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    const pemilik = await DaftarPemilik.findByPk(id);
    if (!pemilik) {
      return res.status(404).json({ message: "Pemilik tidak ditemukan" });
    }

    await pemilik.update({ nama_pemilik, no_hp, alamat, email });

    res.status(200).json({
      message: "Data pemilik berhasil diperbarui",
      data: pemilik,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
export const deletePemilik = async (req, res) => {
  const { id } = req.params;

  try {
    const pemilik = await DaftarPemilik.findByPk(id);
    if (!pemilik) {
      return res.status(404).json({ message: "Pemilik tidak ditemukan" });
    }

    await pemilik.destroy();

    res.status(200).json({
      message: "Data pemilik berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
