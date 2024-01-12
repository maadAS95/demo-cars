const express = require("express");

const { handleResponse, handleUploadFiles } = require("../Utils/helpers");
const {
  listCars,
  getCar,
  updateCar,
  deleteCar,
  addNewCar,
} = require("../services/cars.services");
const carsRouter = express.Router();

carsRouter.get("/v1/allcars", async (req, res) => {
  let { limit, offset } = req.query;
  limit = limit ? parseInt(limit) : 10;
  offset = offset ? parseInt(offset) : 0;
  const result = await listCars(limit, offset);
  const { status, errorCode } = handleResponse(result.status);
  res.json({ result, errorCode }).status(status).end();
});

//get one car to view its details
carsRouter.get("/v1/car/:id", async (req, res) => {
  const carId = req.params.id;
  if (!carId) {
    res.json({ result: [], errorCode: -1 }).status(400).end();
  } else {
    const result = await getCar(carId);
    const { status, errorCode } = handleResponse(result.status);
    res.json({ result, errorCode }).status(status).end();
  }
});

carsRouter.post("/v1/editcar", async (req, res) => {
  const car = JSON.parse(req.body.data);
  let withFile = false;

  const file = req.files ? req.files.file : null;
  if (file) {
    withFile = true;
    const imageURL = await handleUploadFiles(file);
    Object.assign(car, { imageURL });
  }
  const result = await updateCar(car, withFile);
  const { status, errorCode } = handleResponse(result.status);

  res.json({ result, errorCode }).status(status).end();
});

carsRouter.delete("/v1/car/:id", async (req, res) => {
  const carId = req.params.id;
  console.log(carId);
  if (!carId) {
    res.json({ result: [], errorCode: -1 }).status(400).end();
  } else {
    const result = await deleteCar(carId);
    const { status, errorCode } = handleResponse(result.status);
    res.json({ result, errorCode }).status(status).end();
  }
});
carsRouter.post("/v1/car", async (req, res) => {
  const { price, brand, model, year } = JSON.parse(req.body.data);

  const imageURL = await handleUploadFiles(req.files.file);
  console.log(imageURL);
  if (!price || !brand || !model || !year || !imageURL) {
    res.json({ result: [], errorCode: -1 }).status(400).end();
  } else {
    const result = await addNewCar(price, brand, imageURL, model, year);
    const success = result.status === 201 ? true : false;
    res
      .json({ result, errorCode: success ? 0 : -1 })
      .status(success ? 201 : 500)
      .end();
  }
});
module.exports = carsRouter;
