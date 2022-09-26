import React, { useState } from "react";
import "./components/css/style.css";
import { init } from "emailjs-com";
const JokeAPI = require("sv443-joke-api");
init("user_id");

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div>
      <div className="input-fields-flex">
        <form action="" method="get" className="email-form">
          <input
            type="text"
            placeholder="First Name"
            name="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Company Name"
            name="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <div className="checkbox-container-flex">
            <input
              type="checkbox"
              checked={accepted}
              onChange={setAccepted(e.target.value)}
              className="checkbox"
            />
            <p className="conditions-text">
              I agree to nothing and I just want a funny <a href="">Joke</a> –
              no data is being collected.
            </p>
          </div>
          <input
            type="submit"
            value="Continue"
            onClick={submit}
            className="cta-button"
          />
          <span className={emailSent ? "visible" : null}>
            Thank you. You will receive your joke shortly via email.
          </span>
        </form>
      </div>
      <hr className="divider"></hr>
    </div>
  );
};

const submit = () => {
  if (firstName && isValidEmail(email) && accepted) {
    const serviceId = "service_gfdemad";
    const templateId = "template_99koi9e";
    const joke = JokeAPI.getJokes()
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    const templateParams = {
      firstName,
      lastName,
      joke,
      companyName,
    };

    emailjs
      .send(serviceId, templateId, templateParams)
      .then((response) => console.log(response))
      .then((error) => console.log(error));

    setFirstName("");
    setLastName("");
    setCompanyName("");
    setEmail("");
    setAccepted("");
    setEmailSent(true);
  } else {
    if (!firstName) {
      alert("Please fill in your first name so we know who to address.");
    }
    if (!email) {
      alert("Please fill in your email so we know where to send the joke.");
    }
    if (!accepted) {
      alert("Please accept literally nothing.");
    }
  }
};

const isValidEmail = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export default Contact;
