import MediaApi from "../../backendApi/media/mediaApi";
import { serverUrl } from "../../backendApi/config";

export default function NavbarLogic(userId) {
  const profileImageSrc = `${serverUrl}/api/v1/media/users/${userId}`;

  return { profileImageSrc };
}
