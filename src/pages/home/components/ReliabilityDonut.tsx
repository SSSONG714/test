import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { mockReliabilityStats } from '../../../mocks/trends';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default function ReliabilityDonut() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['신뢰 기사', '낚시성', '광고성'],
        datasets: [
          {
            data: [
              mockReliabilityStats.trusted,
              mockReliabilityStats.clickbait,
              mockReliabilityStats.ad,
            ],
            backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 12,
              font: { size: 11 },
              color: '#64748b',
              usePointStyle: true,
              pointStyleWidth: 8,
            },
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0',
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
            },
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
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800">신뢰성 분포</h3>
        <p className="text-xs text-slate-400 mt-0.5">전체 분석 기사 기준</p>
      </div>
      <div className="h-48 relative">
        <canvas ref={canvasRef} />
        <div className="absolute inset-0 flex items-center justify-center pb-8 pointer-events-none">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800">{mockReliabilityStats.trusted}%</p>
            <p className="text-xs text-slate-400">신뢰 기사</p>
          </div>
        </div>
      </div>
    </div>
  );
}
