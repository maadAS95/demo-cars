import React, { useState, useEffect } from "react";
import swal from "sweetalert2";

import Card from "../components/Card";
import { AddCar } from "../components/AddCar";
import { EditCar } from "../components/EditCar";

import "./Home.css";
import NavbarWithActions from "../components/NavbarWithActions";
const API_PREFIX = "http://localhost:8800/cars/v1";

export const Home = () => {
  const [cars, setCars] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedCar, setEditedCar] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    const searchVal = event.target.value;
    setSearchValue(searchVal);
    const filteredResults = cars?.filter((item) => {
      return (
        item.brand.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.year.toString().includes(searchVal) ||
        item.model.toString().includes(searchVal) ||
        item.price.toString().includes(searchVal)
      );
    });
    if (!filteredResults.length) {
      swal.fire({
        title: "There are no matched cars",
        timer: 2000,
        timerProgressBar: true,

        showConfirmButton: false,
      });
      setSearchValue(null);
      setCars([]);
    } else setCars(filteredResults);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_PREFIX}/allcars`);
      const res = await response.json();
      if (res.errorCode === 0) {
        const cars = res.result.data;
        setCars(cars);
      } else {
        setCars([]);
      }
    };
    if (!searchValue) fetchData();
  }, [searchValue]);

  const deleteAPI = async (id) => {
    const res = await fetch(`${API_PREFIX}/car/${id}`, {
      method: "DELETE",
    });
    return res.status;
  };
  const toggleEditeForm = async (id) => {
    const response = await fetch(`${API_PREFIX}/car/${id}`);
    const result = await response.json();
    setEditedCar(result.result.data);
    setIsEditing(true);
  };
  const toggleAddingForm = (id) => {
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleDelete = (id) => {
    swal
      .fire({
        title: "Do you want delete this",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "YES",
        confirmButtonColor: "#bf9e66",
        denyButtonText: "NO",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteAPI(id);
          if (res === 200) {
            swal.fire({
              icon: "success",
              showConfirmButton: false,
              title: "Deleted suucess",
              timer: 2000,
              timerProgressBar: true,
            });
            const response = await fetch(`${API_PREFIX}/allcars`);
            const res1 = await response.json();
            const cars = res1.result.data;
            setCars(cars);
          }
        } else if (result.isDenied) {
          swal.fire({
            icon: "info",
            showConfirmButton: false,
            title: "Failed delete",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
  };
  return (
    <div className="header">
      {Array.isArray(cars) && cars.length && !isAdding && !isEditing ? (
        <>
          <NavbarWithActions
            activeAdding={toggleAddingForm}
            handleSearch={handleSearch}
          />
          <div className="row">
            {cars.map((car) => (
              <Card
                car={car}
                onDelete={handleDelete}
                onEdit={toggleEditeForm}
                key={car._id}
              />
            ))}
          </div>
        </>
      ) : isAdding ? (
        <>
          <AddCar />
        </>
      ) : isEditing ? (
        <>
          <EditCar car={editedCar} />
        </>
      ) : (
        <h2>There are no cars added yet! you can add your car now</h2>
      )}
    </div>
  );
};
