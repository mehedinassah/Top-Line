"use client";

import { useEffect, useState } from "react";
import { listOrders, updateOrderStatus, AdminOrder } from "@/lib/api";

const STATUSES = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

function taka(n: number) {
  return "৳" + (n ?? 0).toLocaleString("en-BD");
}
function fmtDate(s?: string) {
  if (!s) return "—";
  const d = new Date(s);
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-BD");
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listOrders(filter || undefined)
      .then(setOrders)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const changeStatus = async (o: AdminOrder, status: string) => {
    try {
      await updateOrderStatus(o.id, status);
      setOrders((prev) => prev.map((x) => (x.id === o.id ? { ...x, status } : x)));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-neutral-300 rounded px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div className="text-neutral-500">Loading…</div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500 border-b border-neutral-200 bg-neutral-50">
                <th className="py-3 px-4">#</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th className="text-right">Total</th>
                <th className="px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-neutral-100">
                  <td className="py-3 px-4">{o.id}</td>
                  <td>
                    <div>{o.customerName || "—"}</div>
                    <div className="text-xs text-neutral-500">{o.customerEmail}</div>
                  </td>
                  <td>{fmtDate(o.createdDate)}</td>
                  <td>{o.itemCount}</td>
                  <td className="text-right">{taka(o.totalAmount)}</td>
                  <td className="px-4">
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o, e.target.value)}
                      className="border border-neutral-300 rounded px-2 py-1 text-sm"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500">
                    No orders found.
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
