export default function AuthPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <h2 className="text-3xl font-semibold text-white">Authentication phase</h2>
        <p className="mt-4 leading-8 text-slate-300">
          Register, login, refresh tokens, logout, password reset, and JWT middleware are implemented on the backend slice.
        </p>
        <ul className="mt-6 space-y-3 text-slate-200">
          <li>JWT access and refresh tokens</li>
          <li>bcrypt password hashing</li>
          <li>Rate limiting and Helmet protection</li>
          <li>MongoDB refresh token persistence</li>
        </ul>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
        <div className="grid gap-4">
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" placeholder="name@example.com" />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Password" type="password" />
          <button className="rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950">Continue</button>
        </div>
      </div>
    </section>
  );
}
