import data from "../jsonSeed/missiles.json";

export const timeToHit = (name: string) => {
  let speed = 50;
  data.forEach((i) => {
    if (i.name === name) {
      speed = i.speed;
    }
  });
  return speed;
};
