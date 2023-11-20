import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    console.log("genNotes");
    const notes = await NoteModel.find().exec();
    console.log(notes);
    
    res.status(200).json(notes);
  } catch (error) {
    console.log("ERROR GETNOTES");
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  console.log(req.params.noteId);
  const noteId = req.params.noteId;

  
  try {
  

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "ההערה לא נמצאה!");
    }
    console.log("daniel");
    
    console.log(note);
    
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNote {
  title?: string;
  text?: string;
}

export const CreateNote: RequestHandler<
  unknown,
  unknown,
  CreateNote,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title || !text) {
      throw createHttpError(400, "חייב למלא את כל השדות!");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const UpdateNote: RequestHandler = async (req, res, next) => {
  const {_id, title, text }: { _id?: string; title?: string; text?: string } =
    req.body;
  try {
    if (!_id) {
      throw createHttpError(404, "לא ניתן לעדכן");
    }
    const updateNote = await NoteModel.updateOne({
      title: title,
      text: text,
    });
    console.log(updateNote);

    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};


export const deleteNote: RequestHandler = async (req, res, next) => {
    const {noteId}: {noteId: string} = req.body;
    try {
        if(!noteId){
            throw createHttpError(404, "לא ניתן למחוק!");
        }
        const removeNote = await NoteModel.deleteOne(({ _id: noteId }));
        res.status(200).json(removeNote);
        
    } catch (error) {
        next(error);
    }
}