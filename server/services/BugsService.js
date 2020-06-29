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

  async close(id, userEmail, update) {
    update.closed = true;
    update.closingDate = new Date();
// Should be findOneAndUpdate
    let data = await dbContext.Bugs.findOneAndUpdate({
      _id: id, creatorEmail: userEmail },
      update,
      { new: true }
    );
    if (!data){
      throw new BadRequest("Invalid ID")
    }
    return data;
  }

  async delete(id, userEmail, update) {
    update
  }
}

export const bugsService = new BugsService();
