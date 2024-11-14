import { request, Request, Response } from "express";
import Attack from "../models/attackModel";
import {timeToHit as calculate} from "../utils/timeToHit";


export const sendAttack = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { location, name } = request.body
      const newAttack = {
        name: name,
        status: "launched",
        sentFrom: id,
        sentTo: location,
        timeToHit: calculate(name),
      };
      console.log(newAttack);
      
      const attack = await Attack.create(newAttack);
      response.json(attack);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  };
   