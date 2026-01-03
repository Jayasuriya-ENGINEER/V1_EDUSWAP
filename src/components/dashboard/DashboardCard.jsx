export function DashboardCard({ children, col }) {
  return (
    <div className={`bg-white rounded-2xl border border-zinc-200 p-6 ${col}`}>
      {children}
    </div>
  );
}
