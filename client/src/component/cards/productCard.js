import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBed, faShower, faRuler, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
  const { property } = props;
  const navigate = useNavigate();

  const handleViewButton = () => {
    if (property.propertyType === "rent")
      navigate(`/rentPropertyDescription?propertyId=${property._id}`);
    else
      navigate(`/salePropertyDescription?propertyId=${property._id}`);
  }

  return (
    <div className="card">
      <div className="cardImg">
        <img src={property.coverImgUrl} alt="House" className="card-img" />
      </div>
      <div className="card-body">
        <h3 className="card-address">
          <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faLocationDot} color="black" />
          {property.location}
        </h3>
        <div className="card-details">
          <div className="card-detail">
            <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faBed} color="black" />
            {property.numBeds} Bed Room
          </div>
          <div className="card-detail">
            <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faShower} color="black" />
            {property.numShower} Bath
          </div>
          <div className="card-detail">
            <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faRuler} color="black" />
            {property.measure} sqft
          </div>
          <div className="card-detail">
            <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faPerson} color="black" />
            {property.compound}
          </div>
        </div>
        <div className="card-footer">
          <button className="card-button" onClick={handleViewButton}>View Details</button>
          <span className="card-price">{property.price} EGP</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
