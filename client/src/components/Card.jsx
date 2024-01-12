import React from "react";
import { Card, Button } from "react-bootstrap";
import "./Card.css";

const CarCard = ({ car, onDelete, onEdit }) => {
  return (
    <div className="col-md-3 col-xs-12" style={{ height: "100%" }}>
      <Card style={{ width: "35rem", height: "75%" }}>
        <Card.Img
          variant="top"
          src={`http://localhost:8800${car.imageURL}`}
          alt={car.brand}
          style={{ objectFit: "cover", height: "150px" }}
        />
        <Card.Body style={{ alignItems: "center" }}>
          <Card.Title>{car.brand}</Card.Title>
          <Card.Title>
            {car.model}-{car.year}
          </Card.Title>
          <Card.Text>Price: {car.price}</Card.Text>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Button
              variant="primary"
              onClick={() => onEdit(car._id)}
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
            >
              <i className="fa fa-edit" aria-hidden="true"></i>
            </Button>

            <Button
              variant="danger"
              onClick={() => onDelete(car._id)}
              className="ml-2"
              style={{
                marginInlineStart: "10px",
              }}
              data-toggle="tooltip"
              data-placement="top"
              title="Delete"
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CarCard;
