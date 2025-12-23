import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Addon() {
    const [Addons, setAddons] = useState([]);
    const [period, setPeriod] = useState(null);
    const [addonsPicked, setAddonsPicked] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/addon')
            .then(response => {
                setAddons(response.data[0]);
                setPeriod(response.data[1]);
            })
            .catch(error => console.error('Error fetching addons:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/api/addon", {
            addons: addonsPicked
        }).then(() => {
            Navigate("/summary");
        }).catch(error => {
            setErrorMessage(error.response.data.message || error.message);
            document.getElementById('my_modal_2').showModal()
        });
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
                    {Addons.map((eachAddon) => (
                        <Choice
                            key={eachAddon.id_addon}
                            addon={eachAddon}
                            period={period}
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


            <dialog id="my_modal_2" className={'modal'}>
                <div className="modal-box bg-primary-red-500">
                    <h3 className="font-bold text-lg">Error</h3>
                    <p className="py-4">{errorMessage}</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
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
            htmlFor={addon.id_addon}
        >
            <div className="flex gap-6 items-center">
                <input
                    type="checkbox"
                    name="Add_ons"
                    value={addon.title}
                    onChange={handleChange}
                    id={addon.id_addon}
                    className="on-checked checkbox bg-transparent border-neutral-purple-200 rounded-md checked:bg-primary-purple-600 checked:text-neutral-white"
                />
                <div className="grid">
                    <strong className="text-primary-blue-950 text-md font-bold">
                        {addon.title}
                    </strong>
                    <p className="text-neutral-grey-500 text-sm">{addon.description}</p>
                </div>
            </div>
            <p className="text-primary-purple-600 text-sm">
                +$
                {period === "Monthly"
                    ? `${addon.price_monthly}/mo`
                    : `${addon.price_yearly}/yr`}
            </p>
        </label>
    );
}
