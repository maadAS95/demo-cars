import React, { useState } from "react";
import { Form, Button, ButtonGroup } from "react-bootstrap";

import Darpzone from "./dropzonecomponent";
import swal from "sweetalert2";
import { postFormData } from "../network/api";
const years = [
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  2023, 2024,
];
export const AddCar = ({ onSubmit }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [price, setPrice] = useState(0);
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
    if (price && brand && model && year && image) {
      swal
        .fire({
          title: "ADD THIS CAR?",
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
            };
            var bodyFormData = new FormData();
            for (let index = 0; index < image.length; index++) {
              bodyFormData.append("file", image[index]);
            }
            bodyFormData.append("data", JSON.stringify(data));

            const result = await postFormData("/cars/v1/car", bodyFormData);
            console.log(result);
            swal.fire({
              title: "Car has Added successfully",
              timer: 2000,
              timerProgressBar: true,

              showConfirmButton: false,
            });
            setBrand("");
            setImage("");
            setModel("");
            setPrice(0);
            setYear(new Date().getFullYear());
            window.location.href = "/";
          }
        });
    } else {
      swal.fire({
        icon: "info",
        showConfirmButton: false,
        title: "Please check required fields",
        timer: 2000,
        timerProgressBar: true,
      });
    }
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
          maxLength={30}
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
          maxLength={30}
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
          min={1000}
          max={100000000}
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
          {years.map((yr) => (
            <option value={yr}>{yr}</option>
          ))}
          on
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
          maxFileSize={18000000}
          acceptedFiles={["image/*"]}
          onChange={(files) => {
            handleFileUpload(files);
          }}
        />
      </Form.Group>

      <ButtonGroup
        style={{ marginLeft: "50%", marginTop: "5%", marginBottom: "15%" }}
      >
        <Button color="#fce" type="submit" size="lg" onClick={handleSubmit}>
          Add this Car
        </Button>

        <Button
          color="#cc4"
          type="submit"
          size="lg"
          onClick={handleCancel}
          style={{ marginLeft: "10%" }}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default AddCar;
