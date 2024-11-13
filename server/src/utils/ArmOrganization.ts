import { IUser } from "../models/userModel";

import data from "../jsonSeed/organizations.json";

export const ArmOrganization = (user: IUser) => {
  let name: string = user.name;
  data.forEach((i) => {
    if (i.name === name) {
      i.resources.forEach((a) => {
        user.resources.push(a);
      });
    }
  });
  user.resources.shift();
  return user;
};
