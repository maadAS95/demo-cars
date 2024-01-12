const { ObjectId } = require("mongodb");
const Car = require("../modules/car.module");
const { createQueryParams, deleteFile } = require("../Utils/helpers");

const addNewCar = async (price, brand, imageURL, model, year) => {
  try {
    const car = new Car({
      brand,
      price,
      model,
      imageURL,
      year,
      createdAt: new Date(),
    });
    const result = await car.save();
    return {
      status: 201,
      message: "success",
      data: result,
    };
  } catch (error) {
    console.error(error, "Error adding new car");
    return {
      status: 500,
      message: "failed",
      data: [],
    };
  }
};

const listCars = async (limit, offset) => {
  try {
    const cars = await Car.find({}, { __v: 0 }).skip(offset).limit(limit);
    return {
      status: 200,
      message: "success",
      data: cars,
    };
  } catch (error) {
    console.error(error, "Error list all car");
    return {
      status: 500,
      message: "failed",
      data: [],
    };
  }
};

const updateCar = async (car, withFile) => {
  try {
    const existCar = await getCar(car.id);
    if (existCar.status !== 200) {
      return {
        status: 500,
        message: "failed",
        data: [],
      };
    }
    car.updatedAt = new Date();
    if (withFile) {
      await deleteFile(existCar.data.imageURL);
    }
    const newCar = Object.assign(existCar.data, car);
    const id = new ObjectId(car.id);
    const result = await Car.updateOne(
      { _id: id },
      {
        $set: newCar,
      }
    );

    return {
      status: 200,
      message: "success",
      data: [],
    };
  } catch (error) {
    comsole.error("Error delete..", error);
    return {
      status: 500,
      message: "failed",
      data: [],
    };
  }
};
const deleteCar = async (carId) => {
  try {
    const id = new ObjectId(carId);
    const car = await getCar(carId);
    const result = await Car.deleteOne({ _id: id });
    await deleteFile(car.data.imageURL);
    console.log(result, "res1234");
    return {
      status: 200,
      message: "success",
      data: [],
    };
  } catch (error) {
    console.error("Error delete..", error);
    return {
      status: 500,
      message: "failed",
      data: [],
    };
  }
};

const getCar = async (carId) => {
  try {
    const car = await Car.findById({
      _id: carId,
    });
    return {
      status: 200,
      message: "success",
      data: car,
    };
  } catch (error) {
    console.error("Error getting one car..", error);

    return {
      status: 500,
      message: "failed",
      data: [],
    };
  }
};

module.exports = {
  addNewCar,
  listCars,

  updateCar,
  deleteCar,
  getCar,
};
