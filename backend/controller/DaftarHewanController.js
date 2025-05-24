import DaftarHewan from "../models/DaftarHewanModel.js";

// Create
export const createHewan = async (req, res) => {
  const {
    nama_hewan,
    bobot_hewan,
    keterangan_khusus,
    ras,
    gambar,
  } = req.body;

  try {
    const hewan = await DaftarHewan.create({
      nama_hewan,
      bobot_hewan,
      keterangan_khusus,
      ras,
      gambar,
    });

    res.status(201).json({
      message: "Hewan berhasil ditambahkan",
      data: hewan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read All
export const getHewan = async (req, res) => {
  try {
    const hewan = await DaftarHewan.findAll();
    res.status(200).json({
      message: "Data hewan berhasil diambil",
      data: hewan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read by ID
export const getHewanById = async (req, res) => {
  const { id } = req.params;
  try {
    const hewan = await DaftarHewan.findByPk(id);
    if (!hewan) {
      return res.status(404).json({ message: "Hewan tidak ditemukan" });
    }
    res.status(200).json({
      message: "Data hewan berhasil diambil",
      data: hewan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updateHewan = async (req, res) => {
  const { id } = req.params;
  const {
    nama_hewan,
    bobot_hewan,
    keterangan_khusus,
    ras,
    gambar,
  } = req.body;

  try {
    const updated = await DaftarHewan.update(
      {
        nama_hewan,
        bobot_hewan,
        keterangan_khusus,
        ras,
        gambar,
      },
      {
        where: { id },
      }
    );

    res.status(200).json({
      message: "Data hewan berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
export const deleteHewan = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await DaftarHewan.destroy({
      where: { id },
    });

    res.status(200).json({
      message: "Data hewan berhasil dihapus",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
