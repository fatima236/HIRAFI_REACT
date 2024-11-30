// DiscoverButton.js
import React from 'react';

const DiscoverButton = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default DiscoverButton;
