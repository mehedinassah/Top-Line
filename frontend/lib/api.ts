// Lightweight API client for the Top-Line backend.
// Base URL comes from NEXT_PUBLIC_API_BASE_URL (see .env.local).

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

const TOKEN_KEY = "topline_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

type Options = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

/** Core request helper. Throws Error(message) on non-2xx. */
export async function api<T = any>(path: string, opts: Options = {}): Promise<T> {
  const { method = "GET", body, auth = false } = opts;
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data: any = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      (res.status === 401 || res.status === 403
        ? "You are not authorised. Please sign in as an admin."
        : `Request failed (${res.status})`);
    throw new Error(message);
  }
  return data as T;
}

// ---- Types (mirror the backend) ----
export interface ProductColor {
  name: string;
  code: string;
}
export interface Variant {
  size: string;
  color: ProductColor;
  sku: string;
  inStock: boolean;
  quantity: number;
}
export interface ProductDescription {
  story?: string;
  highlights?: string[];
  trustSignals?: string[];
  fabricBuild?: { description?: string; composition?: string[] };
  fitAndSizing?: { fit?: string; model?: string; sizing?: string };
  whyYouLoveIt?: string[];
  careInstructions?: string[];
}
export interface Product {
  id?: number;
  name: string;
  price: number;
  discountPrice?: number | null;
  rating?: number;
  category: string;
  collection: string;
  inStock?: boolean;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  variants: Variant[];
  description?: ProductDescription;
}

// ---- Auth ----
export async function login(email: string, password: string) {
  const data = await api<{ token: string }>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setToken(data.token);
  return data;
}

export async function register(name: string, email: string, password: string) {
  const data = await api<{ token: string }>("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
  setToken(data.token);
  return data;
}

// ---- Products (public reads, admin writes) ----
export async function listProducts(): Promise<Product[]> {
  const res = await api<{ data: Product[] }>("/products");
  return res.data;
}
export async function getProduct(id: number | string): Promise<Product> {
  const res = await api<{ data: Product }>(`/products/${id}`);
  return res.data;
}
export async function createProduct(p: Product): Promise<Product> {
  const res = await api<{ data: Product }>("/products", {
    method: "POST",
    body: p,
    auth: true,
  });
  return res.data;
}
export async function updateProduct(id: number, p: Product): Promise<Product> {
  const res = await api<{ data: Product }>(`/products/${id}`, {
    method: "PUT",
    body: p,
    auth: true,
  });
  return res.data;
}
export async function deleteProduct(id: number): Promise<void> {
  await api(`/products/${id}`, { method: "DELETE", auth: true });
}

// ---- Orders (storefront, requires a logged-in customer) ----
export interface OrderItemInput {
  product: { id: number };
  quantity: number;
  size?: string;
  color?: string;
  price: number;
}
export interface PlaceOrderInput {
  totalAmount: number;
  shippingInfo?: string;
  items: OrderItemInput[];
}
export interface MyOrder {
  id: number;
  status: string;
  totalAmount: number;
  createdDate: string;
  deliveryDate?: string;
  shippingInfo?: string;
  items?: any[];
}

export async function placeOrder(input: PlaceOrderInput): Promise<MyOrder> {
  const res = await api<{ data: MyOrder }>("/orders", {
    method: "POST",
    body: input,
    auth: true,
  });
  return res.data;
}

export async function getMyOrders(): Promise<MyOrder[]> {
  const res = await api<{ data: MyOrder[] }>("/orders", { auth: true });
  return res.data;
}

// ---- Admin ----
export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  recentOrders: AdminOrder[];
}
export interface AdminOrder {
  id: number;
  status: string;
  totalAmount: number;
  createdDate: string;
  deliveryDate?: string;
  itemCount: number;
  customerName?: string;
  customerEmail?: string;
}
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export async function getStats(): Promise<DashboardStats> {
  const res = await api<{ data: DashboardStats }>("/admin/stats", { auth: true });
  return res.data;
}
export async function listOrders(status?: string): Promise<AdminOrder[]> {
  const q = status ? `?status=${encodeURIComponent(status)}` : "";
  const res = await api<{ data: AdminOrder[] }>(`/admin/orders${q}`, { auth: true });
  return res.data;
}
export async function updateOrderStatus(id: number, status: string): Promise<void> {
  await api(`/admin/orders/${id}/status`, {
    method: "PUT",
    body: { status },
    auth: true,
  });
}
export async function listUsers(): Promise<AdminUser[]> {
  const res = await api<{ data: AdminUser[] }>("/admin/users", { auth: true });
  return res.data;
}
