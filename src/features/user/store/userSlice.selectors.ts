import { RootState } from "store";
import { UserResponse } from "types/conduit-api.types";

export const selectUserData = (state: RootState): UserResponse | null => state.user.data;
