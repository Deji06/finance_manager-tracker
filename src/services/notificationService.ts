import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, getUnreadCount, markAsRead } from "../lib/api";
// hooks/useNotifications.ts
export const useNotifications = () => {
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await getNotifications();
      return response.data.data;
    },
  });

  const unreadCountQuery = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      const response = await getUnreadCount();
      return response.data.count; 
    },
    refetchInterval: 60000,
  });

  const readMutation = useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });

  return {
    notifications: notificationsQuery.data || [],
    unreadCount: unreadCountQuery.data || 0,
    markAsRead: readMutation.mutate,
  };
};








// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getNotification, markAsRead, getUnreadNotificationCount } from "../lib/api";


// export const useNotifications = () => {
//     return useQuery({
//         queryKey:['notification'],
//         queryFn: async () => {
//             const response = await getNotification()
//             return response.data
//         }
//     })
// }

// export const useGetNotificationCount = () => {
//     return useQuery({
//         queryKey:['notification'],
//         queryFn: async () => {
//             const response = await getUnreadNotificationCount()
//             return response.data
//         }
//     })
// }