export interface WordCloudItem {
  text: string;
  value: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string;
}

export const mockWordCloudData: WordCloudItem[] = [
  { text: '인공지능', value: 489, sentiment: 'positive', category: 'IT/AI' },
  { text: '반도체', value: 423, sentiment: 'positive', category: '경제' },
  { text: '비트코인', value: 412, sentiment: 'negative', category: '경제' },
  { text: 'GPT-5', value: 356, sentiment: 'positive', category: 'IT/AI' },
  { text: '전기차', value: 289, sentiment: 'positive', category: '자동차' },
  { text: '삼성전자', value: 278, sentiment: 'positive', category: '경제' },
  { text: '엔비디아', value: 267, sentiment: 'positive', category: 'IT/AI' },
  { text: '양자컴퓨터', value: 245, sentiment: 'positive', category: 'IT/과학' },
  { text: '전고체 배터리', value: 234, sentiment: 'positive', category: '자동차' },
  { text: 'HBM', value: 223, sentiment: 'positive', category: 'IT/AI' },
  { text: '스타트업', value: 212, sentiment: 'positive', category: 'IT/스타트업' },
  { text: '투자', value: 201, sentiment: 'neutral', category: '경제' },
  { text: '클라우드', value: 198, sentiment: 'neutral', category: 'IT/AI' },
  { text: '암호화폐', value: 189, sentiment: 'negative', category: '경제' },
  { text: '신약', value: 178, sentiment: 'positive', category: '건강' },
  { text: '주식', value: 167, sentiment: 'negative', category: '경제' },
  { text: '현대차', value: 156, sentiment: 'positive', category: '자동차' },
  { text: '서울시', value: 145, sentiment: 'neutral', category: '사회' },
  { text: '금리', value: 134, sentiment: 'negative', category: '경제' },
  { text: '바이오', value: 128, sentiment: 'positive', category: '건강' },
  { text: '메타버스', value: 112, sentiment: 'neutral', category: 'IT/AI' },
  { text: '공공임대', value: 104, sentiment: 'positive', category: '사회' },
  { text: '로봇', value: 98, sentiment: 'positive', category: 'IT/AI' },
  { text: '탄소중립', value: 89, sentiment: 'positive', category: '환경' },
  { text: '패닉셀', value: 85, sentiment: 'negative', category: '경제' },
  { text: '수소차', value: 78, sentiment: 'positive', category: '자동차' },
  { text: '임상시험', value: 72, sentiment: 'neutral', category: '건강' },
  { text: '데이터센터', value: 67, sentiment: 'neutral', category: 'IT/AI' },
  { text: '연준', value: 62, sentiment: 'negative', category: '경제' },
  { text: '스마트팩토리', value: 58, sentiment: 'positive', category: '산업' },
  { text: '핀테크', value: 54, sentiment: 'positive', category: 'IT/금융' },
  { text: '사이버보안', value: 48, sentiment: 'neutral', category: 'IT/AI' },
  { text: '드론', value: 42, sentiment: 'positive', category: '기술' },
  { text: '5G', value: 38, sentiment: 'positive', category: 'IT/AI' },
  { text: '자율주행', value: 35, sentiment: 'positive', category: '자동차' },
];

export const mockRelatedKeywords: WordCloudItem[] = [
  { text: '삼성전자', value: 95, sentiment: 'positive', category: '경제' },
  { text: 'HBM3E', value: 88, sentiment: 'positive', category: 'IT/AI' },
  { text: '엔비디아', value: 82, sentiment: 'positive', category: 'IT/AI' },
  { text: '영업이익', value: 78, sentiment: 'positive', category: '경제' },
  { text: 'D램', value: 72, sentiment: 'neutral', category: '경제' },
  { text: 'AI 서버', value: 85, sentiment: 'positive', category: 'IT/AI' },
  { text: '낸드플래시', value: 65, sentiment: 'neutral', category: '경제' },
  { text: '어닝서프라이즈', value: 70, sentiment: 'positive', category: '경제' },
  { text: '파운드리', value: 60, sentiment: 'neutral', category: '경제' },
  { text: '시스템반도체', value: 58, sentiment: 'positive', category: '경제' },
];
