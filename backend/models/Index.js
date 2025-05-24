import db from "../config/Database.js";
import User from './UserModel.js';
import DaftarHewan from "./DaftarHewanModel.js";
import DaftarPemilik from "./DaftarPemilikModel.js";

(async () => {
  try {
    await db.authenticate();
    console.log("Koneksi database berhasil!");

    await db.sync({ alter: true });
    console.log("Semua tabel berhasil disinkronisasi.");
  } catch (err) {
    console.error("Gagal konek DB:", err);
  }
})();

export { User, DaftarHewan, DaftarPemilik };
