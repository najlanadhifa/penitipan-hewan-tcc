import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const DaftarHewan = db.define("daftar_hewan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_hewan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bobot_hewan: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  keterangan_khusus: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ras: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: true, // nama file atau URL gambar
  },
}, {
  freezeTableName: true,
  timestamps: true,
  createdAt: "Tanggal_dibuat",
  updatedAt: "Tanggal_diperbarui",
});

export default DaftarHewan;