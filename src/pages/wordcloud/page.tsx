import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/feature/Layout';
import { mockWordCloudData, WordCloudItem } from '../../mocks/wordcloud';

const sentimentFilter = ['전체', '긍정', '부정', '중립'];
const sentimentMap: Record<string, 'positive' | 'negative' | 'neutral' | undefined> = {
  '전체': undefined,
  '긍정': 'positive',
  '부정': 'negative',
  '중립': 'neutral',
};

const sentimentColors: Record<string, string[]> = {
  positive: ['#0d9488', '#059669', '#16a34a', '#0891b2', '#0284c7'],
  negative: ['#dc2626', '#e11d48', '#b91c1c', '#c2410c', '#d97706'],
  neutral: ['#475569', '#64748b', '#6b7280', '#71717a', '#4b5563'],
};

interface CloudWord extends WordCloudItem {
  fontSize: number;
  color: string;
  rotate: number;
}

export default function WordCloudPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filter, setFilter] = useState('전체');
  const [hoveredWord, setHoveredWord] = useState<CloudWord | null>(null);
  const [cloudWords, setCloudWords] = useState<CloudWord[]>([]);
  const [sortedWords, setSortedWords] = useState<CloudWord[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = mockWordCloudData.filter((w) => {
      const s = sentimentMap[filter];
      return s === undefined || w.sentiment === s;
    });

    const maxVal = Math.max(...filtered.map((w) => w.value));
    const minVal = Math.min(...filtered.map((w) => w.value));

    const words: CloudWord[] = filtered.map((w) => {
      const norm = (w.value - minVal) / (maxVal - minVal + 1);
      const fontSize = 14 + Math.round(norm * 42);
      const colors = sentimentColors[w.sentiment];
      const color = colors[Math.floor(Math.random() * colors.length)];
      // 10% 확률로 세로 배치
      const rotate = Math.random() > 0.9 ? 90 : 0;
      return { ...w, fontSize, color, rotate };
    });

    setSortedWords([...words].sort((a, b) => b.value - a.value));
    // 데이터를 섞어서 중앙 집중형이 아닌 무작위 배치 유도
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setCloudWords(shuffled);
  }, [filter]);

  return (
    <Layout>
      <div className="p-6 max-w-screen-xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-cloud-line text-teal-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">워드 클라우드</h2>
            </div>
            <p className="text-sm text-slate-400">키워드 빈도와 감성 분석 결과를 시각화합니다.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sentimentFilter.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap
                  ${filter === f ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-slate-500 border-slate-200 hover:border-teal-300'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="xl:col-span-3">
            <div className="bg-white border border-slate-200 rounded-xl p-4 overflow-hidden shadow-sm">
              <div
                ref={containerRef}
                className="flex flex-wrap gap-1.5 items-center justify-center min-h-[500px] content-center p-4 transition-all duration-500"
              >
                {cloudWords.map((word) => (
                  <button
                    key={word.text}
                    type="button"
                    onMouseEnter={() => setHoveredWord(word)}
                    onMouseLeave={() => setHoveredWord(null)}
                    onClick={() => navigate(`/news?q=${encodeURIComponent(word.text)}`)}
                    className="cursor-pointer transition-all duration-200 hover:scale-110 whitespace-nowrap font-bold rounded-lg px-2 py-1 leading-tight"
                    style={{
                      fontSize: `${word.fontSize}px`,
                      color: hoveredWord?.text === word.text ? '#0d9488' : word.color,
                      opacity: hoveredWord && hoveredWord.text !== word.text ? 0.5 : 1,
                      writingMode: word.rotate === 90 ? 'vertical-rl' : 'horizontal-tb',
                    }}
                  >
                    {word.text}
                  </button>
                ))}
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="space-y-4">
            {hoveredWord ? (
              <div className="bg-white border border-teal-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-information-line text-teal-500 text-sm" />
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800">{hoveredWord.text}</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">언급 빈도</span>
                    <span className="font-semibold text-slate-700">{hoveredWord.value}회</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">감성</span>
                    <span className={`font-semibold ${hoveredWord.sentiment === 'positive' ? 'text-emerald-600' : hoveredWord.sentiment === 'negative' ? 'text-red-500' : 'text-slate-500'}`}>
                      {hoveredWord.sentiment === 'positive' ? '긍정' : hoveredWord.sentiment === 'negative' ? '부정' : '중립'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">카테고리</span>
                    <span className="font-semibold text-slate-700">{hoveredWord.category}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/news?q=${encodeURIComponent(hoveredWord.text)}`)}
                  className="w-full mt-3 text-xs text-center text-teal-600 bg-teal-50 border border-teal-200 px-3 py-2 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  관련 뉴스 검색
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                <div className="w-10 h-10 mx-auto bg-white rounded-full border border-slate-200 flex items-center justify-center mb-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-cursor-line text-slate-400 text-base" />
                  </div>
                </div>
                <p className="text-xs text-slate-400">키워드를 클릭하면<br />상세 정보를 확인할 수 있습니다.</p>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">감성 범례</h4>
              <div className="space-y-2">
                {[
                  { label: '긍정', color: 'bg-teal-500', desc: '신뢰·성장·혁신' },
                  { label: '부정', color: 'bg-red-500', desc: '폭락·위험·논란' },
                  { label: '중립', color: 'bg-slate-400', desc: '일반 정보' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                    <div>
                      <span className="text-xs font-medium text-slate-600">{item.label}</span>
                      <span className="text-xs text-slate-400 ml-1.5">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Top 5 키워드</h4>
              <div className="space-y-2">
                {sortedWords.slice(0, 5).map((w, i) => (
                  <div key={w.text} className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate(`/news?q=${encodeURIComponent(w.text)}`)}>
                    <span className="text-xs text-slate-400 w-4">{i + 1}</span>
                    <span className="text-xs font-medium text-slate-700 flex-1 group-hover:text-teal-600 transition-colors">{w.text}</span>
                    <span className="text-xs text-teal-600 font-semibold">{w.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
