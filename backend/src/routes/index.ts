import express, { Request, Response, Router } from "express";
import { z } from "zod";
import { Link, Tags, User } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import authMiddelware from "../middelware.js";
import { Content } from "../db.js";
import mongoose from "mongoose";
import crypto from "crypto";
import "dotenv/config";

const router: Router = express.Router();

const BASE_URL = process.env.BASE_URL;

let JWT_SECRET: string;
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables");
}
JWT_SECRET = process.env.JWT_SECRET;
enum Status {
  success = 200,
  signedUp = 200,
  errorInInputs = 411,
  alreadyExist = 403,
  serverError = 500,
  doesnotExist = 404,
  incorrectPassword = 403,
}

interface user {
  username: string;
  password: string;
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

router.post("/signup", async (req: Request, res: Response) => {
  const { success, data, error } = signupZod.safeParse(req.body);
  if (!success) {
    return res
      .status(Status.errorInInputs)
      .json({ error: "Error in Input", Zoderror: error });
  }
  console.log("Signup entered");
  try {
    const response = await User.findOne({ username: data?.username });
    console.log(response);
    if (response) {
      return res
        .status(Status.alreadyExist)
        .json({ error: "User Already Exist" });
    }
    let password = data?.password || "";
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      username: data?.username,
      password: hashedPassword,
    });
    console.log("try end " + newUser);
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    return res
      .status(Status.signedUp)
      .json({ message: "Sucessfully created", token: token });
  } catch (err) {
    console.log(err);
    return res.status(Status.serverError).json({ error: "Server Error" });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const { success, data, error } = signupZod.safeParse(req.body);
  if (!success) {
    return res
      .status(Status.errorInInputs)
      .json({ error: "Error in Input", Zoderror: error });
  }
  let userBody: user = {
    username: "",
    password: "",
  };
  if (data) {
    (userBody.username = data.username), (userBody.password = data.password);
  }

  try {
    const response = await User.findOne({ username: userBody.username });
    let signinUser: user = {
      username: "",
      password: "",
    };
    if (!response) {
      return res
        .status(Status.doesnotExist)
        .json({ error: "User is not Exist" });
    } else {
      signinUser.username = response.username;
      signinUser.password = response.password;
    }

    const result = await bcrypt.compare(userBody.password, signinUser.password);
    if (!result) {
      return res
        .status(Status.incorrectPassword)
        .json({ error: "Incorrect Password" });
    }
    const token = jwt.sign({ id: response?._id }, JWT_SECRET);
    return res
      .status(Status.signedUp)
      .json({ message: "Sucessfully Logged in", token: token });
  } catch (err) {
    console.log(err);
    return res.status(Status.serverError).json({ error: "Server Error" + err });
  }
});

const contentZod = z.object({
  link: z.string().trim().optional(),
  type: z.string(),
  title: z.string(),
  tags: z.array(z.string().trim().min(1)).optional(),
  userId: z.string(),
  body: z.string().optional(),
});

router.post("/content", authMiddelware, async (req: Request, res: Response) => {
  const { success, data, error } = contentZod.safeParse(req.body);
  if (!success) {
    return res
      .status(Status.errorInInputs)
      .json({ error: "Error in Input", details: error });
  }

  console.log(data);
  //@ts-ignore
  const tagPromises = data.tags.map(async (element) => {
    try {
      const existingTag = await Tags.findOne({ title: element });
      return existingTag || Tags.create({ title: element });
    } catch (err) {
      console.error(`Error processing tag: ${element}`, err);
      throw err;
    }
  });
  try {
    const createdTags = await Promise.all(tagPromises);
    const tagArray = createdTags.map((tag) => tag._id);

    let TagInput = {
      link: data?.link,
      type: data?.type,
      title: data?.title,
      tags: tagArray,
      userId: data?.userId,
      date: new Date(),
    };

    if(data?.body){
      //@ts-ignore
      TagInput.body = data.body;
    }

    const response = await Content.create(TagInput);
    return res.status(Status.success).json({ message: "Sucessfull" });
  } catch (err) {
    return res
      .status(Status.serverError)
      .json({ error: "Error Occured", details: err });
  }
});

const getcontentZod = z.object({
  userId: z.string(),
});
router.get("/content", authMiddelware, async (req: Request, res: Response) => {
  const { success, data, error } = getcontentZod.safeParse(req.body);
  if (!success) {
    return res
      .status(Status.errorInInputs)
      .json({ error: "Error in input", details: error });
  }

  try {
    const userId = data.userId;
    const response = await Content.find({ userId: userId });
    const contents = await Promise.all(
      response.map(async (content) => {
        const tagTitles = await Promise.all(
          content.tags.map(async (tagId) => {
            const tag = await Tags.findById(tagId, "title -_id");
            return tag?.title;
          })
        );

        return {
          ...content.toObject(),
          tags: tagTitles.filter(Boolean),
          date: content.date?.toISOString(),
        };
      })
    );
    return res.status(Status.success).json({
      content: contents,
    });
  } catch (err) {
    return res
      .status(Status.serverError)
      .json({ error: "Error Occured", details: err });
  }
});

const deletecontentZod = z.object({
  userId: z.string(),
  contentId: z.string(),
});

router.delete(
  "/content",
  authMiddelware,
  async (req: Request, res: Response) => {
    const { success, data, error } = deletecontentZod.safeParse(req.body);
    if (!success) {
      return res
        .status(Status.errorInInputs)
        .json({ error: "Error in Input", details: error });
    }

    try {
      const response = await Content.deleteOne({
        _id: data.contentId,
        userId: data.userId,
      });

      return res
        .status(Status.success)
        .json({ message: "Success", deleted: response });
    } catch (err) {
      return res
        .status(Status.serverError)
        .json({ error: "Error Occured", details: err });
    }
  }
);

const shareZod = z.object({
  share: z.string(),
  userId: z.string(),
});
router.post("/brain/share", authMiddelware, async (req, res) => {
  const { success, data, error } = shareZod.safeParse(req.body);
  if (!success) {
    return res
      .status(Status.errorInInputs)
      .json({ error: "Incorrect Input", details: error });
  }

  const userId = data.userId;
  try {
    if (data.share === "true") {
      const randomvalue = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .createHash("sha256")
        .update(randomvalue)
        .digest("hex");
      const response = await Link.create({
        hash: hash,
        userId: userId,
      });

      return res.status(Status.success).json({
        message: "Successfull",
        link: `${hash}`,
      });
    }
    return res.status(Status.errorInInputs).json({ error: "share is false" });
  } catch (err) {
    return res
      .status(Status.serverError)
      .json({ error: "Error Occured", details: err });
  }
});

router.get("/brain/share/:hash", async (req, res) => {
  const { hash } = req.params;
  if (!hash) {
    return res
      .status(Status.errorInInputs)
      .json({ error: "Link is not found" });
  }
  try {
    const response = await Link.findOne({ hash: hash }).populate(
      "userId",
      "username"
    );
    if (!response) {
      return res
        .status(Status.errorInInputs)
        .json({ error: "Link is not found" });
    }
    const userId = response?.userId?._id;
    //@ts-ignore
    const username = response?.userId?.username;
    const resArr = await Content.find(
      { userId: userId },
      { userId: false, __v: false }
    );
    const promiseArray = resArr.map(async (e) => {
      return Promise.all(
        e.tags.map(async (element) => {
          const obj = await Tags.findById(element, "-_id -__v");
          return obj?.title;
        })
      );
    });
    const array = await Promise.all(promiseArray);
    const reformedResArray = resArr.map((item, index) => ({
      ...item.toObject(),
      tags: array[index],
    }));
    return res
      .status(Status.success)
      .json({ username: username, content: reformedResArray });
  } catch (err) {
    return res
      .status(Status.serverError)
      .json({ error: "Error Occured", details: err });
  }
});

export default router;
