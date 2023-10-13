// import { useContext } from "react";
import ProfileHeader from "../../shared/profileHeader/ProfileHeader";
import Timeline from "../timeline/Timeline";
import { useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import { Box, Card, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import CreatePostModal from "../../shared/createPostModal/CreatePostModal";
import AuthContext from "../AuthContext";
export default function PublicProfile() {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [postCreatedCount, setPostCreatedCount] = useState(0);
  const authContext = useContext(AuthContext);
  const { userId: loggedInUserId } = authContext;

  return (
    <div>
      <ProfileHeader userId={userId} />
      <Timeline userId={userId} postCreatedCount={postCreatedCount} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loggedInUserId === userId && (
          <Fab
            style={{
              position: "fixed",
              bottom: 20,
              zIndex: 1000,
            }}
          >
            <AddIcon onClick={handleOpen} />
          </Fab>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              padding: "1rem",
            }}
          >
            <CreatePostModal setPostCreatedCount={setPostCreatedCount} />
          </Box>
        </Modal>
      </Box>
    </div>
  );
}
