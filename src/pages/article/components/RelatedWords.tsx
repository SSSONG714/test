interface RelatedWordsProps {
  words: { word: string; weight: number; sentiment: 'positive' | 'negative' | 'neutral' }[];
}

const sentimentColors = {
  positive: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  negative: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  neutral: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
};

export default function RelatedWords({ words }: RelatedWordsProps) {
  const sorted = [...words].sort((a, b) => b.weight - a.weight);
  const maxWeight = sorted[0]?.weight || 100;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {sorted.map((w) => {
          const fontSize = 10 + ((w.weight / maxWeight) * 12);
          const colors = sentimentColors[w.sentiment];
          return (
            <span
              key={w.word}
              className={`inline-flex items-center rounded-full border px-3 py-1.5 font-medium cursor-default transition-transform hover:scale-105 ${colors.bg} ${colors.text} ${colors.border}`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {w.word}
            </span>
          );
        })}
      </div>

      <div className="space-y-2">
        {sorted.map((w) => {
          const colors = sentimentColors[w.sentiment];
          return (
            <div key={w.word} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-24 truncate">{w.word}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    w.sentiment === 'positive' ? 'bg-emerald-400' : w.sentiment === 'negative' ? 'bg-red-400' : 'bg-slate-400'
                  }`}
                  style={{ width: `${w.weight}%` }}
                />
              </div>
              <span className={`text-xs font-medium w-8 text-right ${colors.text}`}>{w.weight}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> 긍정</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> 부정</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400 inline-block" /> 중립</div>
      </div>
    </div>
  );
}
