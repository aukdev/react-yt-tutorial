import { useSelector } from "react-redux";
import { selectByIdUsers } from "../store/reducers/users";

const Post = ({ ele }) => {
  const user = useSelector((store) => selectByIdUsers(store, ele.userId));
  
  return (
    <div>
      <h1>{ele.title}</h1>
      <p>{user?.name}</p>
    </div>
  );
};

export default Post;
