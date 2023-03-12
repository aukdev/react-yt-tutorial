import { useDispatch } from "react-redux";
import {
  useAddPostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useGetPostsQuery,
} from "./api/postApi";
import { getComments } from "./store/reducers/comments";
import { getUsers } from "./store/reducers/users";

const App = () => {
  const dispatch = useDispatch();

  // const posts = useSelector(selectAllPosts);
  const getUsersHandle = () => dispatch(getUsers());
  const getCommentsHandle = () => dispatch(getComments());
  const [editPost] = useAddPostMutation();

  // console.log(posts[0].comments);
  const {} = useGetPostsQuery();
  console.log("main rerender");
  return (
    <div>
      <br />
      <button onClick={getUsersHandle}>Users</button>
      <br />
      <button onClick={getCommentsHandle}>Comments</button>
      <br />
      <button onClick={() => editPost({ name: "sandu" })}>AddPost</button>
      <div>
        <h1>Posts...</h1>
        <br />
        <H id={0} />
        <H id={1} />
        <H id={2} />
        <H id={3} />
        <H id={4} />
        <H id={5} />
        <H id={6} />
        <H id={7} />
        <H id={8} />
      </div>
    </div>
  );
};

const H = ({ id }) => {
  const { data: myPosts, isSuccess } = useGetPostByIdQuery(id);
  console.log("single element data", myPosts);
  return <h1>{isSuccess && myPosts.name}</h1>;
};

export default App;
