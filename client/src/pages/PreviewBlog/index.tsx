import { useParams } from "react-router";

const PreviewBlog = () => {
  const params = useParams();

  console.log(params);

  return <div>PreviewBlog</div>;
};
export default PreviewBlog;
