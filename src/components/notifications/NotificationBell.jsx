import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchMyRequests } from "../../services/requestApi";
import RequestItem from "./RequestItem";

export default function NotificationBell() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    async function loadRequests() {
      try {
        const data = await fetchMyRequests(user.id);
        if (isMounted) {
          setRequests(data);
        }
      } catch (err) {
        console.error("Notification load failed", err);
      }
    }

    loadRequests();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div className="relative">
      {/* 🔔 Bell Icon */}
      <div
        className="cursor-pointer text-xl"
        onClick={() => setOpen((prev) => !prev)}
      >
        🔔
      </div>

      {/* Badge */}
      {requests.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
          {requests.length}
        </span>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg p-3 space-y-3 z-50">
          {requests.length === 0 ? (
            <p className="text-sm text-zinc-400">No requests</p>
          ) : (
            requests.map((req) => (
              <RequestItem
                key={req.id}
                request={req}
                onAction={() => {
                  // reload after accept/reject
                  fetchMyRequests(user.id).then(setRequests);
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
