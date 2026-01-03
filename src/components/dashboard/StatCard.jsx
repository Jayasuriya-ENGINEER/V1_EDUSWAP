export function StatCard({ icon, title, value }) {
  return (
    <div className="col-span-12 md:col-span-4 bg-white border border-zinc-200 rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-zinc-500">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}
