import "dotenv/config";
import express, { Request,Response,NextFunction } from "express";
import noteRouts from "./routes/notes";
import morgan from "morgan";
import createHttpError,{isHttpError} from "http-errors";
import cors from 'cors';
import userRoutes from "./routes/users";

const app = express();

app.use(cors());
app.use(morgan("dev"));


app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes",noteRouts);

app.use((req,res,next)=>{
    next(createHttpError(404,"לא נמצא"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
  let errorMessage = "שגיאה התרחשה";
  let statusCode = 500;
  if (isHttpError(error)){
    statusCode= error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
