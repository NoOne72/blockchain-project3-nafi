# Blockchain Project 3 - Smart Contract Todo List

Proyek ini adalah implementasi *Smart Contract* untuk aplikasi Todo List terdesentralisasi menggunakan Solidity, Hardhat, dan antarmuka Remix IDE yang terhubung melalui MetaMask di jaringan lokal.

## 🧑‍💻 Identitas
* **Nama**: Muhammad Nafi Firdaus
* **NRP**: 5027231045
* **Kelompok**: Individu

## 📌 Informasi Smart Contract
* **Network**: Hardhat Local (localhost:8545 / Chain ID: 31337)
* **Solidity Version**: ^0.8.20
* **Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

## ⚙️ Cara Menjalankan Proyek Lokal

1. **Instalasi Dependensi**
   Pastikan Anda berada di dalam direktori proyek (`smartcontract_todolist`), lalu jalankan:
   ```bash
   npm install

2. **Kompilasi Smart Contract**
```bash
npx hardhat compile

```


3. **Menjalankan Unit Testing**
Memastikan seluruh *test case* berjalan dengan sukses:
```bash
npx hardhat test

```


4. **Menjalankan Node Lokal**
Menyalakan server *blockchain* lokal di terminal (biarkan tetap menyala):
```bash
npx hardhat node

```


5. **Deploy Contract**
Buka terminal baru dan jalankan skrip *deploy* ke jaringan lokal:
```bash
npx hardhat run scripts/deploy.js --network localhost

```



## 🚀 Panduan Demonstrasi (Remix IDE & MetaMask)

1. Buka ekstensi **MetaMask**, tambahkan jaringan manual (`http://127.0.0.1:8545`, Chain ID `31337`, Simbol `ETH`).
2. Import *Private Key* dari *Account #0* yang dihasilkan oleh Hardhat Node.
3. Buka **[Remix IDE](https://www.google.com/search?q=https://remix.ethereum.org/)** dan buat file `TodoList.sol`.
4. *Compile* kode menggunakan versi Solidity `0.8.20`.
5. Pada menu *Deploy & Run Transactions*, ubah *Environment* ke **Injected Provider - MetaMask** (Browser Extension).
6. Masukkan *Contract Address* yang didapat dari proses *deploy* ke dalam kolom **At Address**.
7. Lakukan interaksi (seperti `addTodo` atau `toggleTodo`) dan konfirmasi transaksi melalui MetaMask.

## 📁 Daftar Deliverables (Screenshot Requirement)

Seluruh bukti pengerjaan telah diamankan sesuai rubrik penilaian:

* [x] Bukti Compile Berhasil

<img width="515" height="50" alt="image" src="https://github.com/user-attachments/assets/a1860073-39d1-405e-8ce3-1105d51e785e" />

* [x] Bukti Test Passing

<img width="644" height="164" alt="image" src="https://github.com/user-attachments/assets/9144327b-0549-4157-977d-40e0ed2b282b" />

<img width="575" height="169" alt="image" src="https://github.com/user-attachments/assets/9f3788b7-e446-46bc-9d52-14e8c764d183" />


* [x] Output Terminal Deploy (Contract Address) dan Bukti Akun

<img width="682" height="101" alt="image" src="https://github.com/user-attachments/assets/99da215f-110e-4199-aa86-197a2e1023c5" />

<img width="473" height="173" alt="image" src="https://github.com/user-attachments/assets/c5fbb484-eb5e-4bc9-a69d-853dd673e9ce" />

* [x] Bukti MetaMask Terhubung (Saldo Hardhat ETH)

<img width="272" height="129" alt="image" src="https://github.com/user-attachments/assets/e0edbe83-7104-470f-90ef-4e8b6e3f8d72" />

* [x] Bukti Transaksi Berhasil

<img width="1279" height="666" alt="image" src="https://github.com/user-attachments/assets/5fe3cacd-42b8-4682-bb52-934b7aad1149" />

<img width="694" height="142" alt="image" src="https://github.com/user-attachments/assets/7c4dba53-7f6d-43fc-b4f0-a8d096d3a369" />

* [x] Bukti Perubahan State (Fungsi `getMyTodos` di Remix)

<img width="1276" height="673" alt="image" src="https://github.com/user-attachments/assets/81a0ea4c-b6cf-4c27-87d6-c1cc81916902" />

<img width="689" height="163" alt="image" src="https://github.com/user-attachments/assets/380ac1c7-ea6f-4314-a92d-bfd3031cee29" />

<img width="932" height="201" alt="image" src="https://github.com/user-attachments/assets/f211f01e-6212-4600-81f3-b5199d448cc1" />

* [x] Bukti Coverage Contract (Tes `npx hardhat coverage` di Terminal)

<img width="514" height="146" alt="image" src="https://github.com/user-attachments/assets/a65de2b1-42a7-4b5c-b371-4b9a0710ba45" />
