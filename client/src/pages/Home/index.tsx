import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  console.log(Cookies.get("isAuthenticated"));
  return (
    <div className="h-[calc(100vh-55px)] relative">
      <div className="h-full flex justify-center flex-col items-center text-center mx-2">
        <h1 className="text-3xl sm:text-5xl font-bold">
          Empowering Software Developers <br /> through Blogging
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground">
          Where developers connect, code, and conquer together"
        </p>

        <Link to="/feeds">
          <Button className="mt-10" size="lg">
            Go to Feeds
            <MoveRight className="ml-3 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="fixed bottom-0 left-0 flex justify-center w-full py-1 text-muted-foreground text-sm">
        <p>
          Made by{" "}
          <a
            href="http://github.com/makdoom"
            target="_blank"
            className="text-primary"
          >
            Makdoom Shaikh
          </a>{" "}
          with ❤️
        </p>
      </div>
    </div>
  );
};
export default Home;
