import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import "../../admin-styles.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "De'Hydra Admin | Dashboard",
  description: "Admin dashboard for managing products and client requests",
};

async function checkAuth() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await checkAuth();

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>De&apos;Hydra Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <Link href="/admin" className="nav-link">
            Dashboard
          </Link>
          <Link href="/admin/products" className="nav-link">
            Products
          </Link>
          <Link href="/admin/requests" className="nav-link">
            Client Requests
          </Link>
        </nav>
        <div className="sidebar-footer">
          <p className="user-info">{session.user.email}</p>
          <form action="/api/auth/sign-out" method="POST">
            <button type="submit" className="logout-btn">
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
