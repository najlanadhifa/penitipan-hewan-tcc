import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import '../css/detail.css';

const EditPemilik = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_pemilik: '',
    no_hp: '',
    alamat: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPemilik = async () => {
      try {
        const res = await axiosInstance.get(`/daftarpemilik/${id}`);
        setFormData(res.data.data);
      } catch (error) {
        console.error('Error fetching pemilik:', error);
        alert('Gagal mengambil data pemilik');
        navigate('/home');
      }
    };
    fetchPemilik();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone);
  };

  const isFormValid = () => {
    return (
      formData.nama_pemilik.trim() &&
      formData.no_hp.trim() &&
      formData.alamat.trim() &&
      formData.email.trim() &&
      validateEmail(formData.email) &&
      validatePhone(formData.no_hp)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`/daftarpemilik/${id}`, formData);
      alert('Data pemilik berhasil diperbarui!');
      navigate('/home');
    } catch (error) {
      console.error('Error updating pemilik:', error);
      alert('Gagal update data pemilik');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div className="data-container">
      <div className="data-header">
        <h1>Edit Data Pemilik</h1>
        <button className="back-btn" onClick={handleCancel}>
          Kembali
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="data-form">
          <div className="form-group">
            <label htmlFor="nama_pemilik">Nama Pemilik *</label>
            <input
              type="text"
              id="nama_pemilik"
              name="nama_pemilik"
              value={formData.nama_pemilik}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap pemilik"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="no_hp">Nomor HP *</label>
            <input
              type="tel"
              id="no_hp"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
              placeholder="Masukkan nomor HP (contoh: 081234567890)"
              required
            />
            {formData.no_hp && !validatePhone(formData.no_hp) && (
              <span className="error-text">Format nomor HP tidak valid</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan alamat email"
              required
            />
            {formData.email && !validateEmail(formData.email) && (
              <span className="error-text">Format email tidak valid</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="alamat">Alamat Lengkap *</label>
            <textarea
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap pemilik"
              rows="4"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading || !isFormValid()}
            >
              {loading ? 'Menyimpan...' : 'Perbarui Data'}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleCancel}
              disabled={loading}
            >
              Batal
            </button>
          </div>
        </form>

        <div className="form-info">
          <h3>Informasi:</h3>
          <ul>
            <li>Semua field yang bertanda (*) wajib diisi</li>
            <li>Pastikan email menggunakan format yang benar</li>
            <li>Nomor HP harus berupa angka yang valid</li>
            <li>Alamat harus diisi dengan lengkap</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditPemilik;