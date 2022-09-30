import React from "react";
import ReactDOM from "react-dom/client";

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            companyName: "",
            email: "",
            accepted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            firstName: event.target.value,
        });
    }

    handleSubmit(event) {
        alert("Ah! That's how it works with " + this.state.firstName + ".");
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-fields-flex">
                    <input
                        required
                        type="text"
                        placeholder="First Name"
                        name="first-name"
                        className="input-field"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="last-name"
                        className="input-field"
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
                        required
                        type="email"
                        placeholder="Email"
                        className="input-field"
                        onChange={this.handleChange}
                    />
                    <div className="checkbox-container-flex">
                        <input required type="checkbox" className="checkbox" onChange={this.state.accepted = true}/>
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
