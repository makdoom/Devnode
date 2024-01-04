import { register } from "@/api/user";
import { RegisterType } from "@/types/user.types";
import { useMutation } from "react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterType) => register(payload),
    onMutate: () => {
      console.log("Mutate");
    },
    onSuccess: () => {
      console.log("Mutation succesfull");
    },
    onError: () => {
      console.log("error");
    },
  });
};
