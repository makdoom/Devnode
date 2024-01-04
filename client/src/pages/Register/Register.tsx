import { register } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterType } from "@/types/user.types";
import { ChevronLeft } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState<RegisterType>({} as RegisterType);

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const mutation = useMutation(register, {
    onSuccess: (data) => {
      console.log(`Registeration successfull: ${data}`);
      console.log(data);
    },
    onError: (data) => console.log(`Error: ${data}`),
  });

  const handleRegister = () => {
    console.log(user);
    mutation.mutate(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-[450px] w-full py-10 rounded-sm border p-6 sm:p-12 bg-white text-center sm:text-left ">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Join Us Today
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            We are glad that you joined us
          </p>
        </div>
        <div className="mt-10">
          <div className="rounded-md shadow-sm ">
            <div className="mt-5">
              <Input
                type="text"
                placeholder="Full Name"
                autoFocus
                name="fullName"
                onChange={handleUserChange}
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleUserChange}
              />
            </div>
            <div className="mt-4">
              <Input
                type="email"
                placeholder="Email"
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

          <Button className="w-full mt-8" onClick={handleRegister}>
            Register
          </Button>
          <h2 className="text-muted-foreground text-base mt-4">
            Already have an account ?{" "}
            <Link to="/auth/login" className="text-primary font-medium">
              Login
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
export default Register;
