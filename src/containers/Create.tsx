import React from 'react';

const Create = ({ match }) => {
  return (
    <h1>This is the create page {match.params.id}</h1>
  );
};

export default Create;