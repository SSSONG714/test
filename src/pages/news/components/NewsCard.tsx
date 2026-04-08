import { useNavigate } from 'react-router-dom';
import { NewsItem } from '../../../mocks/news';
import ReliabilityBadge from '../../../components/base/ReliabilityBadge';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const navigate = useNavigate();

  const reliabilityColor =
    news.reliability.score >= 0.8
      ? 'text-emerald-600'
      : news.reliability.score >= 0.5
      ? 'text-amber-600'
      : 'text-red-500';

  return (
    <div
      onClick={() => navigate(`/news/${news.id}`)}
      className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-brand-300 shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer group animate-slide-up"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden bg-slate-100 relative">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex-1 p-6 min-w-0 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <ReliabilityBadge badge={news.reliability.badge} />
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 bg-slate-100/50 px-2 py-1 rounded-md">
              {news.category}
            </span>
            <span className="text-xs text-slate-400 ml-auto flex items-center gap-1.5">
              <i className="ri-time-line" /> {news.publishedAt}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug mb-2">
            {news.title}
          </h3>

          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1">
            {news.summary}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <i className="ri-eye-line text-slate-400 text-sm" />
                <span className="text-xs font-medium text-slate-500">{news.views.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <i className="ri-shield-flash-line text-slate-400 text-sm" />
                <span className={`text-xs font-bold ${reliabilityColor}`}>
                  신뢰도 {(news.reliability.score * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 justify-end">
              {news.keywords.slice(0, 2).map((kw) => (
                <span
                  key={kw}
                  className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-100/50"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
