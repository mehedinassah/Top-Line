"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: OrderStatus;
  itemCount: number;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-12345",
    date: "March 10, 2026",
    total: 399.99,
    status: "delivered",
    itemCount: 3
  },
  {
    id: "2",
    orderNumber: "ORD-12340",
    date: "March 5, 2026",
    total: 199.99,
    status: "shipped",
    itemCount: 1
  },
  {
    id: "3",
    orderNumber: "ORD-12335",
    date: "February 28, 2026",
    total: 549.98,
    status: "delivered",
    itemCount: 2
  },
  {
    id: "4",
    orderNumber: "ORD-12330",
    date: "February 20, 2026",
    total: 89.99,
    status: "cancelled",
    itemCount: 1
  }
];

const statusConfig: Record<OrderStatus, { color: string; label: string }> = {
  pending: { color: "bg-yellow-50 text-yellow-700", label: "Pending" },
  shipped: { color: "bg-blue-50 text-blue-700", label: "Shipped" },
  delivered: { color: "bg-green-50 text-green-700", label: "Delivered" },
  cancelled: { color: "bg-red-50 text-red-700", label: "Cancelled" }
};

export default function OrdersPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<OrderStatus | "all">("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    setIsLoggedIn(true);
  }, [router]);

  if (!isLoggedIn) {
    return null;
  }

  const filteredOrders = selectedFilter === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/account"
            className="inline-flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-900 transition"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to account
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-neutral-900">Your Orders</h1>
        <p className="mt-2 text-neutral-700">View and manage your orders</p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(["all", "pending", "shipped", "delivered", "cancelled"] as const).map(filter => {
            const isActive = selectedFilter === filter;
            const label = filter.charAt(0).toUpperCase() + filter.slice(1);
            
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        <div className="mt-8 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center">
              <p className="text-neutral-700">No orders found</p>
            </div>
          ) : (
            filteredOrders.map(order => {
              const config = statusConfig[order.status];
              
              return (
                <div
                  key={order.id}
                  className="rounded-lg border border-neutral-200 bg-white p-4 md:p-6 transition hover:border-neutral-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-neutral-900">{order.orderNumber}</p>
                      <p className="text-sm text-neutral-700">{order.date}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  
                  <div className="mb-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-700">Items</p>
                      <p className="mt-1 font-medium text-neutral-900">{order.itemCount}</p>
                    </div>
                    <div>
                      <p className="text-neutral-700">Total</p>
                      <p className="mt-1 font-medium text-neutral-900">${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:border-neutral-900 transition"
                      >
                        View Details
                      </Link>
                      {order.status === "delivered" && (
                        <button className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:border-neutral-900 transition">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {filteredOrders.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-700">
              Showing {filteredOrders.length} of {mockOrders.length} orders
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
