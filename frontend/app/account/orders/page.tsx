"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

type OrderStatus = "Confirmed" | "Shipped" | "Delivered" | "Cancelled";

interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

interface Order {
  number: string;
  date: string;
  total: number;
  estimatedDelivery?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  status?: string;
  placedDate?: string;
}

const statusConfig: Record<string, { color: string; label: string }> = {
  "Confirmed": { color: "bg-blue-50 text-blue-700", label: "Confirmed" },
  "Shipped": { color: "bg-yellow-50 text-yellow-700", label: "Shipped" },
  "Delivered": { color: "bg-green-50 text-green-700", label: "Delivered" },
  "Cancelled": { color: "bg-red-50 text-red-700", label: "Cancelled" }
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    setIsLoggedIn(true);

    // Load orders from localStorage
    try {
      const stored = localStorage.getItem("topline_orders");
      const loadedOrders = stored ? JSON.parse(stored) : [];
      setOrders(loadedOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  }, [router]);

  if (!isLoggedIn) {
    return null;
  }

  const filteredOrders = selectedFilter === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedFilter);

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
          {(["all", "Confirmed", "Shipped", "Delivered", "Cancelled"] as const).map(filter => {
            const isActive = selectedFilter === filter;
            const label = filter === "all" ? "All" : filter;
            
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
              <p className="text-neutral-700">No orders found. Start shopping to place your first order!</p>
              <Link
                href="/products"
                className="mt-4 inline-block rounded-full bg-neutral-900 px-6 py-2 text-sm font-semibold text-white hover:bg-neutral-800 transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            filteredOrders.map((order, index) => {
              const config = statusConfig[order.status || "Confirmed"];
              const itemCount = order.items?.length || 0;
              
              return (
                <div
                  key={index}
                  className="rounded-lg border border-neutral-200 bg-white p-4 md:p-6 transition hover:border-neutral-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-neutral-900">Order {order.number}</p>
                      <p className="text-sm text-neutral-700">{order.date}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${config.color}`}>
                      {config.label}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4 rounded-lg bg-neutral-50 p-3 space-y-2">
                    {order.items?.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="text-sm text-neutral-700">
                        <span className="font-medium text-neutral-900">{item.name}</span>
                        <span className="text-neutral-600"> × {item.quantity}</span>
                      </div>
                    ))}
                    {itemCount > 2 && (
                      <p className="text-xs text-neutral-600">+{itemCount - 2} more item{itemCount - 2 > 1 ? 's' : ''}</p>
                    )}
                  </div>
                  
                  <div className="mb-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                    <div>
                      <p className="text-neutral-700">Items</p>
                      <p className="mt-1 font-medium text-neutral-900">{itemCount}</p>
                    </div>
                    <div>
                      <p className="text-neutral-700">Subtotal</p>
                      <p className="mt-1 font-medium text-neutral-900">৳{order.subtotal.toFixed(0)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-700">Estimated Delivery</p>
                      <p className="mt-1 font-medium text-neutral-900">{order.estimatedDelivery || 'TBD'}</p>
                    </div>
                    <div>
                      <p className="text-neutral-700">Total</p>
                      <p className="mt-1 font-medium text-neutral-900">৳{order.total.toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:border-neutral-900 transition flex-1">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {filteredOrders.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-700">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
