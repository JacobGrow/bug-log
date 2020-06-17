import express from "express";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesService";
import { bugsService } from "../services/BugsService";
import auth0Provider from "@bcwdev/auth0provider";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes");
    this.router
      .get("", this.find)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("/:bugId", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
  }
  async find(req, res, next) {
    try {
      let data = await notesService.findAll(req.body)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email
      let data = await notesService.create(req.body);
      return res.status(201).send(data)
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await notesService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next (error);
      }
    }

  async delete(req, res, next) {
    try {
      await notesService.delete(req.params.id);
      return res.send("Deleted")
    } catch (error) {
      next(error)
    }
  }
}
  
