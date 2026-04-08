import { useNavigate } from 'react-router-dom';
import { mockCategoryStats } from '../../../mocks/trends';

export default function CategoryStats() {
  const navigate = useNavigate();
  const maxCount = Math.max(...mockCategoryStats.map((c) => c.count));

  const categoryColors: Record<string, string> = {
    'IT/AI': 'bg-teal-500',
    '경제': 'bg-amber-500',
    '사회/정책': 'bg-emerald-500',
    '자동차/모빌리티': 'bg-orange-500',
    '건강': 'bg-rose-500',
    '연예': 'bg-violet-400',
    '기타': 'bg-slate-400',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">카테고리별 기사</h3>
          <p className="text-xs text-slate-400 mt-0.5">이번 달 기준</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/news')}
          className="text-xs text-teal-600 hover:text-teal-700 font-medium cursor-pointer whitespace-nowrap"
        >
          필터 적용
        </button>
      </div>

      <div className="space-y-3">
        {mockCategoryStats.map((cat) => (
          <div key={cat.category} className="group cursor-pointer" onClick={() => navigate(`/news?category=${cat.category}`)}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-600 group-hover:text-teal-600 transition-colors">{cat.category}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">{cat.count.toLocaleString()}건</span>
                <span className="text-xs text-slate-500 font-medium w-7 text-right">{cat.percentage}%</span>
              </div>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${categoryColors[cat.category] || 'bg-teal-500'}`}
                style={{ width: `${(cat.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
