import { request, Request, Response } from "express";
import Attack from "../models/attackModel";
import USer from "../models/userModel";

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

      const user = await USer.findByIdAndUpdate(
        id,
        {
          $inc: { "resources.$[elem].amount": -1 }
        },
        {
          arrayFilters: [{ "elem.name": name }],
          new: true
        }
      );
      

      response.json(attack);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  };
   