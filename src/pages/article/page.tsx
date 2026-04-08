import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/feature/Layout';
import ReliabilityBadge from '../../components/base/ReliabilityBadge';
import ReliabilityGauge from './components/ReliabilityGauge';
import RelatedWords from './components/RelatedWords';
import { mockNews } from '../../mocks/news';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = mockNews.find((n) => n.id === id) || mockNews[0];

  return (
    <Layout>
      <div className="p-6 max-w-screen-xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-5 cursor-pointer whitespace-nowrap"
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-left-line text-sm" />
          </span>
          뉴스 목록으로
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="h-56 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <ReliabilityBadge badge={article.reliability.badge} size="md" />
                  <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-slate-800 leading-snug mb-3">{article.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 flex items-center justify-center">
                      <i className="ri-building-line text-xs" />
                    </span>
                    {article.source}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 flex items-center justify-center">
                      <i className="ri-user-line text-xs" />
                    </span>
                    {article.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 flex items-center justify-center">
                      <i className="ri-calendar-line text-xs" />
                    </span>
                    {article.publishedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 flex items-center justify-center">
                      <i className="ri-eye-line text-xs" />
                    </span>
                    {article.views.toLocaleString()}회
                  </div>
                </div>

                <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-ai-generate text-teal-600 text-sm" />
                    </div>
                    <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">AI 요약</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{article.summary}</p>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-slate-600 leading-loose">{article.content}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-price-tag-3-line text-teal-500 text-sm" />
                </span>
                주요 키워드
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => navigate(`/news?q=${encodeURIComponent(kw)}`)}
                    className="text-sm text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    #{kw}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-shield-check-line text-teal-500 text-sm" />
                </span>
                신뢰성 분석
              </h3>
              <ReliabilityGauge
                score={article.reliability.score}
                adProbability={article.reliability.adProbability}
                clickbaitProbability={article.reliability.clickbaitProbability}
              />
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">광고성 여부</span>
                    <span className={`font-medium ${article.reliability.isAd ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {article.reliability.isAd ? '광고성 의심' : '해당 없음'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">낚시성 여부</span>
                    <span className={`font-medium ${article.reliability.isClickbait ? 'text-red-500' : 'text-emerald-600'}`}>
                      {article.reliability.isClickbait ? '낚시성 의심' : '해당 없음'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-links-line text-teal-500 text-sm" />
                  </span>
                  연관어 분석
                </h3>
                <button
                  type="button"
                  onClick={() => navigate('/wordcloud')}
                  className="text-xs text-teal-600 hover:text-teal-700 cursor-pointer whitespace-nowrap"
                >
                  워드 클라우드
                </button>
              </div>
              <RelatedWords words={article.relatedWords} />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">바로 가기</h3>
              <div className="space-y-2">
                {[
                  { label: '트렌드 그래프', icon: 'ri-line-chart-line', path: '/trends' },
                  { label: '이벤트 타임라인', icon: 'ri-time-line', path: '/timeline' },
                  { label: '워드 클라우드', icon: 'ri-cloud-line', path: '/wordcloud' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm text-slate-600 hover:text-teal-600 transition-colors cursor-pointer"
                  >
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className={`${item.icon} text-sm`} />
                    </span>
                    {item.label}
                    <span className="ml-auto w-3 h-3 flex items-center justify-center">
                      <i className="ri-arrow-right-s-line text-xs" />
                    </span>
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
