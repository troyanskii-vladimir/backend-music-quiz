import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const questionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    packId: String,
    audioFileUrl: {
      type: String,
      required: true,
      unique: true,
    },
    song: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
  },
  {
    collection: "questions",
  }
);

/**
 * This method will create a post in chat
 *
 * @param {String} packId - id of pack
 * @param {String} audioFileUrl - audio url you want to post
 * @param {String} song - name of the song you want to post
 * @param {String} artist - artist of the song you want to post
 */
questionSchema.statics.createQuestion = async function (packId, audioFileUrl, song, artist) {
  try {
    const question = await this.create({
      packId,
      audioFileUrl,
      song,
      artist
    });
    return question;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} packId - id of pack
 */
questionSchema.statics.getQuestionsByPackId = async function (packId) {
  try {
    const questions = await this.find({ packId: packId });
    if (!questions) throw ({ error: 'No questions with this pack id found' });
    return questions;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("Question", questionSchema);
