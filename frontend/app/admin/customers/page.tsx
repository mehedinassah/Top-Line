"use client";

import { useEffect, useState } from "react";
import { listUsers, AdminUser } from "@/lib/api";

function fmtDate(s?: string) {
  if (!s) return "—";
  const d = new Date(s);
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-BD");
}

export default function AdminCustomersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listUsers()
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div className="text-neutral-500">Loading…</div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500 border-b border-neutral-200 bg-neutral-50">
                <th className="py-3 px-4">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="px-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-neutral-100">
                  <td className="py-3 px-4 font-medium">{u.name || "—"}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        u.role === "ADMIN"
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4">{fmtDate(u.createdAt)}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-neutral-500">
                    No customers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
