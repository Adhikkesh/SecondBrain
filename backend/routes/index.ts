import express from "express";
import { z } from "zod";

const router = express.Router();

const signupZod = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8).max(20).refine((p) => /)
});

router.get("/signup", (req, res) => {});

export default router;
