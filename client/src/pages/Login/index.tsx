import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/storeHook";
import { useLogin } from "@/hooks/useLogin";
import { setAuthUser } from "@/store/reducers/authReducer";
import { LoginType } from "@/types/user.types";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState<LoginType>({} as LoginType);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate, userData, isLoading } = useLogin();

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleLogin = () => {
    mutate(user);
  };

  if (userData.statusCode === 200) {
    dispatch(setAuthUser(userData.data.loggedInUser));
    Cookies.set("isAuthenticated", "true", { expires: 1 });
    // navigate("/feeds");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-[450px] w-full py-10 rounded-sm border p-6 sm:p-12 bg-white text-center sm:text-left">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Continue your Blogging journey with{" "}
            <span className="text-primary font-medium">Devnode</span>
          </p>
        </div>
        <div className="mt-10">
          <div className="rounded-md shadow-sm ">
            <div className="mt-5">
              <Input
                type="text"
                placeholder="Email"
                autoFocus
                name="email"
                onChange={handleUserChange}
              />
            </div>

            <div className="mt-4">
              <Input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleUserChange}
              />
            </div>
          </div>

          <Button
            className="w-full mt-8"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <h2 className="text-muted-foreground text-base mt-4">
            Don't have an account ?{" "}
            <Link to="/auth/register" className="text-primary font-medium">
              Register
            </Link>
          </h2>
        </div>
      </div>

      <Button variant="link" className="absolute top-2 left-2 ">
        <Link to="/" className="flex items-center justify-center">
          <ChevronLeft className="h-4 w-4" />
          Go Back
        </Link>
      </Button>
    </div>
  );
};
export default Login;
