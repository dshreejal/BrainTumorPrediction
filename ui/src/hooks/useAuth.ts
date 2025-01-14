import { storageKey } from "@/constants/storageKey";
import * as storage from "@/utils/storage";
export const useAuth = () => {
  const token = storage.get(storageKey.TOKEN);
  //check token exist for auth
  if (token) {
    return true;
  } else {
    return false;
  }
};
