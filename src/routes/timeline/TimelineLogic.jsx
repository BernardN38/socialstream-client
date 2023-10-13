import PostApi from "../../backendApi/posts/postApi";
import { useState, useContext } from "react";
import { serverUrl } from "../../backendApi/config";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import AuthContext from "../AuthContext";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertContext from "../AlertContext";
import { useNavigate } from "react-router-dom";
export default function TimelineLogic(userId) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const postApi = PostApi();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { userId: loggedInUserId } = authContext;
  const refresh = () => {
    setPosts([]);
    setLoading(true);
    setPageNo(0);
    getPosts(0);
  };
  const handleDeletePost = (postId) => {
    postApi
      .deletePost(postId)
      .then((resp) => {
        setPosts((prevPosts) => {
          let posts = prevPosts.filter((el) => {
            if (el.key == postId) {
              return false;
            }
            return true;
          });
          return posts;
        });
        alertContext.setAlert({
          message: "Delete Successful!",
          severity: "success",
          open: true,
        });
      })
      .catch((e) => {
        alertContext.setAlert({
          message: "Delete Failed!",
          severity: "error",
          open: true,
        });
        if (e.response.status === 401) {
          navigate("/login");
        }
        return;
      });
  };
  const getPosts = (page = pageNo, clean = false) => {
    postApi.getPosts(userId, page + 1, 6).then((resp) => {
      let postsArr = [];
      resp.posts.map((i, v) => {
        const [time, unit] = calculateTimeDisplay(i.createdAt);
        postsArr.push(
          <Card key={i.id} sx={{ margin: 1, padding: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Avatar src={`${serverUrl}/api/v1/media/users/${i.userId}`} />
              <Box>{i.username}</Box>
              <Box>
                {/* {`${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`} */}
                {`${time}${unit}`}
              </Box>

              {i.userId == loggedInUserId && (
                <IconButton
                  color="error"
                  onClick={() => {
                    handleDeletePost(i.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>

            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
              {i.body}
            </CardContent>
            {i.mediaId.Valid && (
              <img
                width={"100%"}
                src={`${serverUrl}/api/v1/media/${i.mediaId.Int32}`}
              />
            )}
          </Card>
        );
      });
      setLoading(!resp.isLastPage);
      if (clean) {
        setPosts((prevPosts) => [...postsArr]);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...postsArr]);
      }
      setPageNo((pageNo) => page + 1);
    });
  };
  return { posts, loading, getPosts, refresh };
}

const calculateTimeDisplay = (createdAtTime) => {
  const dateObject = new Date(createdAtTime);
  const currentDate = new Date();
  const timeSince1 = dateObject.getTime() - currentDate.getTime();
  const secondsSince = (timeSince1 / 1000) * -1;

  if (secondsSince > 60 * 60 * 24) {
    return [Math.round(secondsSince / 60 / 60 / 24), "d"];
  } else if (secondsSince > 60 * 60) {
    return [Math.round(secondsSince / 60 / 60), "h"];
  } else if (secondsSince > 60) {
    return [Math.round(secondsSince / 60), "m"];
  } else {
    return [Math.round(secondsSince), "s"];
  }
};
