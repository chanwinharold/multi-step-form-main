import { useContext, useState } from "react";
import AllInfoContext from "../../contexts/AllInfoContext";
import { useNavigate } from "react-router";
import axios from "axios";

function Info() {
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [telError, setTelError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [_, setPersonalInfo] = useContext(AllInfoContext);
    const Navigate = useNavigate()

    const handleChangeName = (value) => {
        setName(value);
        const regex = new RegExp("^[a-zA-Z ]+$");
        if (value === "") {
            setNameError("This field is required");
        } else if (!regex.test(value)) {
            setNameError("This field is invalid");
        } else {
            setNameError("");
        }
    };
    const handleChangeEmail = (value) => {
        setEmail(value);
        const regex = new RegExp(/[\w-.]+@([\w-]+\.)+[\w-]{2,4}/);
        if (value === "") {
            setEmailError("This field is required");
        } else if (!regex.test(value)) {
            setEmailError("This field is invalid");
        } else {
            setEmailError("");
        }
    };
    const handleChangeTel = (value) => {
        setTel(value);
        const regex = new RegExp(/^\+[0-9]+$/);

        if (value === "") {
            setTelError("This field is required");
        } else if (!regex.test(value)) {
            setTelError("This field is invalid");
        } else if (value.length-1 < 10) {
            setTelError("Should contain at least 10 digits");
        } else {
            setTelError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            nameError==="" && name!=="" &&
            emailError==="" && email!=="" &&
            telError==="" && tel!==""
        ) {
            setPersonalInfo({
                name: name,
                email: email,
                tel: tel,
            });

            axios.post("/api/user", {
                name: name,
                email: email,
                tel: tel,
            }).then(response => {
                console.log(response)
                Navigate("/plan");
            }).catch(error => {
                console.log(error);
            });

        } else {
            handleChangeName(name);
            handleChangeEmail(email);
            handleChangeTel(tel);
        }
    };

    return (
        <section className="section-one px-16 pt-6 pb-4 flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold my-2 text-primary-blue-950">
                    Personal info
                </h1>
                <p className="text-sm font-light text-neutral-grey-500">
                    Please provide your name, email address, and phone number.
                </p>
            </header>
            <form onSubmit={handleSubmit} noValidate={true} className="h-full grid">
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input
                        className={`${nameError!=="" ? "border-primary-red-500" : null}`}
                        onChange={e => handleChangeName(e.target.value)}
                        value={name}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="e.g. Stephen king"
                    />
                    <span className="error">{nameError}</span>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                        className={`${emailError!=="" ? "border-primary-red-500" : null}`}
                        onChange={e => handleChangeEmail(e.target.value)}
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="e.g. stephenking@lorem.com"
                    />
                    <span className="error">{emailError}</span>
                </div>
                <div className="input-field">
                    <label htmlFor="tel">Phone Number</label>
                    <input
                        className={`${telError!=="" ? "border-primary-red-500" : null}`}
                        onChange={e => handleChangeTel(e.target.value)}
                        value={tel}
                        maxLength={13}
                        type="tel"
                        name="tel"
                        id="tel"
                        placeholder="e.g. +1 234567890"
                    />
                    <span className="error">{telError}</span>
                </div>

                <button type="submit" className="btn-primary place-self-end">
                    Next Step
                </button>
            </form>
        </section>
    );
}

export default Info;
