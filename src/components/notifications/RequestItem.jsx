import { respondToRequest } from "../../services/requestApi";

export default function RequestItem({ request, onAction }) {
  const handleAccept = async () => {
    try {
      await respondToRequest(request.id, "accept");
      onAction(); // refresh notification list
    } catch (err) {
      console.error("Accept failed", err);
      alert("Failed to accept request");
    }
  };

  const handleReject = async () => {
    try {
      await respondToRequest(request.id, "reject");
      onAction(); // refresh notification list
    } catch (err) {
      console.error("Reject failed", err);
      alert("Failed to reject request");
    }
  };

  return (
    <div className="border rounded-lg p-3 space-y-2">
      <p className="font-medium">{request.users?.name || "User"}</p>

      <p className="text-sm text-zinc-500">
        wants to learn <b>{request.mentor_skills?.skill}</b>
      </p>

      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Accept
        </button>

        <button
          onClick={handleReject}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
