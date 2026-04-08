import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/feature/Layout';
import StatsCards from './components/StatsCards';
import QuickTrendChart from './components/QuickTrendChart';
import RecentNewsList from './components/RecentNewsList';
import ReliabilityDonut from './components/ReliabilityDonut';
import CategoryStats from './components/CategoryStats';

const trendingKeywords = ['인공지능', 'GPT-5', '삼성전자', '반도체', '비트코인', '양자컴퓨터', '전기차', 'HBM'];

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/news?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    navigate(`/news?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <Layout>
      <div className="p-6 max-w-screen-2xl mx-auto animate-fade-in">
        <div className="mb-8 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 rounded-[2rem] p-10 relative overflow-hidden shadow-brand">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-600 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-brand-500/20 border border-brand-400/30 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-ping" />
                <span className="text-brand-300 text-[10px] font-bold uppercase tracking-[0.2em]">Real-time Analysis</span>
              </div>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-black mb-4 leading-tight tracking-tight">
              뉴스의 이면을 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-emerald-300">데이터</span>로 읽다
            </h2>
            <p className="text-slate-400 text-base mb-8 max-w-xl leading-relaxed">
              인공지능 기반 분석 엔진이 수만 건의 뉴스 데이터를 실시간으로 파싱하여 신뢰성과 핵심 트렌드를 정교하게 시각화합니다.
            </p>
            <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl group">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <i className="ri-search-2-line text-slate-400 text-lg group-focus-within:text-brand-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="분석하고 싶은 키워드나 뉴스 주제를 입력하세요..."
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 text-base rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-brand-400/50 focus:bg-white/10 transition-all backdrop-blur-md shadow-2xl"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-500 hover:bg-brand-400 text-white text-base font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-brand/20 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                AI 분석 시작
              </button>
            </form>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Trending:</span>
              {trendingKeywords.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => handleKeywordClick(kw)}
                  className="text-xs font-medium text-brand-300 hover:text-white bg-white/5 hover:bg-brand-500/30 border border-white/10 hover:border-brand-400/50 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-90"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>

        <StatsCards />

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <QuickTrendChart />
          </div>
          <ReliabilityDonut />
        </div>

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <RecentNewsList />
          </div>
          <CategoryStats />
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: '워드 클라우드',
              desc: '연관 키워드 시각화',
              icon: 'ri-cloud-line',
              color: 'from-teal-50 to-teal-100',
              iconColor: 'text-teal-600',
              path: '/wordcloud',
            },
            {
              label: '트렌드 그래프',
              desc: '기간별 언급 추이',
              icon: 'ri-line-chart-line',
              color: 'from-amber-50 to-amber-100',
              iconColor: 'text-amber-600',
              path: '/trends',
            },
            {
              label: '이벤트 타임라인',
              desc: '주요 뉴스 이벤트 흐름',
              icon: 'ri-time-line',
              color: 'from-emerald-50 to-emerald-100',
              iconColor: 'text-emerald-600',
              path: '/timeline',
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.path)}
              className={`bg-gradient-to-br ${item.color} border border-slate-200 rounded-xl p-5 text-left hover:opacity-90 transition-opacity cursor-pointer`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className={`${item.icon} text-base ${item.iconColor}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <div className="ml-auto w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-s-line text-slate-400" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
