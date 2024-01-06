import {
  LoginResponseType,
  LoginType,
  RegisterType,
  User,
} from "@/types/user.types";
import Axios from "./interceptor";

export const register = async (payload: RegisterType) =>
  Axios.post<User>("/user/register", payload);

export const login = async (payload: LoginType) =>
  Axios.post<LoginResponseType>("/user/login", payload);

export const logoutUser = async () => Axios.get("/user/logout");

export const getUser = async () => Axios.get<User>("/user");
