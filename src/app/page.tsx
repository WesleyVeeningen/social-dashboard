"use client";

import { useState } from "react";
import {
  BarChart3,
  Users,
  MessageSquare,
  Heart,
  Share2,
  Plus,
  RefreshCcw,
  ChevronDown,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
            Social Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Multi-account overview for Facebook, Instagram, and X
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <ChevronDown className="h-4 w-4" />
            <span>All accounts</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-white"
          >
            <Plus className="h-4 w-4" />
            Add account
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total followers" value="124,352" icon={<Users className="h-4 w-4" />} />
        <StatCard title="Avg. engagement" value="4.2%" icon={<Heart className="h-4 w-4" />} />
        <StatCard title="Total posts" value="1,049" icon={<BarChart3 className="h-4 w-4" />} />
        <StatCard title="Comments" value="3,821" icon={<MessageSquare className="h-4 w-4" />} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 lg:col-span-2">
          <h2 className="text-base font-medium text-slate-200">Unified feed</h2>
          <p className="mt-1 text-sm text-slate-400">
            Posts from connected Facebook, Instagram, and X accounts
          </p>

          <div className="mt-4 divide-y divide-slate-800">
            <FeedRow platform="facebook" title="Summer campaign launch" comments={18} shares={92} />
            <FeedRow platform="instagram" title="Behind the scenes Reel" comments={64} />
            <FeedRow platform="x" title="Product update thread" comments={41} shares={17} />
            <FeedRow platform="facebook" title="Customer spotlight" comments={9} shares={3} />
          </div>
        </div>

        <div className="space-y-4">
          <ConnectedAccounts />
          <ReplyInbox />
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-200">
          {icon}
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function platformStyles(platform: string) {
  switch (platform) {
    case "facebook":
      return "bg-fb";
    case "instagram":
      return "bg-ig";
    case "x":
      return "bg-x";
    default:
      return "bg-slate-500";
  }
}

function FeedRow({ platform, title, comments, shares }: { platform: string; title: string; comments: number; shares?: number }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <span className={`h-8 w-8 rounded-full ${platformStyles(platform)}`} />
        <div>
          <p className="text-sm font-medium text-slate-200">{title}</p>
          <p className="text-xs text-slate-500 capitalize">{platform}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1">
          <MessageSquare className="h-3.5 w-3.5" />
          {comments}
        </span>
        {shares !== undefined ? (
          <span className="inline-flex items-center gap-1">
            <Share2 className="h-3.5 w-3.5" />
            {shares}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ConnectedAccounts() {
  const accounts = [
    { name: "Acme Co.", platform: "facebook" },
    { name: "@acme_store", platform: "instagram" },
    { name: "Acme Dev", platform: "x" },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <h3 className="text-sm font-medium text-slate-200">Connected accounts</h3>
      <ul className="mt-3 space-y-2">
        {accounts.map((account) => (
          <li key={`${account.platform}-${account.name}`} className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-900 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${platformStyles(account.platform)}`} />
              <span className="text-sm text-slate-200">{account.name}</span>
            </div>
            <span className="text-xs text-slate-500 capitalize">{account.platform}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReplyInbox() {
  const rows = [
    { id: 1, from: "Alice", text: "When does the sale end?", time: "2m" },
    { id: 2, from: "Bob", text: "Love this post 🔥", time: "11m" },
    { id: 3, from: "Carol", text: "Is this available in EU?", time: "34m" },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <h3 className="text-sm font-medium text-slate-200">Reply inbox</h3>
      <ul className="mt-3 space-y-3">
        {rows.map((row) => (
          <li key={row.id} className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-200">{row.from}</p>
              <span className="text-xs text-slate-500">{row.time}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{row.text}</p>
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-1 rounded-md border border-slate-800 px-2 py-1 text-xs text-slate-200 hover:bg-slate-800"
            >
              Reply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
