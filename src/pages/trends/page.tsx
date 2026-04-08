import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import Layout from '../../components/feature/Layout';
import { mockKeywordTrends, mockTrendDates } from '../../mocks/trends';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

const periods = ['전체', '1주일', '2주일'];

export default function TrendsPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('전체');
  const [activeKeywords, setActiveKeywords] = useState<string[]>(mockKeywordTrends.map((t) => t.keyword));

  const periodSlice: Record<string, number> = { '전체': 15, '2주일': 14, '1주일': 7 };

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const sliceCount = periodSlice[selectedPeriod] ?? 15;
    const labels = mockTrendDates.slice(-sliceCount);
    const datasets = mockKeywordTrends
      .filter((t) => activeKeywords.includes(t.keyword))
      .map((trend) => ({
        label: trend.keyword,
        data: trend.data.slice(-sliceCount).map((d) => d.count),
        borderColor: trend.color,
        backgroundColor: `${trend.color}12`,
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: trend.color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        fill: false,
        tension: 0.4,
      }));

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
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
            padding: 12,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}건`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: '#f1f5f9', drawTicks: false },
            border: { display: false },
            ticks: { color: '#94a3b8', font: { size: 12 }, maxRotation: 0 },
          },
          y: {
            grid: { color: '#f1f5f9', drawTicks: false },
            border: { display: false },
            ticks: { color: '#94a3b8', font: { size: 12 } },
            title: { display: true, text: '언급 건수', color: '#94a3b8', font: { size: 11 } },
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
  }, [selectedPeriod, activeKeywords]);

  const toggleKeyword = (kw: string) => {
    setActiveKeywords((prev) =>
      prev.includes(kw) ? (prev.length > 1 ? prev.filter((k) => k !== kw) : prev) : [...prev, kw]
    );
  };

  const latestData = mockKeywordTrends.map((t) => ({
    keyword: t.keyword,
    color: t.color,
    latest: t.data[t.data.length - 1].count,
    prev: t.data[t.data.length - 2].count,
  }));

  return (
    <Layout>
      <div className="p-6 max-w-screen-xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-line-chart-line text-teal-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">트렌드 그래프</h2>
            </div>
            <p className="text-sm text-slate-400">기간별 키워드 언급 빈도 추이를 확인하세요.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {periods.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedPeriod(p)}
                className={`text-xs px-4 py-2 rounded-full border transition-all cursor-pointer whitespace-nowrap
                  ${selectedPeriod === p ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-slate-500 border-slate-200 hover:border-teal-300'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="xl:col-span-3">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex flex-wrap gap-3 mb-5">
                {mockKeywordTrends.map((trend) => (
                  <button
                    key={trend.keyword}
                    type="button"
                    onClick={() => toggleKeyword(trend.keyword)}
                    className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap
                      ${activeKeywords.includes(trend.keyword) ? 'border-transparent' : 'bg-slate-50 !text-slate-400 border-slate-200 opacity-50'}`}
                    style={
                      activeKeywords.includes(trend.keyword)
                        ? { backgroundColor: `${trend.color}15`, borderColor: trend.color, color: trend.color }
                        : {}
                    }
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeKeywords.includes(trend.keyword) ? trend.color : '#94a3b8' }} />
                    {trend.keyword}
                  </button>
                ))}
              </div>
              <div className="h-80">
                <canvas ref={canvasRef} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-4">최신 현황</h4>
              <div className="space-y-4">
                {latestData.map((item) => {
                  const change = item.latest - item.prev;
                  const pct = ((change / item.prev) * 100).toFixed(1);
                  const isUp = change >= 0;
                  return (
                    <div key={item.keyword}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-xs font-medium text-slate-600">{item.keyword}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 flex items-center justify-center">
                            <i className={`text-xs ${isUp ? 'ri-arrow-up-s-line text-emerald-500' : 'ri-arrow-down-s-line text-red-500'}`} />
                          </div>
                          <span className={`text-xs font-semibold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>{Math.abs(Number(pct))}%</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${Math.min(100, (item.latest / 500) * 100)}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-400">오늘 {item.latest}건</span>
                        <span className="text-xs text-slate-400">전일 {item.prev}건</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">바로 가기</h4>
              <div className="space-y-2">
                {[
                  { label: '워드 클라우드', path: '/wordcloud', icon: 'ri-cloud-line' },
                  { label: '이벤트 타임라인', path: '/timeline', icon: 'ri-time-line' },
                  { label: '뉴스 목록', path: '/news', icon: 'ri-newspaper-line' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-xs text-slate-600 hover:text-teal-600 transition-colors cursor-pointer"
                  >
                    <span className="w-3.5 h-3.5 flex items-center justify-center">
                      <i className={`${item.icon} text-xs`} />
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
