import { Request, Response } from "express";

import { RahaModel } from "../models/massi";
import { Tapahtuma } from "../utils/types";

// rahat
// GET
// Get jutut
export const getAllJutut = async (_req: Request, res: Response) => {
  try {
    const kaikki = await RahaModel.find({});
    res.status(200).json(kaikki);
  } catch (error: unknown) {
    console.log("Error fetching tapahtumat", error);
    res.status(500).json({ message: "Server problems" });
  }
};

// rahat
// POST
// Add new tapahtuma
export const addNew = async (req: Request, res: Response) => {
  const { pvm, mita, info, hinta, tyyppi }: Tapahtuma = req.body;

  if (!mita || !hinta) {
    return res.status(400).json({ message: "muista mita/mika ja hinta" });
  }

  try {
    const newTapahtuma = new RahaModel({
      pvm,
      mita,
      info,
      hinta,
      tyyppi,
    });

    const savedTapahtuma = await newTapahtuma.save();

    return res.status(201).json({
      message: `${savedTapahtuma.mita} natsas!`,
    });
  } catch (error: unknown) {
    console.log("Error adding tapahtuma", error);
    return res.status(500).json({ message: "Joku error kavi" });
  }
};

// rahat/:id
// GET
// Eti yks tapahtuma
export const getYksJuttu = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const yks = await RahaModel.findOne({ _id: id });

    if (!yks) {
      return res.status(404).json({ message: "No stuff with that id." });
    }

    return res.status(200).json(yks);
  } catch (error: unknown) {
    console.log("Error fetfhing yks", error);
    return res.status(500).json({ message: "Server problems" });
  }
};

// rahat/:id
// PUT
// Paivita juttu
export const updateYksJuttu = async (req: Request, res: Response) => {
  const update = req.body;
  const { id } = req.params;

  if (!update || !id) {
    return res.status(404).json({ msg: "FOund nothing." });
  }

  try {
    const updateTapahtuma = await RahaModel.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    );

    if (!updateTapahtuma) {
      return res.status(404).json({ msg: "FindOneAndUpdate error" });
    }

    return res.status(200).json({ msg: `Updated ${update.mita}` });
  } catch (error: unknown) {
    return res.status(500).json({ msg: "Error updating tapahtuma", error });
  }
};

// rahat/:id
// DELETE
// Poista juttu
export const deleteJuttu = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ msg: "Found nothing." });
  }

  try {
    const poistaTapahtuma = await RahaModel.deleteOne({ _id: id });

    if (!poistaTapahtuma) {
      return res.status(404).json({ msg: "FindOneAndDELETE error" });
    }

    return res.status(200).json({ msg: `DELETED ` });
  } catch (error: unknown) {
    return res.status(500).json({ msg: "Error updating tapahtuma", error });
  }
};
