import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const packSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    packName: {
      type: String,
      required: true,
      unique: true,
    },
    packImageUrl: {
      type: String,
      required: true,
    },
  },
  {
    collection: "packs",
  }
);

/**
 * @param {String} packName
 * @param {String} packImageUrl
 * @returns {Object} new pack object created
 */
packSchema.statics.createPack = async function (packName, packImageUrl) {
  try {
    const pack = await this.create({ packName, packImageUrl });
    return pack;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} packId, pack id
 * @return {Object} Pack profile object
 */
packSchema.statics.getPackById = async function (packId) {
  try {
    const pack = await this.findOne({ _id: packId });
    if (!pack) throw ({ error: 'No pack with this id found' });
    return pack;
  } catch (error) {
    throw error;
  }
}

/**
 * @return {Array} List of all packs
 */
packSchema.statics.getPacks = async function () {
  try {
    const pack = await this.find();
    return pack;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("Pack", packSchema);
