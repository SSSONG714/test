# NewsLens - 뉴스 분석 대시보드

## 1. 프로젝트 설명
키워드 기반 뉴스 검색 및 분석 플랫폼. 사용자가 키워드를 입력하면 관련 뉴스를 수집·분석하고 신뢰성 배지, 트렌드 그래프, 워드 클라우드, 이벤트 타임라인 등 다양한 시각화 결과를 제공한다.

## 2. 페이지 구조
- `/` - Dashboard Home (검색 + 통계 개요 + 최근 뉴스)
- `/news` - News List (뉴스 목록 + 신뢰성 배지 + 필터)
- `/news/:id` - Article Detail (기사 상세 + 요약 + 연관어 + 신뢰성 게이지)
- `/wordcloud` - Word Cloud (워드 클라우드 시각화)
- `/trends` - Trend Graph (기간별 꺾은선 그래프)
- `/timeline` - Event Timeline (이벤트 타임라인)

## 3. 핵심 기능
- [x] 키워드 검색 → 뉴스 리스트 → 기사 상세 흐름
- [x] 신뢰성 배지 (광고성 / 낚시성 / 신뢰 분류)
- [x] 기간별 트렌드 꺾은선 그래프 (Chart.js)
- [x] 신뢰성 게이지 차트 (Chart.js Doughnut)
- [x] 워드 클라우드 시각화 (D3 Cloud)
- [x] 이벤트 타임라인 (D3 기반)
- [x] 연관어 분석 결과 표시
- [x] 사이드바 네비게이션

## 4. 데이터 모델
- Mock 데이터로 프론트엔드 시각화 구현 (실제 API 연동 없음)
- News 아이템: id, title, summary, source, publishedAt, reliability, keywords, category
- 신뢰성: score(0~1), isAd, isClickbait, badge(trusted/ad/clickbait)
- 트렌드: 날짜별 키워드 언급 빈도 데이터
- 워드 클라우드: 단어 + 빈도 + 관련도
- 타임라인: 날짜 + 이벤트 제목 + 설명

## 5. 백엔드/서드파티 연동
- Supabase: 불필요 (Mock 데이터)
- Shopify: 불필요
- Stripe: 불필요
- Chart.js + react-chartjs-2: 트렌드/게이지 차트
- D3.js + d3-cloud: 워드 클라우드 + 타임라인

## 6. 개발 단계 계획

### Phase 1: 전체 UI 구축
- 목표: 6개 페이지 완전 구현 + 모든 시각화 포함
- 산출물: 동작하는 대시보드 (Mock 데이터 기반)

### Phase 2: 실제 API 연동 (선택)
- 목표: 실제 뉴스 API + 분석 백엔드 연동
- 산출물: 실시간 뉴스 검색 및 분석 결과
