const stats = [
  ['1,284', 'Active users', '+12%', 'var(--accent4)'],
  ['92%', 'Retention', '+3%', 'var(--accent4)'],
  ['₹48k', 'MRR', '+8%', 'var(--accent4)'],
  ['17', 'Open tickets', '-5', 'var(--accent3)'],
];

const rows = [
  ['#1042', 'Priya M.', 'Pro', 'Paid', '2m ago'],
  ['#1041', 'Arjun S.', 'Starter', 'Trial', '11m ago'],
  ['#1040', 'Leela K.', 'Pro', 'Paid', '34m ago'],
  ['#1039', 'Dev R.', 'Scale', 'Paid', '1h ago'],
  ['#1038', 'Sara N.', 'Starter', 'Refund', '2h ago'],
];

const statusColor = {
  Paid: 'var(--accent4)',
  Trial: 'var(--accent)',
  Refund: 'var(--accent3)',
};

export default function WebAppDemo() {
  return (
    <div className="font-body text-white min-h-screen flex">
      <aside className="hidden md:flex w-60 flex-col gap-1 p-5 border-r border-white/10 bg-white/[0.02]">
        <div className="font-heading italic text-2xl mb-8 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)]" />
          Console
        </div>
        {[
          ['◧', 'Dashboard'],
          ['◍', 'Customers'],
          ['❒', 'Billing'],
          ['◔', 'Analytics'],
          ['⚙', 'Settings'],
        ].map(([ic, i], idx) => (
          <div
            key={i}
            className={`px-3 py-2.5 rounded-xl text-sm flex items-center gap-3 transition-colors ${
              idx === 0 ? 'bg-white/10 text-white' : 'text-white/55 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="opacity-70">{ic}</span>
            {i}
          </div>
        ))}
        <div className="mt-auto flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent4)] to-[var(--accent)]" />
          <div className="text-xs">
            <div className="text-white">Himanshu K.</div>
            <div className="text-white/40">Admin</div>
          </div>
        </div>
      </aside>

      <div className="flex-1 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Overview</div>
            <h1 className="font-heading italic text-4xl text-white">Dashboard</h1>
          </div>
          <button className="bg-white text-black text-sm font-medium rounded-full px-5 py-2.5 hover:scale-[1.04] transition shadow-[0_6px_20px_rgba(255,255,255,0.12)]">
            + New report
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(([v, l, d, c]) => (
            <div key={l} className="rounded-2xl p-5 bg-white/[0.03] border border-white/10">
              <div className="flex items-start justify-between">
                <div className="font-heading italic text-4xl text-white">{v}</div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: c, background: 'rgba(255,255,255,0.05)' }}>
                  {d}
                </span>
              </div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-2">{l}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 mb-8 bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-white/70">Revenue (last 7 days)</div>
            <div className="text-xs text-white/40">₹48,120 total</div>
          </div>
          <div className="flex items-end gap-3 h-44">
            {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[var(--accent)]/30 to-[var(--accent)] transition-all hover:from-[var(--accent2)]/40 hover:to-[var(--accent2)]"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[0.6rem] text-white/30">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-sm text-white/70">Recent activity</span>
            <span className="text-xs text-white/40">View all →</span>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-white/40 text-left">
                <th className="px-5 py-3 font-normal">Order</th>
                <th className="px-5 py-3 font-normal">Customer</th>
                <th className="px-5 py-3 font-normal">Plan</th>
                <th className="px-5 py-3 font-normal">Status</th>
                <th className="px-5 py-3 font-normal">When</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t border-white/5 text-white/75 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 font-mono text-white/50">{r[0]}</td>
                  <td className="px-5 py-3.5">{r[1]}</td>
                  <td className="px-5 py-3.5">{r[2]}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs"
                      style={{ color: statusColor[r[3]], background: 'rgba(255,255,255,0.05)' }}
                    >
                      {r[3]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-white/50">{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
