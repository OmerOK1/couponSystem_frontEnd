import "./CustomerInfoCard.css";
import React from "react";
import { CustomerCardProps } from "../CustomerCard/CustomerCard";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FaEdit, FaInfoCircle } from "react-icons/fa";


function CustomerInfoCard(props: CustomerCardProps) {
  const name = props.customer.firstName + " " + props.customer.lastName;
  return (
    <div className="customer-info-card">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="https://random.imagecdn.app/286/180" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <span>id: {props.customer.id}</span>
            <br />
            <span>name: {props.customer.firstName}</span>
            <br />
            <span>name: {props.customer.lastName}</span>
            <br />
            <span>email: {props.customer.email}</span> 
            <br />
          </Card.Text>
          <Link
            className="remove"
            to={"/customers/remove/" + props.customer.id}
          >
            <Button variant="primary">
              <BsTrash />
              delete
            </Button>
          </Link>

          <Link
            className="update"
            to={"/customers/update/" + props.customer.id}
          >
            <Button variant="primary">
              <FaEdit />
              update
            </Button>
          </Link>
          <Link className="back" to={"/customers"}>
            <Button variant="primary">
              <FaInfoCircle />
              back
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CustomerInfoCard;
