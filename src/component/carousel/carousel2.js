import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '500px',  // This sets the height of each slide
  width: '100%',    // This makes each image fill the width of the slide
  textAlign: 'center',
  lineHeight: '400px',
  objectFit: 'cover', // This ensures the image covers the area without distorting its aspect ratio
  borderRadius: '30px'
};

const Carousel3 =  ({ imgUrls = [] })=> {

  return (
    <Carousel autoplay>
    {imgUrls.map((url, index) => (
      <div key={index}>
        <img src={url} alt={`Slide ${index + 1}`} style={contentStyle} />
      </div>
    ))}
  </Carousel>
  );
}

export default Carousel3;
