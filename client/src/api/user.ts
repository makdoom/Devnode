import {
  LoginResponseType,
  LoginType,
  RegisterResponseType,
  RegisterType,
} from "@/types/user.types";
import Axios from "./interceptor";

export const register = async (payload: RegisterType) =>
  Axios.post<RegisterResponseType>("/users/register", payload);

export const login = async (payload: LoginType) =>
  Axios.post<LoginResponseType>("/users/login", payload);
