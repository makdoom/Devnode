import { getUser } from "@/api/user";
import { useQuery } from "react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: "GetUser",
    queryFn: getUser,
  });
};
