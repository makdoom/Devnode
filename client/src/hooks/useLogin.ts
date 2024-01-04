import { login } from "@/api/user";
import { LoginResponseType, LoginType } from "@/types/user.types";
import { useState } from "react";
import { useMutation } from "react-query";

export const useLogin = () => {
  const [userData, setUserData] = useState<LoginResponseType>(
    {} as LoginResponseType
  );

  const loginMutation = useMutation({
    mutationFn: (payload: LoginType) => login(payload),
    onMutate: () => {
      console.log("Mutate");
    },
    onSuccess: (data) => {
      console.log("Mutation successfull");

      setUserData({ ...data.data });
    },
    onError: () => {
      console.log("error");
    },
  });

  return {
    mutate: loginMutation.mutate,
    isLoading: loginMutation.isLoading,
    error: loginMutation.error,
    userData,
  };
};
