"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStats, DashboardStats } from "@/lib/api";

function taka(n: number) {
  return "৳" + (n ?? 0).toLocaleString("en-BD");
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getStats().then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!stats) return <div className="text-neutral-500">Loading…</div>;

  const cards = [
    { label: "Products", value: stats.totalProducts, href: "/admin/products" },
    { label: "Orders", value: stats.totalOrders, href: "/admin/orders" },
    { label: "Customers", value: stats.totalUsers, href: "/admin/customers" },
    { label: "Revenue", value: taka(stats.totalRevenue), href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="bg-white border border-neutral-200 rounded-lg p-5 hover:shadow-sm transition"
          >
            <div className="text-sm text-neutral-500">{c.label}</div>
            <div className="text-2xl font-bold mt-1">{c.value}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 rounded-lg p-5">
          <h2 className="font-semibold mb-3">Orders by status</h2>
          {Object.keys(stats.ordersByStatus || {}).length === 0 ? (
            <p className="text-sm text-neutral-500">No orders yet.</p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(stats.ordersByStatus).map(([k, v]) => (
                <li key={k} className="flex justify-between text-sm">
                  <span className="text-neutral-600">{k}</span>
                  <span className="font-medium">{v}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg p-5 lg:col-span-2">
          <h2 className="font-semibold mb-3">Recent orders</h2>
          {stats.recentOrders.length === 0 ? (
            <p className="text-sm text-neutral-500">No orders yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500 border-b border-neutral-200">
                  <th className="py-2">#</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-neutral-100">
                    <td className="py-2">{o.id}</td>
                    <td>{o.customerName || o.customerEmail || "—"}</td>
                    <td>{o.status}</td>
                    <td className="text-right">{taka(o.totalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
