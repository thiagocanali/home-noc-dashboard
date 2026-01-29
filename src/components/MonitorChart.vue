<template>
  <div class="chart-box">
    <h4 style="margin: 0 0 15px 0; font-size: 11px; color: #64748b; text-transform: uppercase;">
      {{ title }}
    </h4>
    <div class="chart-wrapper">
      <v-chart class="chart-render" :option="chartOption" autoresize />
    </div>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

// Registra os módulos necessários
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, TitleComponent]);

// Habilita tema dark
provide(THEME_KEY, 'dark');

const props = defineProps(['title', 'data', 'color']);

const chartOption = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  grid: { top: '10', left: '35', right: '10', bottom: '25' },
  xAxis: { type: 'category', show: false },
  yAxis: { 
    type: 'value', 
    min: 0, 
    max: 100,
    splitLine: { lineStyle: { color: '#334155' } } 
  },
  series: [{
    data: props.data,
    type: 'line',
    smooth: true,
    symbol: 'none',
    lineStyle: { color: props.color, width: 4 },
    areaStyle: {
      color: props.color,
      opacity: 0.1
    }
  }]
}));
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 300px; /* Altura do gráfico em si */
}
.chart-render {
  width: 100%;
  height: 100%;
}
</style>