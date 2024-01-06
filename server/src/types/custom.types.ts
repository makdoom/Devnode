import { Request } from "express";
import { UserType } from "./user.types";

export type CustomRequest = Request & { user: UserType };
