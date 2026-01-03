export function CardHeader({ icon, title, value, accent }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div
        className={`p-3 rounded-xl ${
          accent === "orange"
            ? "bg-orange-100 text-orange-600"
            : "bg-zinc-100 text-zinc-700"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
