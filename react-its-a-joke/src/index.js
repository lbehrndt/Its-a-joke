import React, { isValidElement } from "react";
import ReactDOM from "react-dom/client";
import emailjs from "@emailjs/browser";

const axios = require("axios");
class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
            validEmail: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const formValues = this.state.formValues;
        const name = event.target.name;
        const value = event.target.value;

        console.log(name);

        formValues[name] = value;
        this.setState({
            formValues,
        });
    }

    handleSubmit(event) {
        const formValues = this.state.formValues;
        const validEmail = this.state.validEmail;
        const email = formValues["email"];
        const name = formValues["first-name"];

        /* validEmail = this.validEmail(email);
        this.setState({
            validEmail
        }) */


        event.preventDefault();
        if (name && validEmail) {
            this.sendEmail(email);
        } else {
            validEmail
                ? alert(
                      "We need your first name to know who we are sending an email to."
                  )
                : alert("Your email is not matching the valid characters.");
        }
    }

    sendEmail() {
        const formValues = this.state.formValues;
        const email = formValues["email"];
        const name = formValues["last-name"]
            ? formValues["first-name"] + formValues["last-name"]
            : formValues["first-name"];
        const joke = this.getJoke();

        const templateParams = {
            name: name,
            email: email,
            joke: joke,
        };
        console.log(name + " " + email + " " + joke);
        /* emailjs.send(
            "service_gfdemad",
            "template_99koi9e",
            templateParams,
            "plWhU5JpRUiuryxHX"
        ); */

        alert("Your joke was sent to " + email + " :).");
    }

    getJoke() {
        const joke = axios.get("https://api.chucknorris.io/jokes/random")
        .then((response) => {
            return response.data.value;
        });

        return joke;
    }

    validEmail = (email) => {
        let valid = email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        const inputFieldStateColor = valid ? "var(--success)" : "var(--error)";
        // email.css("border-color", inputFieldStateColor);
        this.setState({valid});
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-fields-flex">
                    <input
                        type="text"
                        name="first-name"
                        className="input-field"
                        placeholder="First Name"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="last-name"
                        className="input-field"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Company Name"
                        name="company-name"
                        className="input-field"
                        onChange={this.handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="input-field"
                        onChange={this.handleChange}
                    />
                    <div className="checkbox-container-flex">
                        <input
                            type="checkbox"
                            name="agreement"
                            className="checkbox"
                            onChange={this.handleChange}
                        />
                        <p className="conditions-text">
                            I agree to nothing and I just want a funny{" "}
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://sv443.net/jokeapi/v2/"
                            >
                                Joke{" "}
                            </a>
                            – no data is being collected.
                        </p>
                    </div>
                    <input
                        type="submit"
                        value="Continue"
                        className="cta-button"
                    />
                </div>
            </form>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ContactForm />);
