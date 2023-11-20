import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

router.get("/",NotesController.getNotes);
router.get("/:noteId",NotesController.getNote);
router.post("/", NotesController.CreateNote);
router.patch("/", NotesController.UpdateNote);
router.delete("/", NotesController.deleteNote);


export default router;