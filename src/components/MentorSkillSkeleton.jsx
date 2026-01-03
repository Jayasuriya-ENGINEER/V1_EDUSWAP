export default function MentorSkillSkeleton() {
  return (
    <div className="w-full bg-white rounded-xl border shadow-sm overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-44 bg-zinc-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-zinc-200 rounded w-3/4" />
        <div className="h-4 bg-zinc-200 rounded w-1/2" />

        <div className="flex gap-3">
          <div className="h-4 bg-zinc-200 rounded w-12" />
          <div className="h-4 bg-zinc-200 rounded w-20" />
        </div>

        <div className="h-6 bg-zinc-200 rounded w-24" />

        <div className="h-10 bg-zinc-200 rounded-lg w-full mt-4" />
      </div>
    </div>
  );
}
