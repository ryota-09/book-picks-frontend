import { useContext } from "react";
import { userContext, UserContextType } from "../providers/userProvider";

export const useCurrentUser = (): UserContextType => {
  return useContext(userContext);
}
