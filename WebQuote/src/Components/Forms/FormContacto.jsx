import React, { useState } from "react";
import "./form.css";
import Header from "../Header/Header";

export default function FormContacto() {

  return (
    <div>
      <Header/>
      <form>
        <h2>Contact Form</h2>
        <div>
          <label htmlFor="from_name">Nome</label>
        <input
          type="text"
          name="from_name"
          value="dada"
          onChange="{handleChange}"
          required
        />
        <br />
        <label htmlFor="contact">Telefone</label>
        <input
          type="text"
          name="contact"
          value="{formData.contact}"
          onChange="{handleChange}"
          required
        />
        <br />
        <label htmlFor="from_email">Email</label>
        <input
          type="email"
          name="from_email"
          value="dada"
          onChange="{handleChange}"
          required
        />
        <br />
        <br />
        <br />
        <button type="submit" disabled={false}>
        </button>
      </div>
      </form>
    </div>
  );
}
