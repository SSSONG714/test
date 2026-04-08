import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../components/feature/Layout';
import NewsCard from './components/NewsCard';
import SearchFilter from './components/SearchFilter';
import { mockNews } from '../../mocks/news';

export default function NewsListPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBadge, setSelectedBadge] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredNews = useMemo(() => {
    let result = [...mockNews];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((n) => n.category === selectedCategory);
    }

    if (selectedBadge) {
      result = result.filter((n) => n.reliability.badge === selectedBadge);
    }

    if (sortBy === 'views') {
      result.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'reliability') {
      result.sort((a, b) => b.reliability.score - a.reliability.score);
    } else {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBadge, sortBy]);

  return (
    <Layout>
      <div className="p-6 max-w-screen-xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-newspaper-line text-teal-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">뉴스 목록</h2>
            {initialQuery && (
              <span className="text-sm text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full font-medium">
                &ldquo;{initialQuery}&rdquo; 검색 결과
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400">키워드로 뉴스를 검색하고 신뢰성을 확인하세요.</p>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedBadge={selectedBadge}
          onBadgeChange={setSelectedBadge}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={filteredNews.length}
        />

        {filteredNews.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
            <div className="w-14 h-14 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-7 h-7 flex items-center justify-center">
                <i className="ri-search-line text-2xl text-slate-400" />
              </div>
            </div>
            <p className="text-slate-500 font-medium">검색 결과가 없습니다.</p>
            <p className="text-sm text-slate-400 mt-1">다른 키워드나 필터로 다시 시도해보세요.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
