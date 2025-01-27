import APP_PATHS from "constants/appPaths";
import { logoutUser } from "features/user/store/userSlice";
import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "store/hooks";

export default function Logout(): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useLayoutEffect(() => {
    dispatch(logoutUser());
    history.push(APP_PATHS.ARTICLE_LIST);
  }, [dispatch, history]);

  return <></>;
}
