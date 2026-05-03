"use client";

import { useEffect, useState } from "react";

import { TopNav } from "@/components/top-nav";
import { apiRequest } from "@/lib/api";
import { DashboardStats } from "@/lib/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiRequest<DashboardStats>("/dashboard")
      .then(setStats)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <main className="app-shell">
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />
      <TopNav />
      <section className="page-wrap mx-auto max-w-6xl px-4 py-10">
        <div className="hero-panel">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="pill">Team overview</span>
              <h1 className="hero-title">Dashboard</h1>
              <p className="hero-subtitle">
                Track what needs attention, spot delays, and celebrate the work moving fast.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Status</p>
              <p className="text-lg font-semibold text-slate-900">
                {stats ? "Synced" : "Connecting"}
              </p>
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

          {!stats ? (
            <p className="mt-6 text-sm text-slate-600">Loading stats...</p>
          ) : (
            <div className="mt-8 stat-grid md:grid-cols-4">
              <div className="stat-card">
                <p className="stat-label">Total tasks</p>
                <p className="stat-value">{stats.total_tasks}</p>
                <p className="mt-2 text-xs text-slate-500">Across all active projects</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Overdue</p>
                <p className="stat-value text-rose-600">{stats.overdue_tasks}</p>
                <p className="mt-2 text-xs text-slate-500">Needs immediate attention</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Todo</p>
                <p className="stat-value">{stats.by_status.todo ?? 0}</p>
                <p className="mt-2 text-xs text-slate-500">Backlog ready to start</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">In Progress + Done</p>
                <p className="stat-value">
                  {(stats.by_status.in_progress ?? 0) + (stats.by_status.done ?? 0)}
                </p>
                <p className="mt-2 text-xs text-slate-500">Momentum this sprint</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
