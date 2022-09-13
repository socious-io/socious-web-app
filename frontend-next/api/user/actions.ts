import { UpdateProfileBodyType } from "@models/user";
import { put } from "utils/request";

export function updateProfile(profileBody: UpdateProfileBodyType) {
  return put("/api/v2/user/profile", profileBody);
}