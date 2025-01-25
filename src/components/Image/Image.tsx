export const defaultAuthorImageUrl = "http://i.imgur.com/N4VcUeJ.jpg";

export interface ImageProps {
  url?: string;
  className?: string;
}

const Image = ({ className, url }: ImageProps): JSX.Element => {
  return <img src={url || defaultAuthorImageUrl} className={className} />;
};

export default Image;
