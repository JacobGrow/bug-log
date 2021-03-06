import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async find(query = {}) {
    let data = await dbContext.Bugs.find(query).populate(
      "creator",
      "name picture"
    );
    return data;
  }

  async getById(id, userEmail) {
    let data = await dbContext.Bugs.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this bug")
    }
    return data
  }

  async findById(id) {
    let data = await dbContext.Bugs.findById(id).populate(
    "creator",
    "name picture")
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
    return data;
  }

  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }

  async edit(update) {
    let data = await dbContext.Bugs.findByIdAndUpdate( update.id, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this bug");
    }
    return data;
  }


  async deleteBug(bugId){
    let data = await dbContext.Bugs.findByIdAndDelete({_id: bugId})
    if(!data){
      throw new BadRequest("Invalid Id")
    }
  }
}

export const bugsService = new BugsService();
