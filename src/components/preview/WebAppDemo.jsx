const stats = [
  ['1,284', 'Active users'],
  ['92%', 'Retention'],
  ['₹48k', 'MRR'],
  ['17', 'Open tickets'],
];

const rows = [
  ['#1042', 'Priya M.', 'Pro', 'Paid', '2m ago'],
  ['#1041', 'Arjun S.', 'Starter', 'Trial', '11m ago'],
  ['#1040', 'Leela K.', 'Pro', 'Paid', '34m ago'],
  ['#1039', 'Dev R.', 'Scale', 'Paid', '1h ago'],
  ['#1038', 'Sara N.', 'Starter', 'Refund', '2h ago'],
];

export default function WebAppDemo() {
  return (
    <div className="font-body text-white min-h-screen flex">
      <aside className="hidden md:flex w-60 flex-col gap-1 p-5 border-r border-white/10 bg-[var(--bg2)]/60">
        <div className="font-heading italic text-2xl mb-6">Console</div>
        {['Dashboard', 'Customers', 'Billing', 'Analytics', 'Settings'].map((i, idx) => (
          <div
            key={i}
            className={`px-3 py-2 rounded-lg text-sm ${
              idx === 0 ? 'bg-white/10 text-white' : 'text-white/60'
            }`}
          >
            {i}
          </div>
        ))}
      </aside>

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Overview</div>
            <h1 className="font-heading italic text-3xl text-white">Dashboard</h1>
          </div>
          <button className="bg-white text-black text-sm font-medium rounded px-4 py-2 hover:scale-[1.03] transition">
            + New
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(([v, l]) => (
            <div key={l} className="liquid-glass rounded-2xl p-5">
              <div className="font-heading italic text-3xl text-white">{v}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{l}</div>
            </div>
          ))}
        </div>

        <div className="liquid-glass rounded-2xl p-6 mb-8">
          <div className="text-sm text-white/60 mb-4">Revenue (last 7 days)</div>
          <div className="flex items-end gap-2 h-40">
            {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-[var(--accent)]/40 to-[var(--accent)]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="liquid-glass rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/10 text-sm text-white/60">
            Recent activity
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-left">
                <th className="px-5 py-2 font-normal">Order</th>
                <th className="px-5 py-2 font-normal">Customer</th>
                <th className="px-5 py-2 font-normal">Plan</th>
                <th className="px-5 py-2 font-normal">Status</th>
                <th className="px-5 py-2 font-normal">When</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t border-white/5 text-white/75">
                  <td className="px-5 py-3 font-mono">{r[0]}</td>
                  <td className="px-5 py-3">{r[1]}</td>
                  <td className="px-5 py-3">{r[2]}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full border border-white/15 text-xs">
                      {r[3]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-white/50">{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
