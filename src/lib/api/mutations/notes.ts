import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function createNote(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  try {
    const data = await prisma.notes.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return res
      .status(201)
      .json({ status: true, message: "Note created successfully", data });
  } catch (error) {
    return res.status(500).json({ status: false, error });
  }
}

async function fetchAllNotes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.notes.findMany();

    return res
      .status(200)
      .json({ status: true, message: "Note created successfully", data });
  } catch (error) {
    return res.status(500).json({ status: false, error });
  }
}

async function fetchNote(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const data = await prisma.notes.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    return res
      .status(200)
      .json({ status: true, message: "Note created successfully", data });
  } catch (error) {
    return res.status(500).json({ status: false, error });
  }
}

async function updateNote(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const body = req.body;

  try {
    const data = await prisma.notes.update({
      where: {
        id: parseInt(id as string),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return res
      .status(200)
      .json({ status: true, message: "Note has been updated", data });
  } catch (error) {
    return res.status(500).json({ status: false, error });
  }
}

async function deleteNote(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await prisma.notes.delete({
      where: {
        id: parseInt(id as string),
      },
    });

    return res
      .status(204)
      .json({ status: true, message: "Note has been deleted" });
  } catch (error) {
    return res.status(500).json({ status: false, error });
  }
}

export { createNote, fetchAllNotes, fetchNote, updateNote, deleteNote };
