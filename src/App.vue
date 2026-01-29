<template>
  <div class="header">
    <div>
      <h1>HOME NOC</h1>
      <small style="color: #475569;">TELEMETRIA EM TEMPO REAL</small>
    </div>
    <div style="text-align: right;">
      <span style="font-family: monospace; color: #3b82f6; font-size: 1.2rem;">
        {{ currentTime }}
      </span>
    </div>
  </div>

  <div class="metrics-grid">
    <div class="card">
      <h3>Carga do Processador</h3>
      <p>{{ cpuValue }}%</p>
    </div>
    <div class="card" style="border-color: #a855f7;">
      <h3>Uso de Memória RAM</h3>
      <p>{{ ramValue }}%</p>
    </div>
    <div class="card" :style="{ borderColor: tempValue > 0 ? '#22c55e' : '#475569' }">
      <h3>Temperatura CPU</h3>
      <p :style="{ color: tempValue > 75 ? '#ef4444' : 'inherit' }">
        {{ tempValue > 0 ? tempValue + '°C' : 'N/A' }}
      </p>
    </div>
  </div>

  <div class="charts-grid">
    <MonitorChart title="Performance CPU (%)" :data="cpuHistory" color="#3b82f6" />
    <MonitorChart title="Uso de RAM (%)" :data="ramHistory" color="#a855f7" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';
import MonitorChart from './components/MonitorChart.vue';

const cpuValue = ref(0);
const ramValue = ref(0);
const tempValue = ref(0);
const currentTime = ref('--:--:--');

// Históricos de 30 pontos
const cpuHistory = ref(new Array(30).fill(0));
const ramHistory = ref(new Array(30).fill(0));

let socket;

onMounted(() => {
  socket = io('http://localhost:3000');

  socket.on('pc-metrics', (data) => {
    cpuValue.value = data.cpu;
    ramValue.value = data.ram;
    tempValue.value = data.temp;
    currentTime.value = new Date().toLocaleTimeString();

    // Atualização reativa dos arrays para o ECharts
    const newCpu = [...cpuHistory.value.slice(1), data.cpu];
    cpuHistory.value = newCpu;

    const newRam = [...ramHistory.value.slice(1), data.ram];
    ramHistory.value = newRam;
  });
});

onUnmounted(() => {
  if (socket) socket.disconnect();
});
</script>

<style>
/* Remove margens e garante o fundo escuro do NOC */
body {
  margin: 0;
  padding: 0;
  background-color: #111827;
  overflow-x: hidden;
}

/* Transições suaves para os números mudando */
.text-5xl {
  transition: all 0.3s ease-in-out;
}
</style>