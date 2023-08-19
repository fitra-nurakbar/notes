import { NextApiRequest, NextApiResponse } from "next";

type Hello = {
  say?: string;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Hello>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  return res.status(200).json({ say: "Hello world!" });
}
