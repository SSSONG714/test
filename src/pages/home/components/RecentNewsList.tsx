import { useNavigate } from 'react-router-dom';
import { mockNews } from '../../../mocks/news';
import ReliabilityBadge from '../../../components/base/ReliabilityBadge';

export default function RecentNewsList() {
  const navigate = useNavigate();
  const recentNews = mockNews.slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">최근 분석 기사</h3>
        <button
          type="button"
          onClick={() => navigate('/news')}
          className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap"
        >
          전체 보기
          <span className="w-3 h-3 flex items-center justify-center">
            <i className="ri-arrow-right-s-line text-xs" />
          </span>
        </button>
      </div>

      <div className="space-y-3">
        {recentNews.map((news) => (
          <div
            key={news.id}
            onClick={() => navigate(`/news/${news.id}`)}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-slate-100">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <ReliabilityBadge badge={news.reliability.badge} />
                <span className="text-xs text-slate-400">{news.source}</span>
              </div>
              <p className="text-sm font-medium text-slate-700 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                {news.title}
              </p>
              <p className="text-xs text-slate-400 mt-1">{news.publishedAt}</p>
            </div>
            <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity mt-2">
              <i className="ri-arrow-right-s-line text-teal-500 text-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
