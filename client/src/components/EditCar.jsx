import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import Darpzone from "./dropzonecomponent";
import swal from "sweetalert2";
import { postFormData } from "../network/api";
const years = [
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  2023, 2024,
];
export const EditCar = ({ car }) => {
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [image, setImage] = useState(car.imageURL);
  const [year, setYear] = useState(car.year);
  const [price, setPrice] = useState(car.price);
  console.log(image, "iiiiiimm");
  const handleFileUpload = (files) => {
    if (files.length) setImage(files);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "CANCEL THIS PROCESS?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "YES",
        confirmButtonColor: "#AAD9BB",

        denyButtonText: "NO",
      })
      .then((result) => {
        if (result.isConfirmed) {
          setBrand("");
          setImage("");
          setModel("");
          setPrice(0);
          setYear(new Date().getFullYear());
          window.history.go(-1);
        }
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "EDIT THIS CAR?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "YES",
        confirmButtonColor: "#AAD9BB",

        denyButtonText: "NO",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          let data = {
            brand: brand,
            model: model,
            year: year,
            price: price,
            id: car._id,
          };
          var bodyFormData = new FormData();
          if (image?.length)
            image.map((file) => {
              bodyFormData.append("file", file);
            });
          bodyFormData.append("data", JSON.stringify(data));

          const result = await postFormData("/cars/v1/editcar", bodyFormData);
          console.log(result, "resss");
          setBrand("");
          setImage("");
          setModel("");
          setPrice(0);
          setYear(new Date().getFullYear());
          swal.fire({
            title: "Car has edited successfully",
            timer: 2000,
            timerProgressBar: true,

            showConfirmButton: false,
          });
          window.location.href = "/";
        }
      });
  };

  return (
    <Form
      className="container"
      style={{ marginTop: "5%" }}
      // onSubmit={handleSubmit}
    >
      <Form.Group controlId="brand">
        <Form.Label>
          Brand <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="model">
        <Form.Label>
          Model <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>
          Price <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter model"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="year">
        <Form.Label>
          Year <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Select
          aria-label="Select year"
          onChange={(e) => setYear(e.target.value)}
          value={year}
        >
          {years.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>
          Image <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Darpzone
          type="file"
          id="fileUpload"
          name="fileUpload"
          filesLimit={1}
          initialFiles={["http://localhost:8800" + image]}
          maxFileSize={5000000}
          acceptedFiles={["image/*"]}
          onChange={(files) => {
            handleFileUpload(files);
          }}
        />
      </Form.Group>

      <div style={{ marginLeft: "40%", marginTop: "5%", marginBottom: "15%" }}>
        <Button
          variant="primary"
          type="submit"
          size="lg"
          onClick={handleSubmit}
        >
          Edit this Car
        </Button>

        <Button
          variant="warning"
          type="submit"
          size="lg"
          onClick={handleCancel}
          style={{ marginLeft: "10%" }}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditCar;
