import { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from 'chart.js';
import { mockKeywordTrends, mockTrendDates } from '../../../mocks/trends';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

export default function QuickTrendChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: mockTrendDates,
        datasets: mockKeywordTrends.slice(0, 4).map((trend) => ({
          label: trend.keyword,
          data: trend.data.map((d) => d.count),
          borderColor: trend.color,
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.4,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0',
            borderColor: '#1e293b',
            borderWidth: 1,
            padding: 10,
          },
        },
        scales: {
          x: {
            grid: { color: '#f1f5f9', drawTicks: false },
            border: { display: false },
            ticks: { color: '#94a3b8', font: { size: 11 }, maxRotation: 0 },
          },
          y: {
            grid: { color: '#f1f5f9', drawTicks: false },
            border: { display: false },
            ticks: { color: '#94a3b8', font: { size: 11 } },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">키워드 트렌드</h3>
          <p className="text-xs text-slate-400 mt-0.5">최근 30일 언급 빈도</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {mockKeywordTrends.slice(0, 4).map((trend) => (
            <div key={trend.keyword} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: trend.color }} />
              <span className="text-xs text-slate-500">{trend.keyword}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-52">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
