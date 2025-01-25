import { useMemo } from "react";
import { Link } from "react-router-dom";

export const defaultAuthorImageUrl = "http://i.imgur.com/N4VcUeJ.jpg";

export interface AuthorImageProps {
  imageUrl?: string;
  /**
   * img tag className
   */
  className?: string;
  /**
   * If used image is wrapped with react-router Link component
   */
  to?: string;
}

const AuthorImage = ({ imageUrl, to, className }: AuthorImageProps): JSX.Element => {
  const imgTag = useMemo(
    () => <img src={imageUrl || defaultAuthorImageUrl} className={className} />,
    [imageUrl, className]
  );

  if (to) {
    return <Link to={to}>{imgTag}</Link>;
  }

  return imgTag;
};

export default AuthorImage;
