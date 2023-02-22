import React from "react";

const Base = ({ title = "My Title", description = "My description" }) => {
  // if curly
  return (
    <div>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">My Title</h2>
          <p className="lead">My description</p>
        </div>
        <p>This is main content</p>
      </div>
      <footer className="footer bg-dark mt auto py-3">
        <div className="container-fluid bg-success text-white text-center">
          <h4>If you got any questions, feel free to reach out</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">An amazing Code</span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
