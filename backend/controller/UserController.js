import User from "../models/UserModel.js";
import bcrypt from "bcrypt"; // buat ngehash password
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const Register = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt();

  // hash Password
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const data = await User.create({
      username: username,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "User gagal dibuat",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    // JWT Sign
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } }
    );

    // Set Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Response
    return res.status(200).json({
      accessToken,
      message: "Login berhasil",
    });
  } catch (error) {
    res.status(500).json({
      message: "Login gagal",
      error: error.message,
    });
  }
};

// refresh access token pakai refresh token
export const refreshToken = async (req, res) => {
  try {
    // cookie validation
    const refreshToken = req.cookies.refreshToken; // Sesuaikan nama cookie
    if (!refreshToken) return res.sendStatus(401); // Unauthorized

    // user validation
    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!user) return res.sendStatus(403);

    // Verify JWT
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const accessToken = jwt.sign(
        { id: user.id, username: user.usernmae },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi Kesalahan",
      error: error.message,
    });
  }
};

// Logout user: hapus refresh token di DB dan cookie
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // Sesuaikan nama cookie
    if (!refreshToken) return res.sendStatus(204); // No Content, berarti user sudah logout

    // User Validation
    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!user) return res.sendStatus(204);

    // Mengupdate refresh token menjadi null
    await User.update({ refresh_token: null }, { where: { id: user.id } });

    // Menghapus refresh cookie
    res.clearCookie("refreshToken", {  // Sesuaikan nama cookie
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    
    // Response
    res.status(200).json({
      message: "Logout Berhasil",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi Kesalahan pada server",
      error: error.message,
    });
  }
};
