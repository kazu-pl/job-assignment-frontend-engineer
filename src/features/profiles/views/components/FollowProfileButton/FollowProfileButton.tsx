import { followProfile, selectProfile, unfollowProfile } from "features/profiles/store/profilesSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const FollowProfileButton = (): JSX.Element => {
  const { data, isLoading } = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  const handleToggleFollowingStatus = () => {
    if (!data) return;

    if (data.profile.following) {
      dispatch(unfollowProfile(data.profile.username));
    } else {
      dispatch(followProfile(data.profile.username));
    }
  };

  if (isLoading || !data) return <></>;

  return (
    <button className="btn btn-sm btn-outline-secondary action-btn" onClick={handleToggleFollowingStatus}>
      {data.profile.following ? (
        <>
          <i className="ion-minus-round" />
          &nbsp; Unfollow {data.profile.username}
        </>
      ) : (
        <>
          <i className="ion-plus-round" />
          &nbsp; Follow {data.profile.username}
        </>
      )}
    </button>
  );
};

export default FollowProfileButton;
