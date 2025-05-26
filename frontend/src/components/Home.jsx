import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/home.css';

const Home = () => {
  const [hewanData, setHewanData] = useState([]);
  const [pemilikData, setPemilikData] = useState([]);
  const [showHewanForm, setShowHewanForm] = useState(false);
  const [showPemilikForm, setShowPemilikForm] = useState(false);
  const [editingHewan, setEditingHewan] = useState(null);
  const [editingPemilik, setEditingPemilik] = useState(null);
  const [hewanForm, setHewanForm] = useState({
    nama_hewan: '',
    bobot_hewan: '',
    keterangan_khusus: '',
    ras: '',
    gambar: '',
    pemilikId: ''
  });
  const [pemilikForm, setPemilikForm] = useState({
    nama_pemilik: '',
    no_hp: '',
    alamat: '',
    email: ''
  });

  // Fetch data saat komponen dimount
  useEffect(() => {
    fetchHewanData();
    fetchPemilikData();
  }, []);

  const fetchHewanData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/daftarhewan', {
        withCredentials: true
      });
      setHewanData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching hewan data:', error);
    }
  };

  const fetchPemilikData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/daftarpemilik', {
        withCredentials: true
      });
      setPemilikData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching pemilik data:', error);
    }
  };

  // Handle Hewan Form
  const handleHewanInputChange = (e) => {
    setHewanForm({
      ...hewanForm,
      [e.target.name]: e.target.value
    });
  };

  const handleHewanSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingHewan) {
        await axios.put(`http://localhost:5000/daftarhewan/${editingHewan.id}`, hewanForm, {
          withCredentials: true
        });
      } else {
        await axios.post('http://localhost:5000/daftarhewan', hewanForm, {
          withCredentials: true
        });
      }
      setHewanForm({
        nama_hewan: '',
        bobot_hewan: '',
        keterangan_khusus: '',
        ras: '',
        gambar: '',
        pemilikId: ''
      });
      setShowHewanForm(false);
      setEditingHewan(null);
      fetchHewanData();
    } catch (error) {
      console.error('Error saving hewan:', error);
      alert('Error menyimpan data hewan');
    }
  };

  const handleEditHewan = (hewan) => {
    setEditingHewan(hewan);
    setHewanForm({
      nama_hewan: hewan.nama_hewan,
      bobot_hewan: hewan.bobot_hewan,
      keterangan_khusus: hewan.keterangan_khusus,
      ras: hewan.ras,
      gambar: hewan.gambar,
      pemilikId: hewan.pemilikId
    });
    setShowHewanForm(true);
  };

  const handleDeleteHewan = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data hewan ini?')) {
      try {
        await axios.delete(`http://localhost:5000/daftarhewan/${id}`, {
          withCredentials: true
        });
        fetchHewanData();
      } catch (error) {
        console.error('Error deleting hewan:', error);
        alert('Error menghapus data hewan');
      }
    }
  };

  // Handle Pemilik Form
  const handlePemilikInputChange = (e) => {
    setPemilikForm({
      ...pemilikForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePemilikSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPemilik) {
        await axios.put(`http://localhost:5000/daftarpemilik/${editingPemilik.id}`, pemilikForm, {
          withCredentials: true
        });
      } else {
        await axios.post('http://localhost:5000/daftarpemilik', pemilikForm, {
          withCredentials: true
        });
      }
      setPemilikForm({
        nama_pemilik: '',
        no_hp: '',
        alamat: '',
        email: ''
      });
      setShowPemilikForm(false);
      setEditingPemilik(null);
      fetchPemilikData();
    } catch (error) {
      console.error('Error saving pemilik:', error);
      alert('Error menyimpan data pemilik');
    }
  };

  const handleEditPemilik = (pemilik) => {
    setEditingPemilik(pemilik);
    setPemilikForm({
      nama_pemilik: pemilik.nama_pemilik,
      no_hp: pemilik.no_hp,
      alamat: pemilik.alamat,
      email: pemilik.email
    });
    setShowPemilikForm(true);
  };

  const handleDeletePemilik = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data pemilik ini?')) {
      try {
        await axios.delete(`http://localhost:5000/daftarpemilik/${id}`, {
          withCredentials: true
        });
        fetchPemilikData();
      } catch (error) {
        console.error('Error deleting pemilik:', error);
        alert('Error menghapus data pemilik');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout', {
        withCredentials: true
      });
      // Redirect ke login atau refresh page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logout:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Penitipan Hewan Corner.</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Keluar
        </button>
      </div>

      <div className="content">
        {/* Section Data Hewan */}
        <div className="data-section">
          <button 
            className="add-btn"
            onClick={() => {
              setShowHewanForm(true);
              setEditingHewan(null);
              setHewanForm({
                nama_hewan: '',
                bobot_hewan: '',
                keterangan_khusus: '',
                ras: '',
                gambar: '',
                pemilikId: ''
              });
            }}
          >
            Tambah Data Hewan
          </button>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nama Hewan</th>
                  <th>Bobot</th>
                  <th>Keterangan</th>
                  <th>Ras</th>
                  <th>Gambar</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {hewanData.map((hewan) => (
                  <tr key={hewan.id}>
                    <td>{hewan.id}</td>
                    <td>{hewan.nama_hewan}</td>
                    <td>{hewan.bobot_hewan}</td>
                    <td>{hewan.keterangan_khusus}</td>
                    <td>{hewan.ras}</td>
                    <td>{hewan.gambar}</td>
                    <td>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditHewan(hewan)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteHewan(hewan.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section Data Pemilik */}
        <div className="data-section">
          <button 
            className="add-btn"
            onClick={() => {
              setShowPemilikForm(true);
              setEditingPemilik(null);
              setPemilikForm({
                nama_pemilik: '',
                no_hp: '',
                alamat: '',
                email: ''
              });
            }}
          >
            Tambah Data Pemilik
          </button>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nama Pemilik</th>
                  <th>No Hp</th>
                  <th>Alamat</th>
                  <th>Email</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pemilikData.map((pemilik) => (
                  <tr key={pemilik.id}>
                    <td>{pemilik.id}</td>
                    <td>{pemilik.nama_pemilik}</td>
                    <td>{pemilik.no_hp}</td>
                    <td>{pemilik.alamat}</td>
                    <td>{pemilik.email}</td>
                    <td>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditPemilik(pemilik)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeletePemilik(pemilik.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form Hewan */}
      {showHewanForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingHewan ? 'Edit Data Hewan' : 'Tambah Data Hewan'}</h3>
            <form onSubmit={handleHewanSubmit}>
              <input
                type="text"
                name="nama_hewan"
                placeholder="Nama Hewan"
                value={hewanForm.nama_hewan}
                onChange={handleHewanInputChange}
                required
              />
              <input
                type="number"
                name="bobot_hewan"
                placeholder="Bobot Hewan"
                value={hewanForm.bobot_hewan}
                onChange={handleHewanInputChange}
                required
              />
              <textarea
                name="keterangan_khusus"
                placeholder="Keterangan Khusus"
                value={hewanForm.keterangan_khusus}
                onChange={handleHewanInputChange}
              />
              <input
                type="text"
                name="ras"
                placeholder="Ras"
                value={hewanForm.ras}
                onChange={handleHewanInputChange}
              />
              <input
                type="text"
                name="gambar"
                placeholder="URL Gambar"
                value={hewanForm.gambar}
                onChange={handleHewanInputChange}
              />
              <select
                name="pemilikId"
                value={hewanForm.pemilikId}
                onChange={handleHewanInputChange}
                required
              >
                <option value="">Pilih Pemilik</option>
                {pemilikData.map((pemilik) => (
                  <option key={pemilik.id} value={pemilik.id}>
                    {pemilik.nama_pemilik}
                  </option>
                ))}
              </select>
              <div className="modal-buttons">
                <button type="submit">
                  {editingHewan ? 'Update' : 'Simpan'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowHewanForm(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Form Pemilik */}
      {showPemilikForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingPemilik ? 'Edit Data Pemilik' : 'Tambah Data Pemilik'}</h3>
            <form onSubmit={handlePemilikSubmit}>
              <input
                type="text"
                name="nama_pemilik"
                placeholder="Nama Pemilik"
                value={pemilikForm.nama_pemilik}
                onChange={handlePemilikInputChange}
                required
              />
              <input
                type="text"
                name="no_hp"
                placeholder="No HP"
                value={pemilikForm.no_hp}
                onChange={handlePemilikInputChange}
                required
              />
              <textarea
                name="alamat"
                placeholder="Alamat"
                value={pemilikForm.alamat}
                onChange={handlePemilikInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={pemilikForm.email}
                onChange={handlePemilikInputChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">
                  {editingPemilik ? 'Update' : 'Simpan'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowPemilikForm(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;