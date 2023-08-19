import type { NextApiRequest, NextApiResponse } from "next";
import { createNote, fetchAllNotes } from "@/lib/api/mutations/notes";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return createNote(req, res);
  } else if (req.method === "GET") {
    return fetchAllNotes(req, res);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
