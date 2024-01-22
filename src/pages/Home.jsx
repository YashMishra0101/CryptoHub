import React from "react";

const Home = ({ data, loading }) => {
  console.log("In Home , data:-", data);
  console.log("In Home , Loading:-", loading);

  return (
    <div>
      <h1>This is a home Page</h1>
      <div>
        <p>Total:</p>
        <p>Total-24h-Volume:</p>
        <p>Total Coins:</p>
        <p>Total Exchange:</p>
        <p>Total MarketCap:</p>
        <p>Total Markets:</p>
      </div>
    </div>
  );
};

export default Home;
