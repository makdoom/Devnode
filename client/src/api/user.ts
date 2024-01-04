import { RegisterType } from "@/types/user.types";
import Axios from "./interceptor";

export const register = async (payload: RegisterType) =>
  Axios.post("/users/register", payload);
