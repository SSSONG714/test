interface ReliabilityBadgeProps {
  badge: 'trusted' | 'ad' | 'clickbait' | 'mixed';
  size?: 'sm' | 'md';
}

const badgeConfig = {
  trusted: {
    label: '신뢰',
    icon: 'ri-shield-check-line',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  ad: {
    label: '광고성',
    icon: 'ri-advertisement-line',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  clickbait: {
    label: '낚시성',
    icon: 'ri-alert-line',
    className: 'bg-red-50 text-red-600 border-red-200',
  },
  mixed: {
    label: '혼합',
    icon: 'ri-information-line',
    className: 'bg-slate-50 text-slate-600 border-slate-200',
  },
};

export default function ReliabilityBadge({ badge, size = 'sm' }: ReliabilityBadgeProps) {
  const config = badgeConfig[badge];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-2.5 py-1 gap-1.5';

  return (
    <span className={`inline-flex items-center rounded-full border font-medium whitespace-nowrap ${sizeClass} ${config.className}`}>
      <span className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} flex items-center justify-center`}>
        <i className={`${config.icon} ${size === 'sm' ? 'text-xs' : 'text-sm'}`} />
      </span>
      {config.label}
    </span>
  );
}
