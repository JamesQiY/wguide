import React from "react";

const Container = (props) => {
  return (
    <>
      <title>Wguides</title>
      <div className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Container;
