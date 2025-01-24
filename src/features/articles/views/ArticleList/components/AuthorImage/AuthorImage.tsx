import APP_PATHS from "constants/appPaths";
import { Link } from "react-router-dom";

export const defaultAuthorImageUrl = "http://i.imgur.com/N4VcUeJ.jpg";

export interface AuthorImageProps {
  name: string;
  imageUrl?: string;
}

const AuthorImage = ({ name, imageUrl }: AuthorImageProps): JSX.Element => {
  return (
    <Link to={APP_PATHS.PROFILE_SINGLE(name)}>
      <img src={imageUrl || defaultAuthorImageUrl} />
    </Link>
  );
};

export default AuthorImage;
