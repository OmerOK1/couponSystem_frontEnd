import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { FaInfoCircle, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { CouponModel } from "../../../../Models/CouponModel";
import { addCompanyAction } from "../../../../Redux/CompanyState";
import store from "../../../../Redux/Store";
import notify, { SccMsg } from "../../../../Services/Notification";
import { getCompanyApi } from "../../../../WebApi/AdminApi";
import { getCompanyInfoApi } from "../../../../WebApi/CompanyApi";
import "./CouponCard.css"

export interface CouponCardProps {
  coupon: CouponModel;
  to: string;
}

function CouponCard(props: CouponCardProps): JSX.Element {
  const company = props.coupon.company;
  
    
  return (
    (company && 
    <>
      <Card className="coupon-card">
        <Card.Header><img src={props.coupon.img} /></Card.Header>
        <Card.Body>
          <Card.Title>{props.coupon.name}</Card.Title>
          <Card.Text>{props.coupon.description}</Card.Text>
          <Card.Text>{props.coupon.category}</Card.Text>
          <Card.Text>
            
              <span>info: </span>
              <br />
              <span>
                available: {props.coupon.startDate.toString()}
              </span>
              <br />
              <span>amount: {props.coupon.amount} </span>
              <br />
              <span>price: {props.coupon.price}$ </span>
              <br />
              <span>company: {company.name} </span>
              <br />
            
          </Card.Text>

          <Link className="remove" to={"/company/coupon/delete/" + props.coupon.id}>
            <Button variant="primary">
              <BsTrash />
              delete
            </Button>
          </Link>

          <Link className="update" to={"/company/coupon/update/" + props.coupon.id}>
            <Button variant="primary">
              <FaEdit />
              update
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  )
  );
}

export default CouponCard;
