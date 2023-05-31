import { Place } from "../modules/placeModule.js";

export const getAllPlaces = async () => {
  const result = await Place.findAll();

  return result;
};

export const addPlace = async (place) => {
  const newPlace = await Place.create(place);

  return newPlace;
};
