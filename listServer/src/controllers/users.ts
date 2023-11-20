import { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import UserModal from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";

const generateToken = (userId: string | ObjectId) => {
  const secretKey = env.SECRET_KEY;
  return jwt.sign({ userId: userId.toString() }, secretKey, {
    expiresIn: "1h",
  });
};


export const signUp: RequestHandler = async (req, res, next) => {
  const {
    username,
    email,
    password,
  }: { username?: string; email?: string; password?: string } = req.body;

  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "חסר פרמטרים!");
    }
    const existUsername = await UserModal.findOne({
      username: username,
    }).exec();
    if (existUsername) {
      throw createHttpError(
        409,
        "שם המשתמש קיים כבר בבקשה תבחר שם אחר או התחבר במקום!"
      );
    }
    const existEmail = await UserModal.findOne({ email: email }).exec();
    if (existEmail) {
      throw createHttpError(
        409,
        "האימייל קיים כבר בבקשה תבחר אמייל אחר או התחבר עם מייל זה!"
      );
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = await UserModal.create({
      username: username,
      email: email,
      password: passwordHashed,
    });
    const token = generateToken(newUser._id);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    next(error);
  }
};

export const login : RequestHandler = async (req,res,next) => {
    const {username, password} : {username?:string, password?:string} = req.body;
    console.log("-------------------------------------hello");
    
    try {
        if(!username || !password){
            throw createHttpError(400, "חסר פרמטרים!");
        }
        // const user = await UserModal.findOne({ username }).exec();
        const user = await UserModal.findOne({ username }).select("+password").exec();
        if(!user){
            throw createHttpError(401, "שם המשתמש או הסיסמה שגויים!");
        }
        console.log(user);
        

        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            throw createHttpError(401, "שם המשתמש או הסיסמה שגויים!");
        } 
        const token = generateToken(user._id);
        res.json({ user, token });

    } catch (error) {
        next(error);
    }
}

export const logout: RequestHandler = async (req,res) => {
    res.status(200).json({ message: "ההתנתקות בוצעה בהצלחה" });

}