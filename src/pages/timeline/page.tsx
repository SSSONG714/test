import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/feature/Layout';
import { mockTimelineEvents, TimelineEvent } from '../../mocks/timeline';

const impactColors: Record<TimelineEvent['impact'], { bar: string; badge: string; label: string }> = {
  high: { bar: 'bg-red-500', badge: 'bg-red-50 text-red-600 border-red-200', label: '높음' },
  medium: { bar: 'bg-amber-500', badge: 'bg-amber-50 text-amber-600 border-amber-200', label: '중간' },
  low: { bar: 'bg-teal-500', badge: 'bg-teal-50 text-teal-600 border-teal-200', label: '낮음' },
};

const categoryColors: Record<string, string> = {
  'IT/AI': 'bg-teal-500',
  '경제': 'bg-amber-500',
  '사회/정책': 'bg-emerald-500',
  '자동차': 'bg-orange-500',
  'IT/스타트업': 'bg-cyan-500',
  'IT/과학': 'bg-indigo-400',
};

const allCategories = ['전체', ...new Set(mockTimelineEvents.map((e) => e.category))];

export default function TimelinePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedImpact, setSelectedImpact] = useState('전체');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockTimelineEvents.filter((e) => {
    if (selectedCategory !== '전체' && e.category !== selectedCategory) return false;
    if (selectedImpact !== '전체' && e.impact !== selectedImpact) return false;
    return true;
  });

  return (
    <Layout>
      <div className="p-6 max-w-screen-xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-time-line text-teal-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">이벤트 타임라인</h2>
          </div>
          <p className="text-sm text-slate-400">주요 뉴스 이벤트의 흐름을 시간 순서대로 확인하세요.</p>
        </div>

        <div className="mb-5 bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-4 items-center">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-slate-500">카테고리:</span>
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap
                  ${selectedCategory === cat ? 'bg-teal-500 text-white border-teal-500' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-teal-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-slate-500">영향도:</span>
            {['전체', '높음', '중간', '낮음'].map((imp) => (
              <button
                key={imp}
                type="button"
                onClick={() => setSelectedImpact(imp)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap
                  ${selectedImpact === imp ? 'bg-teal-500 text-white border-teal-500' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-teal-300'}`}
              >
                {imp}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            <div className="relative">
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-slate-200" />

              <div className="space-y-4">
                {filtered.map((event, index) => {
                  const ic = impactColors[event.impact];
                  const catColor = categoryColors[event.category] || 'bg-slate-400';
                  const isExpanded = expandedId === event.id;

                  return (
                    <div key={event.id} className="relative flex gap-4">
                      <div className="flex flex-col items-center z-10">
                        <div className={`w-14 h-14 rounded-full ${catColor} flex items-center justify-center shrink-0 border-4 border-white`}>
                          <div className="w-6 h-6 flex items-center justify-center">
                            <i className="ri-newspaper-line text-white text-base" />
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex-1 bg-white border rounded-xl p-4 cursor-pointer transition-all
                          ${isExpanded ? 'border-teal-300' : 'border-slate-200 hover:border-teal-200'}`}
                        onClick={() => setExpandedId(isExpanded ? null : event.id)}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${ic.badge}`}>
                              영향 {ic.label}
                            </span>
                            <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                              {event.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <span className="w-3 h-3 flex items-center justify-center">
                              <i className="ri-calendar-line text-xs" />
                            </span>
                            {event.date}
                            <span className="w-3 h-3 flex items-center justify-center ml-1">
                              <i className={`text-xs transition-transform ${isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                            </span>
                          </div>
                        </div>

                        <h3 className="text-sm font-semibold text-slate-800 mb-2">{event.title}</h3>

                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-slate-100">
                            <p className="text-sm text-slate-600 leading-relaxed mb-3">{event.description}</p>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {event.relatedKeywords.map((kw) => (
                                <button
                                  key={kw}
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); navigate(`/news?q=${encodeURIComponent(kw)}`); }}
                                  className="text-xs text-teal-600 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  #{kw}
                                </button>
                              ))}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <span className="w-3 h-3 flex items-center justify-center">
                                <i className="ri-article-line text-xs" />
                              </span>
                              관련 기사 {event.articleCount}건
                            </div>
                          </div>
                        )}

                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-400">관련 기사 영향도</span>
                            <span className="text-xs font-medium text-slate-600">{event.articleCount}건</span>
                          </div>
                          <div className="h-1 bg-slate-100 rounded-full">
                            <div
                              className={`h-full rounded-full ${ic.bar}`}
                              style={{ width: `${Math.min(100, (event.articleCount / 450) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-4">이벤트 통계</h4>
              <div className="space-y-3">
                {[
                  { label: '총 이벤트', value: mockTimelineEvents.length.toString(), icon: 'ri-calendar-event-line', color: 'text-teal-600' },
                  { label: '높은 영향', value: mockTimelineEvents.filter((e) => e.impact === 'high').length.toString(), icon: 'ri-alert-line', color: 'text-red-500' },
                  { label: '중간 영향', value: mockTimelineEvents.filter((e) => e.impact === 'medium').length.toString(), icon: 'ri-information-line', color: 'text-amber-600' },
                  { label: '총 관련 기사', value: mockTimelineEvents.reduce((s, e) => s + e.articleCount, 0).toLocaleString(), icon: 'ri-newspaper-line', color: 'text-emerald-600' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className={`${stat.icon} text-sm ${stat.color}`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                      <p className="text-sm font-bold text-slate-700">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">카테고리별 색상</h4>
              <div className="space-y-2">
                {Object.entries(categoryColors).map(([cat, color]) => (
                  <div key={cat} className="flex items-center gap-2.5">
                    <div className={`w-3 h-3 rounded-sm ${color}`} />
                    <span className="text-xs text-slate-600">{cat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">바로 가기</h4>
              <div className="space-y-2">
                {[
                  { label: '트렌드 그래프', path: '/trends', icon: 'ri-line-chart-line' },
                  { label: '워드 클라우드', path: '/wordcloud', icon: 'ri-cloud-line' },
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
