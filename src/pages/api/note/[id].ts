import { NextApiRequest, NextApiResponse } from "next";
import { deleteNote, fetchNote, updateNote } from "@/lib/api/mutations/notes";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return fetchNote(req, res);
  } else if (req.method === "PUT") {
    return updateNote(req, res);
  } else if (req.method === "DELETE") {
    return deleteNote(req, res);
  } else {
    return res.status(405).json({ message: "Methhod not allowed" });
  }
}
