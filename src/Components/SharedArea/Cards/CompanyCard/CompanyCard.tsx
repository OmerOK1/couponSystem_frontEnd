import ".././CardStyling.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FaEdit, FaInfoCircle } from "react-icons/fa";

export interface CompanyCardProps {
  company: CompanyModel;
  to: string;
  isSelf: boolean;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
  return (

    <>
    
    <Card className="company-card">
      <Card.Header>{props.company.name}</Card.Header>
      <Card.Body>
        <Card.Title>{props.company.email}</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
       
          <Link className="view" to={"/companies/view/" + props.company.id}> 
          <Button variant="primary">
            <FaInfoCircle />view
          </Button>
          </Link>

          <Link className="remove" to={"/companies/remove/" + props.company.id}>
          <Button variant="primary">
            <BsTrash />delete
            </Button>
          </Link>

          <Link className="update" to={"/companies/update/" + props.company.id}>
          <Button variant="primary">
            <FaEdit />update
            </Button>
          </Link>
          
      </Card.Body>
    </Card>
    
    
    {/* <div className="company_card">
      <div>
        <span className="company_name">{props.company.name}</span>
      </div>
      {props.to === "/companies" && (
        <div className="buttons">
          <Link className="view" to={"/companies/view/" + props.company.id}>
            <FaInfoCircle />
          </Link>
          <Link className="remove" to={"/companies/remove/" + props.company.id}>
            <BsTrash />
          </Link>
          <Link className="update" to={"/companies/update/" + props.company.id}>
            <FaEdit />
          </Link>
        </div>
      )}
      
    </div> */}
    </>
  );
}

export default CompanyCard;
