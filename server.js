const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// This line allows the browser to access manifest.json, sw.js, and icons
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('join-room', (code) => {
        socket.join(code);
        console.log(`Device joined room: ${code}`);
    });

    socket.on('cast-video', (data) => {
        io.to(data.code).emit('play-video', data.videoId);
    });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running! Go to http://localhost:${PORT} on this phone`);
});
