import { RootState } from "store";
import { ProfilesState } from "./profilesSlice";

export const selectProfile = (state: RootState): ProfilesState["profile"] => state.profiles.profile;
export const selectArticlesWrittenByProfile = (state: RootState): ProfilesState["articles"] => state.profiles.articles;
