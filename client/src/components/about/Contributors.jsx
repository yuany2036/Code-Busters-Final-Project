import React from 'react'

const Contributors = ({h3, p, image,recommendation}) => {
  return (
    <div >
      <h3>{h3}</h3>
          <p>{p}</p>
          <div><img src={image} alt="" /></div>
      <p>{recommendation}</p>
  
    </div>
  );
}

export default Contributors