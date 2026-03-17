import { useState } from "react";
import { MdNotificationsActive, MdNotificationsPaused } from "react-icons/md";
// import { MdNotificationsActive } from "react-icons/md";
// import { MdNotificationsPaused } from "react-icons/md";
import { useNotifications } from "../../services/notificationService";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();

  return (
    <div className="relative">
      {/* Bell Icon & Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all active:scale-90"
      >
        {unreadCount > 0 ? (
          <>
            <MdNotificationsActive size={24} className="" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900">
              {unreadCount}
            </span>
          </>
        ) : (
          <MdNotificationsPaused size={24} className="" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] shadow-2xl z-50 overflow-hidden ring-1 ring-black/5">
            <div className="p-4 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="font-black text-xs uppercase tracking-widest text-gray-500">Notifications</h3>
              {unreadCount > 0 && <span className="text-[10px] font-bold text-[#10B981]">{unreadCount} New</span>}
            </div>

            <div className="max-h-[380px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-sm text-gray-400 font-medium">No notifications yet.</p>
                </div>
              ) : (
                notifications.map((notif: any) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      if (!notif.isRead) markAsRead(notif.id);
                    }}
                    className={`p-4 border-b border-gray-50 dark:border-gray-800 cursor-pointer transition-colors ${
                      !notif.isRead ? "bg-emerald-50/20 dark:bg-emerald-500/5" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex justify-between gap-3">
                      <p className={`text-sm leading-snug ${!notif.isRead ? "font-bold text-gray-900 dark:text-gray-100" : "text-gray-500"}`}>
                        {notif.message}
                      </p>
                      {!notif.isRead && (
                        <div className="w-2 h-2 bg-[#10B981] rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;