import React from "react";

export default function TestemonialCartao({
  image,
  name,
  role,
  rating,
  testimonial,
}) {
  return (
      <div className="content">
        <h3 className="name"> Name</h3>
        <p className="role"> Role</p>
        <p className="testimonial-text"> Testimonial</p>
      </div>
  );
}
