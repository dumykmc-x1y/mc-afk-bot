const mineflayer = require('mineflayer')
const http = require('http')

function startBot() {
    const bot = mineflayer.createBot({
        host: 'faris.seedloaf.gg',
        port: 25565,
        username: 'AFK_Worker',
        version: '1.21.11'
    })

    bot.on('spawn', () => {
        console.log('--- BOT ONLINE: Menjaga Server ---');
        const mover = setInterval(() => {
            if (!bot.entity) return
            let y = bot.entity.position.y
            let act = y <= 0 ? 'jump' : (y >= 67 ? 'sneak' : null)
            if (act) {
                bot.setControlState(act, true)
                setTimeout(() => bot.setControlState(act, false), 500)
            }
        }, 20000)
        bot.once('end', () => clearInterval(mover))
    })

    bot.on('error', (err) => {
        console.log(`Error: ${err.code}`);
        bot.end();
    })

    bot.on('end', () => {
        console.log('Terputus, mencoba masuk lagi dalam 15 detik...');
        setTimeout(startBot, 15000); 
    })
}

// 1. Jalankan Bot Minecraft
startBot()

// 2. JALANKAN WEB SERVER (WAJIB AGAR REPLIT TIDAK TIDUR)
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Bot AFK Seedloaf sedang berjalan 24/7!");
    res.end();
}).listen(8080);

console.log("Web Server aktif di Port 8080. UptimeRobot siap memantau!");
