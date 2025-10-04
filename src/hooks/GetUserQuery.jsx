// src/hooks/useUser.js
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../Context_APIs/ApiContext";

const fetchUser = async (userId, baseUrl) => {
  // console.log("Fetching user with ID:", userId);

  const res = await fetch(`${baseUrl}/api/user/auth/get-user?userId=${userId}`);
  
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const useUserQuery = (userId) => {
  const { baseUrl } = useApi();

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId, baseUrl),
    enabled: !!userId, // only fetch when userId exists
    staleTime: 1000 * 60 * 5, // cache 5 mins
    retry: 1,
  });
};
