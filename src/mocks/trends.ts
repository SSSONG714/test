export interface TrendDataPoint {
  date: string;
  count: number;
}

export interface KeywordTrend {
  keyword: string;
  color: string;
  data: TrendDataPoint[];
}

export const mockTrendDates: string[] = [
  '03/01', '03/03', '03/05', '03/07', '03/09', '03/11', '03/13',
  '03/15', '03/17', '03/19', '03/21', '03/23', '03/25', '03/27', '03/29',
];

export const mockKeywordTrends: KeywordTrend[] = [
  {
    keyword: '인공지능',
    color: '#14b8a6',
    data: [
      { date: '03/01', count: 142 },
      { date: '03/03', count: 168 },
      { date: '03/05', count: 155 },
      { date: '03/07', count: 210 },
      { date: '03/09', count: 198 },
      { date: '03/11', count: 245 },
      { date: '03/13', count: 289 },
      { date: '03/15', count: 312 },
      { date: '03/17', count: 278 },
      { date: '03/19', count: 334 },
      { date: '03/21', count: 356 },
      { date: '03/23', count: 398 },
      { date: '03/25', count: 412 },
      { date: '03/27', count: 445 },
      { date: '03/29', count: 489 },
    ],
  },
  {
    keyword: '반도체',
    color: '#f59e0b',
    data: [
      { date: '03/01', count: 89 },
      { date: '03/03', count: 112 },
      { date: '03/05', count: 134 },
      { date: '03/07', count: 156 },
      { date: '03/09', count: 148 },
      { date: '03/11', count: 178 },
      { date: '03/13', count: 201 },
      { date: '03/15', count: 189 },
      { date: '03/17', count: 223 },
      { date: '03/19', count: 267 },
      { date: '03/21', count: 298 },
      { date: '03/23', count: 312 },
      { date: '03/25', count: 345 },
      { date: '03/27', count: 389 },
      { date: '03/29', count: 423 },
    ],
  },
  {
    keyword: '전기차',
    color: '#10b981',
    data: [
      { date: '03/01', count: 78 },
      { date: '03/03', count: 92 },
      { date: '03/05', count: 85 },
      { date: '03/07', count: 110 },
      { date: '03/09', count: 134 },
      { date: '03/11', count: 122 },
      { date: '03/13', count: 145 },
      { date: '03/15', count: 167 },
      { date: '03/17', count: 155 },
      { date: '03/19', count: 189 },
      { date: '03/21', count: 212 },
      { date: '03/23', count: 198 },
      { date: '03/25', count: 234 },
      { date: '03/27', count: 267 },
      { date: '03/29', count: 289 },
    ],
  },
  {
    keyword: '비트코인',
    color: '#ef4444',
    data: [
      { date: '03/01', count: 234 },
      { date: '03/03', count: 198 },
      { date: '03/05', count: 167 },
      { date: '03/07', count: 189 },
      { date: '03/09', count: 312 },
      { date: '03/11', count: 278 },
      { date: '03/13', count: 245 },
      { date: '03/15', count: 289 },
      { date: '03/17', count: 356 },
      { date: '03/19', count: 312 },
      { date: '03/21', count: 278 },
      { date: '03/23', count: 423 },
      { date: '03/25', count: 389 },
      { date: '03/27', count: 367 },
      { date: '03/29', count: 412 },
    ],
  },
];

export const mockCategoryStats = [
  { category: 'IT/AI', count: 1245, percentage: 32 },
  { category: '경제', count: 876, percentage: 22 },
  { category: '사회/정책', count: 654, percentage: 17 },
  { category: '자동차/모빌리티', count: 432, percentage: 11 },
  { category: '건강', count: 321, percentage: 8 },
  { category: '연예', count: 234, percentage: 6 },
  { category: '기타', count: 178, percentage: 5 },
];

export const mockReliabilityStats = {
  trusted: 62,
  clickbait: 24,
  ad: 14,
  totalAnalyzed: 3940,
  avgScore: 0.71,
};
