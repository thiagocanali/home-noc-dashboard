const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const si = require('systeminformation');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } 
});

const getMetrics = async () => {
  try {
    const [cpu, mem, temp] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.cpuTemperature()
    ]);

    return {
      cpu: cpu.currentLoad.toFixed(2),
      ram: ((mem.active / mem.total) * 100).toFixed(2),
      temp: temp.main || 0, // Retorna 0 se o Windows bloquear o sensor
      uptime: si.time().uptime
    };
  } catch (err) {
    console.error("Erro ao coletar métricas:", err);
    return { cpu: 0, ram: 0, temp: 0, uptime: 0 };
  }
};

io.on('connection', (socket) => {
  console.log('NOC Operator Connected: ', socket.id);

  const interval = setInterval(async () => {
    const metrics = await getMetrics();
    socket.emit('pc-metrics', metrics);
  }, 2000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Operator Disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Backend do NOC rodando em http://localhost:${PORT}`);
});