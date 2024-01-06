import Cookies from "js-cookie";

const Feeds = () => {
  console.log(Cookies.get("isAuthenticated"));

  return <div>Feeds</div>;
};
export default Feeds;
