import React, { isValidElement } from "react";
import ReactDOM from "react-dom/client";

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const formValues = this.state.formValues;
        const name = event.target.name;
        const value = event.target.value;

        if (name === "email") {
            this.validateEmail(value) ? event.target.css : event.target.css;
        }

        formValues[name] = value;
        this.setState({
            formValues,
        });
    }

    handleSubmit(event) {
        const formValues = this.state.formValues;
        const name = formValues["last-name"]
            ? formValues["first-name"] + " " + formValues["last-name"]
            : formValues["first-name"];
        const email = formValues["email"];

        event.preventDefault();
        if (name && email) {
            sendEmail(email);
            alert("An email was sent to: " + email);
        } else {
            alert(
                "We need your first name to know who we are sending an email to."
            );
        }
    }

    validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    validate = () => {
        const $result = $("result");
        const email = $("email").val();
        $result.text("");

        if(this.validateEmail(email)) {
            $result.text(email + " is valid.");
            $result.css("color", "var(--success)");
        } else {
            $result.text(email + " is invalid.");
            $result.css("color", "var(--error)");
        }
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
