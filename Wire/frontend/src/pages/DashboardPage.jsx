import { Link } from 'react-router-dom';

const metrics = [
  ['10k+', 'Concurrent users'],
  ['< 50ms', 'Socket fanout target'],
  ['80%+', 'Test coverage target']
];

export default function DashboardPage() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Distributed communication platform</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white">
          Wire brings authenticated chat, presence, and Redis-backed socket fanout into one production-ready system.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          React, Redux Toolkit, Socket.IO, MongoDB, Redis, and Nginx are wired together with clean architecture boundaries.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/docs" className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950">Read docs</Link>
          <Link to="/auth" className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white">Open auth flow</Link>
        </div>
      </div>

      <div className="grid gap-4">
        {metrics.map(([value, label]) => (
          <div key={label} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <div className="text-3xl font-semibold text-white">{value}</div>
            <div className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">{label}</div>
          </div>
        ))}
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-emerald-100">
          Redis Pub/Sub and the Socket.IO Redis adapter keep message delivery synchronized across horizontally scaled servers.
        </div>
      </div>
    </section>
  );
}
