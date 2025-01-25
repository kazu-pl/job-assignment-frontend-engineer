import Image from "components/Image";
import { Link } from "react-router-dom";

export interface AuthorImageProps {
  imageUrl?: string;
  to: string;
  username: string;
  createdAt: string;
}

const AuthorImage = ({ imageUrl, to, username, createdAt }: AuthorImageProps): JSX.Element => {
  return (
    <div style={{ display: "inline-block" }}>
      <Link to={to}>
        <Image url={imageUrl} />
      </Link>

      <div className="info">
        <Link to={to} className="author text-primary">
          {username}
        </Link>

        <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default AuthorImage;
