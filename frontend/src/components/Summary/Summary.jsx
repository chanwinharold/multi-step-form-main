import { Link, useNavigate } from 'react-router';
import {useEffect, useState} from "react";
import axios from "axios";

function Summary() {
    const Navigate = useNavigate()
    const [Data, setData] = useState(null);

    useEffect(() => {
        axios.get("/api/summary")
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, []);

    let total_month = 0;
    let total_year = 0;
    let total = 0

    if (Data) {
        Data.addons.forEach(addon => {
            total_month += addon.price_monthly
        });
        Data.addons.forEach(addon => {
            total_year += addon.price_yearly
        });

        total = Data.period.name==="Monthly"
        ? (Data.plan.price_monthly + total_month)
        : (Data.plan.price_yearly + total_year)
    }

    const handleClick = (e) => {
        e.preventDefault()
        Navigate("/final")
    }

    return (
        <section className="section-four w-full px-16 pt-6 pb-4 flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold my-2 text-primary-blue-950">
                    Finishing up
                </h1>
                <p className="text-sm font-light text-neutral-grey-500">
                    Double-check everything looks OK before confirming
                </p>
            </header>
            {
                Data ?
                    (
                        <section className="h-full grid gap-4">
                            <div className="grid bg-neutral-blue-100 p-6 rounded-md">
                                <article className="flex justify-between items-center pb-6 border-b border-neutral-purple-200">
                                    <div className="flex flex-col">
                                        <strong className="text-primary-blue-950 font-bold text-lg">{`${Data.plan.title} (${Data.period.name})`}</strong>
                                        <Link
                                            className="text-neutral-grey-500 hover:text-primary-purple-600 underline"
                                            to={"/plan"}
                                        >
                                            Change
                                        </Link>
                                    </div>
                                    <strong className="text-primary-blue-950 font-bold text-lg">
                                        {`$${Data.period.name === "Monthly" ? Data.plan.price_monthly : Data.plan.price_yearly}/${
                                            Data.period.name === "Monthly" ? "mo" : "yr"
                                        }`}
                                    </strong>
                                </article>
                                <article className="pt-6 flex flex-col gap-4">
                                    {Data.addons.map((addon) => (
                                        <div key={addon.id_addon} className="flex justify-between items-center">
                                            <span className="text-neutral-grey-500">{addon.title}</span>
                                            <span className="text-primary-blue-950">
                                                {Data.period.name === "Monthly"
                                                    ? `+$${addon.price_monthly}/mo`
                                                    : `+$${addon.price_yearly}/yr`
                                                }
                                            </span>
                                        </div>
                                    ))}
                                </article>
                            </div>

                            <article className="px-6 flex justify-between items-center">
                                <p className="text-neutral-grey-500">
                                    Total{" "}
                                    {`(per ${
                                        Data.period.name === "Monthly" ? "month" : "year"
                                    })`}
                                </p>
                                <strong className='text-primary-purple-600 text-xl'>{`+$${total}/${Data.period.name === "Monthly" ? "mo" : "yr"}`}</strong>
                            </article>
                        </section>
                    ) : (
                        <p>Loading...</p>
                    )
            }
            <div className="place-self-end w-full flex justify-between items-center">
                <Link
                    to={"/addon"}
                    className="font-bold text-neutral-grey-500 hover:text-primary-blue-950 transition-colors duration-300"
                >
                    Go Back
                </Link>
                <button onClick={handleClick}  className="btn-primary" type={'button'}>
                    Confirm
                </button>
            </div>
        </section>
    );
}

export default Summary;