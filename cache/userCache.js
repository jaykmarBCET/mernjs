// /cache/userCache.js
import NodeCache from "node-cache";
import { UserModel } from "../models/userModel.js";

const cache = new NodeCache({ stdTTL: 300 }); // 5 min TTL

const getUserFromCache = async (userId) => {
  const cachedUser = cache.get(userId);
  if (cachedUser) {
    return cachedUser;
  }

  const user = await UserModel.findById(userId).select("-password");
  if (user) {
    cache.set(userId, user);
  }
  return user;
};

const updateUserInCache = (userId, newUserData) => {
  cache.set(userId, newUserData);
};

const deleteUserFromCache = (userId) => {
  cache.del(userId);
};

export {
  getUserFromCache,
  updateUserInCache,
  deleteUserFromCache,
};
