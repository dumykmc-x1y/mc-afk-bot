const bedrock = require('bedrock-protocol');
const express = require('express');

// 1. Web Server Sederhana (Agar hosting tidak mematikan bot)
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Bot AFK Minecraft 24/7 sedang berjalan!');
});

app.listen(port, () => {
  console.log(`Server monitoring aktif di port ${port}`);
});

// 2. Konfigurasi Bot Minecraft Bedrock
const options = {
  host: '65.108.0.184',
  port: 31563,
  username: 'BotAFK_Discloud', // Kamu bisa ganti nama ini
  offline: true,               // Karena server mode Offline/Cracked
  raknetBackend: 'js',         // WAJIB: Agar lancar di hosting Linux tanpa error compile
  version: '1.20.80'           // Versi server target
};

function startBot() {
  console.log('--- Mencoba menyambungkan ke Server ---');
  
  const client = bedrock.createClient(options);

  // Saat berhasil masuk
  client.on('join', () => {
    console.log('✅ Berhasil! Bot sudah masuk ke dalam server.');
  });

  // Menangani error agar bot tidak mati permanen
  client.on('error', (err) => {
    console.error(`❌ Terjadi kesalahan: ${err.message}`);
  });

  // Fitur Auto-Reconnect jika terputus (Disconnect)
  client.on('disconnect', (packet) => {
    console.log('⚠️ Bot terputus. Alasan:', packet.reason);
    reconnect();
  });

  client.on('close', () => {
    console.log('⚠️ Koneksi tertutup.');
    reconnect();
  });
}

// Fungsi untuk mencoba masuk kembali setiap 10 detik
function reconnect() {
  console.log('🔄 Mencoba masuk kembali dalam 10 detik...');
  setTimeout(() => {
    startBot();
  }, 10000);
}

// Jalankan bot untuk pertama kali
startBot();
