import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import AllInfoContext from "../../contexts/AllInfoContext";

function Addon() {
    const Addons = [
        {
            title: "Online service",
            desc: "Access to multiplayer games",
            monthly_price: 1,
            yearly_price: 10,
        },
        {
            title: "Larger storage",
            desc: "Extra 1TB of cloud save",
            monthly_price: 2,
            yearly_price: 20,
        },
        {
            title: "Customizable profile",
            desc: "Custom theme on your profile",
            monthly_price: 2,
            yearly_price: 20,
        },
    ];
    const [personalInfo, setPersonalInfo] = useContext(AllInfoContext);
    const [addonsPicked, setAddonsPicked] = useState([]);
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setPersonalInfo((prevState) => {
            return {
                ...prevState,
                addons: addonsPicked,
            };
        });
        Navigate("/summary");
    };

    return (
        <section className="section-three w-full px-16 pt-6 pb-4 flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold my-2 text-primary-blue-950">
                    Pick add-ons
                </h1>
                <p className="text-sm font-light text-neutral-grey-500">
                    Add-ons help enhance your gaming experience
                </p>
            </header>
            <form onSubmit={handleSubmit} noValidate={true} className="h-full grid">
                <fieldset className="grid gap-4">
                    <legend className="not-visible">Choose your add-ons</legend>
                    {Addons.map((addon, index) => (
                        <Choice
                            key={`${index}_${addon.title.replace(" ", "_")}`}
                            addon={addon}
                            period={personalInfo ? personalInfo.period_billing : "Monthly"}
                            setter={setAddonsPicked}
                        />
                    ))}
                </fieldset>

                <div className="place-self-end w-full flex justify-between items-center">
                    <Link
                        to={"/plan"}
                        className="font-bold text-neutral-grey-500 hover:text-primary-blue-950 transition-colors duration-300"
                    >
                        Go Back
                    </Link>
                    <button className="btn-primary" type="submit">
                        Next Step
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Addon;

function Choice({ addon, period, setter }) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((v) => !v);
        setter((prevArr) => {
            if (prevArr.filter((item) => item.title === addon.title).length > 0) {
                return prevArr.filter((item) => item.title !== addon.title);
            } else {
                return [...prevArr, addon];
            }
        });
    };

    return (
        <label
            className={`${
                checked ? "border-primary-purple-600" : null
            } hover:border-primary-purple-600 transition-all duration-300 rounded-md px-4 py-2 border border-neutral-purple-200 w-full flex justify-between items-center gap-8 cursor-pointer`}
            htmlFor={addon.title.replace(" ", "_")}
        >
            <div className="flex gap-6 items-center">
                <input
                    type="checkbox"
                    name="Add_ons"
                    value={addon.title}
                    onChange={handleChange}
                    id={addon.title.replace(" ", "_")}
                    className="on-checked checkbox bg-transparent border-neutral-purple-200 rounded-md checked:bg-primary-purple-600 checked:text-neutral-white"
                />
                <div className="grid">
                    <strong className="text-primary-blue-950 text-md font-bold">
                        {addon.title}{" "}
                    </strong>
                    <p className="text-neutral-grey-500 text-sm">{addon.desc}</p>
                </div>
            </div>
            <p className="text-primary-purple-600 text-sm">
                +$
                {period === "Monthly"
                    ? `${addon.monthly_price}/mo`
                    : `${addon.yearly_price}/yr`}
            </p>
        </label>
    );
}
