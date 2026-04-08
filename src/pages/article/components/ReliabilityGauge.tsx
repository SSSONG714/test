import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip);

interface ReliabilityGaugeProps {
  score: number;
  adProbability: number;
  clickbaitProbability: number;
}

export default function ReliabilityGauge({ score, adProbability, clickbaitProbability }: ReliabilityGaugeProps) {
  const scoreCanvasRef = useRef<HTMLCanvasElement>(null);
  const adCanvasRef = useRef<HTMLCanvasElement>(null);
  const clickbaitCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartRefs = useRef<(Chart | null)[]>([null, null, null]);

  const createGauge = (canvas: HTMLCanvasElement, value: number, color: string, trackColor: string, index: number) => {
    if (chartRefs.current[index]) chartRefs.current[index]!.destroy();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    chartRefs.current[index] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [value * 100, (1 - value) * 100],
          backgroundColor: [color, trackColor],
          borderWidth: 0,
          hoverOffset: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '78%',
        rotation: -90,
        circumference: 180,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        events: [],
      },
    });
  };

  useEffect(() => {
    if (scoreCanvasRef.current) {
      const c = score >= 0.8 ? '#10b981' : score >= 0.5 ? '#f59e0b' : '#ef4444';
      createGauge(scoreCanvasRef.current, score, c, '#f1f5f9', 0);
    }
    if (adCanvasRef.current) {
      createGauge(adCanvasRef.current, adProbability, '#f59e0b', '#f1f5f9', 1);
    }
    if (clickbaitCanvasRef.current) {
      createGauge(clickbaitCanvasRef.current, clickbaitProbability, '#ef4444', '#f1f5f9', 2);
    }
    return () => {
      chartRefs.current.forEach((c) => { if (c) c.destroy(); });
      chartRefs.current = [null, null, null];
    };
  }, [score, adProbability, clickbaitProbability]);

  const gauges = [
    { label: '신뢰 점수', value: score, ref: scoreCanvasRef, color: score >= 0.8 ? 'text-emerald-600' : score >= 0.5 ? 'text-amber-600' : 'text-red-500' },
    { label: '광고성 확률', value: adProbability, ref: adCanvasRef, color: 'text-amber-600' },
    { label: '낚시성 확률', value: clickbaitProbability, ref: clickbaitCanvasRef, color: 'text-red-500' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {gauges.map((g) => (
        <div key={g.label} className="bg-slate-50 rounded-xl p-4 text-center">
          <div className="h-20 relative">
            <canvas ref={g.ref} />
            <div className="absolute inset-0 flex items-end justify-center pb-1">
              <span className={`text-xl font-bold ${g.color}`}>
                {(g.value * 100).toFixed(0)}
                <span className="text-xs font-normal text-slate-400">%</span>
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">{g.label}</p>
        </div>
      ))}
    </div>
  );
}
