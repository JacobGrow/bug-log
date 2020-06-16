import express from "express";
import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import auth0Provider from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";

export class BugsController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("/:id", this.getById)
      .get("/:id/notes", this.getNotesByBugId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.close)
  }
  async getAll(req, res, next) {
    try {
      //only gets bugs by user who is logged in
      let data = await bugsService.find(req.query)
      return res.send(data)
    }
    catch (error) { 
    next(error) }
  }

  async getById(req, res, next) {
    try {
      let data = await bugsService.findById(req.params.id);
      return res.send(data);
    } catch (error) {
      
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      let data = await notesService.findAll({bugId: req.params.id})
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await bugsService.create(req.body)
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      let data = await bugsService.edit(req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async close(req, res, next) {
    try {
     let data = await bugsService.close(
       req.params.id,
       req.userInfo.email,
       req.body
     );
     return res.send(data)
    } catch (error) { next(error) }
  }
}