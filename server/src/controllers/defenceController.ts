import { Request, Response } from "express";
import Attack from "../models/attackModel";

export const getAllAttacks = async (request: Request, response: Response) => {
  try {
    const location = request.params.location;
    const attacks = await Attack.find({ sentTo: location });

    await Promise.all(
      attacks.map(async (attack) => {
        if (attack.status === "launched" && attack.timeToHit > 3) {
          await Attack.findByIdAndUpdate(attack._id, {
            $inc: { timeToHit: -3 },
          });
        } else if (attack.status === "launched" && attack.timeToHit <= 3) {
          await Attack.findByIdAndUpdate(attack._id, {
            $set: { timeToHit: 0, status: "hit" },
          });
        }
      })
    );

    const updatedAttacks = await Attack.find({ sentTo: location });
    response.json(updatedAttacks);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const postInterception = async (
  request: Request,
  response: Response
) => {
  try {
    const { _id } = request.params;

    const attack = await Attack.findById(_id);
    if (attack && attack.status === "launched" && attack.timeToHit > 3) {
      await Attack.findByIdAndUpdate(
        _id,
        { $set: { timeToHit: 0, status: "intercepted" } }
      );
      const updatedAttack = await Attack.findById(_id); 
      response.json(updatedAttack);
    } else {
      response.status(404).json({ message:  "not found " });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};
