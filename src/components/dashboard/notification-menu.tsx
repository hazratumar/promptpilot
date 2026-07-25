"use client";

import * as React from "react";
import { Bell, Check, Trash2, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { MOCK_NOTIFICATIONS, NotificationItem } from "@/data/dashboard";
import { Badge } from "@/components/ui/badge";

export function NotificationMenu() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const icons = {
    info: <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="right" className="w-80 sm:w-96 p-0 shadow-xl">
        <div className="flex items-center justify-between p-3.5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">Notifications</span>
            {unreadCount > 0 && <Badge variant="default">{unreadCount} new</Badge>}
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="text-2xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <Check className="h-3 w-3" /> Mark all read
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 p-1">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No notifications remaining.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 flex items-start gap-3 rounded-lg transition-colors group ${
                  n.isRead ? "bg-white" : "bg-indigo-50/40 font-medium"
                }`}
              >
                {icons[n.type]}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>{n.title}</span>
                    <span className="text-2xs text-slate-400 font-normal">{n.timestamp}</span>
                  </div>
                  <p className="text-2xs text-slate-600 mt-0.5 leading-relaxed">
                    {n.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => dismissNotification(n.id)}
                  aria-label="Dismiss notification"
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
