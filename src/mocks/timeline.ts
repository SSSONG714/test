export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  impact: 'high' | 'medium' | 'low';
  relatedKeywords: string[];
  articleCount: number;
}

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'e1',
    date: '2026-03-29',
    title: 'OpenAI GPT-5 정식 출시',
    description: 'OpenAI가 GPT-5를 공식 발표. 의학 국가고시 99점, 변호사 시험 상위 5% 기록. AI 분야 패러다임 전환점.',
    category: 'IT/AI',
    impact: 'high',
    relatedKeywords: ['GPT-5', 'OpenAI', '인공지능', 'LLM'],
    articleCount: 342,
  },
  {
    id: 'e2',
    date: '2026-03-28',
    title: '삼성전자 사상 최대 분기 실적 발표',
    description: '4분기 영업이익 18조 2000억 원으로 역대 최대치 경신. HBM3E 양산 성공이 핵심 동력.',
    category: '경제',
    impact: 'high',
    relatedKeywords: ['삼성전자', '반도체', 'HBM', '실적'],
    articleCount: 287,
  },
  {
    id: 'e3',
    date: '2026-03-27',
    title: 'KAIST·SKT 양자컴퓨터 상용 서비스 출시',
    description: '국내 최초 127큐비트 양자컴퓨팅 클라우드 서비스 Q-클라우드 기업 대상 공식 출시.',
    category: 'IT/과학',
    impact: 'high',
    relatedKeywords: ['양자컴퓨터', 'KAIST', 'SKT', '클라우드'],
    articleCount: 198,
  },
  {
    id: 'e4',
    date: '2026-03-26',
    title: '현대차 전고체 배터리 EV 2027년 출시 발표',
    description: '항속거리 900km, 충전 10분 전고체 배터리 전기차 로드맵 공개. 배터리 혁명의 신호탄.',
    category: '자동차',
    impact: 'medium',
    relatedKeywords: ['현대차', '전고체배터리', '전기차', '배터리'],
    articleCount: 156,
  },
  {
    id: 'e5',
    date: '2026-03-25',
    title: '서울시 1인가구 공공임대 5만 가구 공급 계획 발표',
    description: '2030년까지 역세권 중심 소형 공공임대주택 5만 가구 공급. 청년·중장년 1인가구 우선 배정.',
    category: '사회/정책',
    impact: 'medium',
    relatedKeywords: ['서울시', '1인가구', '공공임대', '주거'],
    articleCount: 134,
  },
  {
    id: 'e6',
    date: '2026-03-23',
    title: '비트코인 15% 폭락 – 연준 긴축 신호 영향',
    description: '미 연준 긴축 지속 시사 발언 이후 비트코인 24시간 만에 15% 급락. 암호화폐 시장 전반 하락.',
    category: '경제',
    impact: 'high',
    relatedKeywords: ['비트코인', '암호화폐', '연준', '긴축'],
    articleCount: 412,
  },
  {
    id: 'e7',
    date: '2026-03-20',
    title: 'AI 신약 스타트업 메디젠, 시리즈 B 1000억 유치',
    description: '글로벌 VC 주도 1000억 원 투자 유치 성공. FDA 임상 2상 진입이 핵심 투자 포인트.',
    category: 'IT/스타트업',
    impact: 'medium',
    relatedKeywords: ['메디젠', '바이오', '스타트업', '투자유치'],
    articleCount: 98,
  },
  {
    id: 'e8',
    date: '2026-03-15',
    title: '엔비디아 블랙웰 B200 GPU 대규모 양산 돌입',
    description: '엔비디아의 차세대 AI 가속기 B200 GPU가 본격 양산에 돌입. AI 데이터센터 수요 급증 예상.',
    category: 'IT/AI',
    impact: 'high',
    relatedKeywords: ['엔비디아', 'GPU', 'AI', '데이터센터'],
    articleCount: 267,
  },
  {
    id: 'e9',
    date: '2026-03-10',
    title: 'EU AI법 시행 – 글로벌 AI 규제 본격화',
    description: 'EU 인공지능법이 공식 발효. 고위험 AI 시스템에 대한 엄격한 규제와 투명성 요건 적용.',
    category: 'IT/AI',
    impact: 'high',
    relatedKeywords: ['AI규제', 'EU', '인공지능법', '컴플라이언스'],
    articleCount: 312,
  },
  {
    id: 'e10',
    date: '2026-03-05',
    title: '국내 첫 자율주행 레벨 4 택시 서비스 상용화',
    description: '서울 강남 일부 구간에서 운전자 없는 레벨 4 자율주행 로보택시 서비스 정식 개시.',
    category: '자동차',
    impact: 'medium',
    relatedKeywords: ['자율주행', '로보택시', '레벨4', '스마트모빌리티'],
    articleCount: 178,
  },
];
