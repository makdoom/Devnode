import { logoutUser } from "@/api/user";
import { useMutation } from "react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
