import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const USER_TYPES = {
  CONSUMER: "consumer",
  SUPPORT: "support",
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    type: String,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

/**
 * @param {String} userName
 * @param {String} passwordHash
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (userName, passwordHash, type) {
  try {
    const user = await this.create({ userName, passwordHash, type });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} userId, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (userId) {
  try {
    const user = await this.findOne({ _id: userId });
    if (!user) throw ({ error: 'No user with this id found' });
    return user;
  } catch (error) {
    throw error;
  }
}

// /**
//  * @return {Array} List of all users
//  */
// userSchema.statics.getUsers = async function () {
//   try {
//     const users = await this.find();
//     return users;
//   } catch (error) {
//     throw error;
//   }
// }

// /**
//  * @param {Array} ids, string of user ids
//  * @return {Array of Objects} users list
//  */
// userSchema.statics.getUserByIds = async function (ids) {
//   try {
//     const users = await this.find({ _id: { $in: ids } });
//     return users;
//   } catch (error) {
//     throw error;
//   }
// }

// /**
//  * @param {String} id - id of user
//  * @return {Object} - details of action performed
//  */
// userSchema.statics.deleteByUserById = async function (id) {
//   try {
//     const result = await this.remove({ _id: id });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

// userSchema.statics.getUserByIds = async function (ids) {
//   try {
//     const users = await this.find({ _id: { $in: ids } });
//     return users;
//   } catch (error) {
//     throw error;
//   }
// }

export default mongoose.model("User", userSchema);
