import React from 'react';

const Spotlight = ({ x, y }) => (
  <div
    className="spotlight"
    style={{ top: y, left: x }}
  />
);

export default Spotlight;