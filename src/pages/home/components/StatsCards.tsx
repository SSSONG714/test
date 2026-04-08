import { mockReliabilityStats } from '../../../mocks/trends';

const stats = [
  {
    label: '총 분석 기사',
    value: mockReliabilityStats.totalAnalyzed.toLocaleString(),
    unit: '건',
    icon: 'ri-article-line',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    change: '+12.4%',
    changePositive: true,
  },
  {
    label: '평균 신뢰 점수',
    value: (mockReliabilityStats.avgScore * 100).toFixed(1),
    unit: '점',
    icon: 'ri-shield-check-line',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    change: '+3.1%',
    changePositive: true,
  },
  {
    label: '낚시성 기사 비율',
    value: mockReliabilityStats.clickbait.toString(),
    unit: '%',
    icon: 'ri-alert-line',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    change: '-1.8%',
    changePositive: true,
  },
  {
    label: '광고성 기사 비율',
    value: mockReliabilityStats.ad.toString(),
    unit: '%',
    icon: 'ri-advertisement-line',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    change: '-0.5%',
    changePositive: true,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-xs font-medium mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                <span className="text-sm text-slate-500">{stat.unit}</span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${stat.icon} text-base ${stat.iconColor}`} />
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 flex items-center justify-center">
              <i
                className={`text-xs ${
                  stat.changePositive ? 'ri-arrow-up-s-line text-emerald-500' : 'ri-arrow-down-s-line text-red-500'
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                stat.changePositive ? 'text-emerald-600' : 'text-red-500'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-xs text-slate-400">전월 대비</span>
          </div>
        </div>
      ))}
    </div>
  );
}
