import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import ProductRoute from "./router/routes";
import cors from "cors";
// import {sessionConfig} from "./utils/sessionConfig";
// import session from "express-session";

const app = express();

app.use(cors());

dotenv.config();
app.use(morgan("dev"));
app.use(express.json());

app.use("/", ProductRoute);

// handling error for route that doesn't exist
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint Not Found"));
});

//error handling
// app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
//   console.log(error);

//   let errorMessage = "Something went wrong. An unknown error occurred.";
//   let statusCode = 500;
//   if (isHttpError(error)) {
//     statusCode = error.status;
//     errorMessage = error.message;
//   }
//   res.status(statusCode).json({ error: errorMessage });
// });
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  let errorMessage = "Something went wrong. An unknown error occurred.";
  let statusCode = 500;

  // Check for PrismaClientKnownRequestError specifically
  if (error instanceof PrismaClientKnownRequestError) {
    statusCode = 404; // Set the status code to 404 for the "Not Found" scenario
    errorMessage = "Product not found"; // Customize the error message for the "Not Found" scenario
  } else if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage }); // sent in json format
  // res.status(statusCode).send(errorMessage); // Send the error to the client only message sent
});

export default app;
