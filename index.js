const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. SETTING SERVER HTTP (Agar Render tidak mati)
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
  res.write('Bot AFK Minecraft Aktif!');
  res.end();
}).listen(port);

console.log(`Server HTTP berjalan di port ${port}`);

// 2. KONFIGURASI BOT
const botConfig = {
  host: '65.108.0.184',   // IP Server Anda
  port: 31563,            // Port Server Anda
  username: 'Bot_AFK_24jam', // Nama bot di dalam game
  offline: true,          // Karena server Anda 'Cracked' (Online Mode: False)
  version: '1.20.80'      // Sesuai target versi Anda
};

function createBot() {
  console.log('Sedang mencoba menyambung ke server...');
  
  const client = bedrock.createClient(botConfig);

  client.on('spawn', () => {
    console.log('Bot berhasil masuk ke server!');
  });

  client.on('error', (err) => {
    console.error('Terjadi error:', err.message);
  });

  // 3. SISTEM AUTO-RECONNECT
  client.on('close', () => {
    console.log('Koneksi terputus. Mencoba masuk lagi dalam 10 detik...');
    setTimeout(() => {
      createBot();
    }, 10000);
  });
}

// Jalankan bot pertama kali
createBot();
