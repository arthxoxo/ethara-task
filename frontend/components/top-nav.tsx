"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { apiRequest } from "@/lib/api";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" }
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="brand-text">
            Ethara<span className="brand-dot">.</span>
          </Link>
          <nav className="flex items-center gap-4">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "nav-link nav-link-active" : "nav-link"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          type="button"
          onClick={async () => {
            await apiRequest("/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
          }}
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
