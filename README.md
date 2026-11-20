<div align="center">

# 📐 Geometry Explorer

**Interactive 3D Geometry Laboratory and Spatial Inspection Tool**

[![Live Demo](https://shields.io)](https://3d-geometrys.vercel.app/)
[![License: MIT](https://shields.io)](https://opensource.org)
[![PRs Welcome](https://shields.io)](http://makeapullrequest.com)

[Live App](https://3d-geometrys.vercel.app/) • [Fitur Utama](#-fitur-utama) • [Arsitektur & Tech Stack](#-arsitektur--tech-stack) • [Instalasi Lokal](#-instalasi-lokal) • [Panduan Penggunaan](#-panduan-penggunaan)

</div>

---

## 📖 Tentang Proyek

**Geometry Explorer** adalah aplikasi web interaktif yang dirancang sebagai laboratorium geometri 3D dan alat inspeksi spasial berbasis browser. Aplikasi ini memungkinkan pelajar, pendidik, desainer, maupun pengembang untuk mengeksplorasi puluhan konfigurasi bangun ruang, memanipulasi objek 3D secara *real-time*, membandingkan properti geometris, hingga membangun dan memvalidasi bentuk ekstrusi kustom secara mandiri.

---

## ✨ Fitur Utama

### 1. 📚 Explore Library (45 Konfigurasi Geometri)
* Koleksi lengkap berisi **45 konfigurasi objek 3D** yang telah dikurasi (polihedra, bangun ruang dasar, hingga bentuk geometris kompleks).
* Pencarian dan penyaringan cepat berdasarkan kategori, jumlah sisi, simetri, atau kompleksitas topologi.

### 2. 🖥️ Interactive 3D Workspace
* **Inspeksi & Manipulasi Real-Time**: Putar (*orbit*), perbesar (*zoom*), dan geser (*pan*) objek 3D dengan kontrol kamera yang halus.
* **Mode Visualisasi**: Beralih antara tampilan *solid*, *wireframe*, transparan, maupun inspeksi titik sudut (*vertices*), rusuk (*edges*), dan bidang (*faces*).
* **Kalkulasi Properti Otomatis**: Menampilkan metrik matematis secara langsung seperti luas permukaan, volume, dan karakteristik Euler.

### 3. 🧪 Custom Lab (Extruded Geometry Builder)
* **Pembuat Geometri Kustom**: Gambar atau tentukan poligon 2D dasar dan lakukan ekstrusi (*extrude*) menjadi objek 3D dengan parameter kedalaman, kemiringan (*bevel*), dan skala yang dapat diatur.
* **Validasi Topologi**: Sistem validasi bawaan untuk memastikan bentuk yang dibangun memiliki jaring (*mesh*) yang valid dan bebas dari *self-intersection*.

### 4. ⚖️ Compare Mode
* Bandingkan dua atau lebih objek geometri secara berdampingan (*side-by-side*) untuk menganalisis perbedaan rasio volume, luas permukaan, dan struktur spasial.

### 5. 🎓 Learn & Saved Presets
* **Modul Pembelajaran (`Learn`)**: Materi interaktif seputar konsep dasar hingga lanjutan dalam geometri spasial dan grafika komputer 3D.
* **Penyimpanan Lokal (`Saved` & `Settings`)**: Simpan konfigurasi kustom dari *Custom Lab* untuk diakses kembali kapan saja, serta sesuaikan preferensi tampilan kanvas 3D (pencahayaan, *grid*, warna latar, dan performa *rendering*).

---

## 🛠️ Arsitektur & Tech Stack

> **Catatan:** Sesuaikan daftar di bawah ini dengan *dependencies* aktual di dalam file `package.json` repositori kamu.

* **Frontend Framework**: React / Next.js (TypeScript)
* **3D Rendering Engine**: Three.js / React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
* **Styling & UI Components**: Tailwind CSS / Shadcn UI
* **State Management**: Zustand / React Context
* **Deployment & Hosting**: [Vercel](https://vercel.com)

---

## 📂 Struktur Direktori

```text
geometry-explorer/
├── public/                 # Aset statis, tekstur, dan model 3D bawaan
├── src/
│   ├── app/                # Routing halaman (Home, Explore, Workspace, Lab, Compare, Learn, Saved, Settings)
│   ├── components/
│   │   ├── canvas/         # Komponen scene Three.js, kamera, pencahayaan, dan kontrol orbit
│   │   ├── lab/            # Editor ekstrusi 2D-ke-3D dan validator geometri
│   │   ├── ui/             # Komponen antarmuka (sidebar, toolbar, panel properti)
│   │   └── workspace/      # Alat inspeksi dan perbandingan objek
│   ├── data/               # Definisi 45 konfigurasi geometri bawaan
│   ├── hooks/              # Custom hooks untuk kalkulasi matematis & penyimpanan lokal
│   ├── store/              # State management global aplikasi
│   └── utils/              # Fungsi pembantu geometri (volume, luas permukaan, validasi mesh)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Instalasi Lokal

Ikuti langkah berikut untuk menjalankan proyek ini di lingkungan lokal kamu:

### Prasyarat
* **Node.js** versi `18.x` atau lebih baru
* **npm**, **yarn**, **pnpm**, atau **bun**

### Langkah-langkah

1. **Clone repositori ini**
   ```bash
   git clone https://github.com
   cd 3d-geometrys
   ```

2. **Instal seluruh dependensi**
   ```bash
   npm install
   # atau
   pnpm install
   ```

3. **Jalankan server pengembangan (*development server*)**
   ```bash
   npm run dev
   ```

4. **Buka di browser**
   Akses `http://localhost:3000` untuk melihat aplikasi berjalan secara lokal.

---

## 🧭 Panduan Penggunaan

| Halaman / Modul | Fungsi Utama |
| :--- | :--- |
| **`Home`** | Ringkasan aplikasi dan akses cepat menuju Library, Workspace, serta Custom Lab. |
| **`Explore`** | Menjelajahi 45 konfigurasi objek 3D siap pakai dan memuatnya ke dalam Workspace. |
| **`Workspace`** | Ruang kerja utama untuk memutar, membedah, dan memeriksa metrik objek 3D. |
| **`Lab`** | Membuat bentuk geometri baru melalui proses ekstrusi dan memvalidasi strukturnya. |
| **`Compare`** | Membandingkan dua objek geometri secara visual maupun matematis. |
| **`Learn`** | Panduan edukatif mengenai konsep geometri 3D. |
| **`Saved`** | Daftar objek kustom yang telah disimpan pengguna. |
| **`Settings`** | Pengaturan sensitivitas kontrol kamera, *anti-aliasing*, *grid*, dan tema antarmuka. |

---

## 🤝 Kontribusi

Kontribusi sangat terbuka untuk pengembangan fitur baru, penambahan konfigurasi geometri, maupun optimasi performa *rendering*:

1. *Fork* repositori ini.
2. Buat *branch* fitur baru (`git checkout -b fitur/nama-fitur`).
3. *Commit* perubahan kamu (`git commit -m 'Menambahkan fitur X'`).
4. *Push* ke *branch* tersebut (`git push origin fitur/nama-fitur`).
5. Buat **Pull Request**.

---

## 📄 Lisensi

Didistribusikan di bawah **Lisensi MIT**. Lihat file `LICENSE` untuk informasi lebih lanjut.
