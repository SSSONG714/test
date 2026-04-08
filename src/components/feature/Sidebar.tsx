import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'ri-dashboard-2-line', label: '대시보드', exact: true },
  { path: '/news', icon: 'ri-newspaper-line', label: '뉴스 목록' },
  { path: '/wordcloud', icon: 'ri-cloud-line', label: '워드 클라우드' },
  { path: '/trends', icon: 'ri-line-chart-line', label: '트렌드 그래프' },
  { path: '/timeline', icon: 'ri-time-line', label: '이벤트 타임라인' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ mobileOpen, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-slate-950 flex flex-col z-40
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* 로고 + 토글 버튼 */}
        <div className={`pt-6 pb-4 border-b border-slate-800 flex items-center ${collapsed ? 'px-3 justify-center' : 'px-5 justify-between'}`}>
          {!collapsed && (
            <div
              className="flex items-center gap-3 cursor-pointer min-w-0"
              onClick={() => navigate('/')}
            >
              <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                <img
                  src="https://public.readdy.ai/ai/img_res/4be617d1-f373-4994-9cfb-f035c6db54d6.png"
                  alt="NewsLens Logo"
                  className="w-9 h-9 object-contain rounded-lg"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-white font-bold text-base tracking-tight leading-none whitespace-nowrap">NewsLens</h1>
                <p className="text-slate-500 text-xs mt-0.5 whitespace-nowrap">뉴스 분석 대시보드</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:flex w-7 h-7 items-center justify-center rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all cursor-pointer shrink-0"
          >
            <i className={`text-base transition-transform duration-300 ${collapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'}`} />
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className={`flex-1 mt-5 space-y-0.5 overflow-y-auto ${collapsed ? 'px-2' : 'px-3'}`}>
          {!collapsed && (
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider px-2 mb-2">메인 메뉴</p>
          )}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                ${collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5'}
                ${isActive
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <i className={`${item.icon} text-base ${isActive ? 'text-teal-400' : ''}`} />
                  </div>
                  {!collapsed && (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400" />
                      )}
                    </>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>


      </aside>
    </>
  );
}
