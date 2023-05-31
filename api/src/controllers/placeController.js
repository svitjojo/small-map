import { getAllPlaces, addPlace } from '../services/placeService.js';

export const getAll = async (req, res) => {
  const places = await getAllPlaces();

  res.send(places);
};

export const add = async (req, res) => {
  const data = req.body;
  const newPlace = await addPlace(data);

  res.send(newPlace);
};
