interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedBadge: string;
  onBadgeChange: (val: string) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
  resultCount: number;
}

const categories = ['전체', 'IT/AI', '경제', '사회/정책', '자동차/모빌리티', '건강', '연예', 'IT/과학', 'IT/스타트업'];
const badges = [
  { value: '', label: '전체' },
  { value: 'trusted', label: '신뢰' },
  { value: 'clickbait', label: '낚시성' },
  { value: 'ad', label: '광고성' },
];
const sorts = [
  { value: 'newest', label: '최신순' },
  { value: 'views', label: '조회수순' },
  { value: 'reliability', label: '신뢰도순' },
];

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedBadge,
  onBadgeChange,
  sortBy,
  onSortChange,
  resultCount,
}: SearchFilterProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 w-4 h-full flex items-center pointer-events-none">
            <i className="ri-search-line text-slate-400 text-sm" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="뉴스 키워드 검색..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2.5 text-slate-600 bg-slate-50 focus:outline-none focus:border-teal-500 cursor-pointer"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <span className="text-xs text-slate-400 whitespace-nowrap">
            총 <strong className="text-teal-600">{resultCount}</strong>건
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs text-slate-500 self-center font-medium">카테고리:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat === '전체' ? '' : cat)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap
              ${(cat === '전체' ? !selectedCategory : selectedCategory === cat)
                ? 'bg-teal-500 text-white border-teal-500'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-teal-300'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-slate-500 self-center font-medium">신뢰성:</span>
        {badges.map((b) => (
          <button
            key={b.value}
            type="button"
            onClick={() => onBadgeChange(b.value)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap
              ${selectedBadge === b.value
                ? 'bg-teal-500 text-white border-teal-500'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-teal-300'
              }`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
