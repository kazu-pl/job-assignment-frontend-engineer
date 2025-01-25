import { selectProfile } from "features/profiles/store/profilesSlice.selectors";
import { followProfile, unfollowProfile } from "features/profiles/store/profilesSlice.thunks";
import { useAppDispatch, useAppSelector } from "store/hooks";

const FollowProfileBtn = (): JSX.Element => {
  const { data } = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  const handleToggleFollowingStatus = () => {
    if (!data) return;

    if (data.profile.following) {
      dispatch(unfollowProfile(data.profile.username));
    } else {
      dispatch(followProfile(data.profile.username));
    }
  };
  // TODO: I didn't display follow count because seems like API doesn't return that info or I could not find it
  return (
    <button
      className={`btn btn-sm ${data?.profile.following ? "btn-secondary" : "btn-outline-secondary"} action-btn`}
      onClick={handleToggleFollowingStatus}
    >
      {data?.profile.following ? (
        <>
          <i className="ion-minus-round" />
          &nbsp; Unfollow {data.profile.username}
        </>
      ) : (
        <>
          <i className="ion-plus-round" />
          &nbsp; Follow {data?.profile.username}
        </>
      )}
    </button>
  );
};

export default FollowProfileBtn;
