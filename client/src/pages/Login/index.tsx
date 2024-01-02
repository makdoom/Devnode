import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
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
        <form className="mt-10">
          <div className="rounded-md shadow-sm ">
            <div className="mt-5">
              <Input type="text" placeholder="Username" autoFocus />
            </div>

            <div className="mt-4">
              <Input type="password" placeholder="Password" />
            </div>
          </div>

          <Button className="w-full mt-8">Login</Button>
          <h2 className="text-muted-foreground text-base mt-4">
            Don't have an account ?{" "}
            <Link to="/auth/register" className="text-primary font-medium">
              Register
            </Link>
          </h2>
        </form>
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
