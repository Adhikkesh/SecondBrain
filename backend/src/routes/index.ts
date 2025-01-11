import express,{Request,Response,Router} from "express";
import { z } from "zod";
import { User } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router:Router= express.Router();

let JWT_SECRET: string;
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables");
  
}
JWT_SECRET = process.env.JWT_SECRET;
enum Status {
  signedUp = 200,
  errorInInputs = 411,
  alreadyExist = 403,
  serverError = 500,
  doesnotExist = 404,
  incorrectPassword = 403
}

interface user{
  username: string,
  password: string
}

const saltRounds = 10;
async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

const signupZod = z.object({
  username: z.string().min(3).max(10),
  password: z
    .string()
    .min(8)
    .max(20)
    .refine((p) => /[A-Z]/.test(p))
    .refine((p) => /[a-z]/.test(p))
    .refine((p) => /[!@#%&*()_+\-=\[\]{};':"\\|,.<>\/?^$`~]/.test(p))
    .refine((p) => /[0-9]/.test(p)),
});

router.post("/signup", async (req:Request, res:Response) => {
  const { success, data, error } = signupZod.safeParse(req.body);
  if (!success) {
    res
      .status(Status.errorInInputs)
      .json({ error: "Error in Input", Zoderror: error });
  }

  try {
    const response = await User.findOne({ username: data?.username });
    if (response) {
      res.status(Status.alreadyExist).json({ error: "User Already Exist" });
    }
    let password = data?.password || "";
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      username: data?.username,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    res.status(Status.signedUp).json({ message: "Sucessfully created", token: token });
  } catch (err) {
    console.log(err);
    res.status(Status.serverError).json({ error: "Server Error" });
  }
});

router.post("/signin", async (req:Request, res:Response) => {
  const { success, data, error } = signupZod.safeParse(req.body);
  if (!success) {
    res
      .status(Status.errorInInputs)
      .json({ error: "Error in Input", Zoderror: error });
  }
  let userBody: user = {
    username: "",
    password: ""
  };
  if(data){
    userBody.username =  data.username,
    userBody.password = data.password
  }

  try {
    const response = await User.findOne({ username: userBody.username });
    let signinUser: user = {
      username: "",
      password: ""
    };
    if (!response) {
      res.status(Status.doesnotExist).json({ error: "User is not Exist" });
    }else{
      signinUser.username = response.username;
      signinUser.password = response.password;
    }

    const result = await bcrypt.compare(userBody.password,signinUser.password);
    if(!result){
      res.status(Status.incorrectPassword).json({error: "Incorrect Password"});
    }
    const token = jwt.sign({ id: response?._id }, JWT_SECRET);
    res.status(Status.signedUp).json({ message: "Sucessfully Logged in", token: token });
  } catch (err) {
    console.log(err);
    res.status(Status.serverError).json({ error: "Server Error" + err });
  }
});

router.post("")

export default router;
