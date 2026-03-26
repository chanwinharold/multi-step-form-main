import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Plan() {
    const [Plans, setPlans] = useState([]);
    const [checked, setChecked] = useState(false);
    const [planOptions, setPlanOptions] = useState(Plans[0]);
    const [errorMessage, setErrorMessage] = useState(null);
    const Navigate = useNavigate()

    useEffect(() => {
        axios.get("/api/plan")
            .then(response => setPlans(response.data))
            .catch(error => console.error('Error fetching plans:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post("/api/plan", {
            plan_option: planOptions,
            period_billing: checked ? "Yearly" : "Monthly",
        }).then(() => {
            Navigate("/addon");
        }).catch(error => {
            setErrorMessage(error.response.data.message || error.message);
            document.getElementById('my_modal_2').showModal()
        });
    }

    return (
        <section className="section-two mobile:px-16 pt-6 pb-4 flex flex-col gap-8 mobile-form">
            <header>
                <h1 className="text-3xl font-bold my-2 text-primary-blue-950">
                    Select your plan
                </h1>
                <p className="text-sm font-light text-neutral-grey-500">
                    You have the option of monthly or yearly billing.
                </p>
            </header>
            <form onSubmit={handleSubmit} noValidate={true} className="h-full grid max-mobile:gap-8">
                <fieldset className="flex mobile:flex-row flex-col gap-4">
                    <legend className="not-visible">Plan options</legend>
                    {Plans.map((eachPlan) => (
                        <Formula
                            key={eachPlan.id_plan}
                            plan={eachPlan}
                            period={checked}
                            setter={setPlanOptions}
                        />
                    ))}
                </fieldset>
                <fieldset className="w-full h-fit rounded-md p-4 bg-neutral-blue-50 flex justify-center gap-6">
                    <legend className="not-visible">Period billing choice</legend>
                    <strong
                        onClick={() => setChecked(false)}
                        className={`cursor-pointer ${!checked ? "text-primary-blue-950" : "text-neutral-grey-500"}`}
                    >
                        Monthly
                    </strong>
                    <label>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChecked((v) => !v)}
                            className="toggle bg-primary-blue-950 text-white"
                        />
                    </label>
                    <strong
                        onClick={() => setChecked(true)}
                        className={`cursor-pointer ${
                            checked ? "text-primary-blue-950" : "text-neutral-grey-500"
                        }`}
                    >
                        Yearly
                    </strong>
                </fieldset>
                <div className="max-mobile:pb-4 place-self-end w-full flex justify-between items-center">
                    <Link
                        to={"/"}
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

export default Plan;

const Formula = ({ plan, period, setter }) => {
    return (
        <label
            className="mobile:w-[125px] mobile:h-[175px] mobile:grid flex max-mobile:items-start max-mobile:gap-4 mobile:justify-between px-4 max-mobile:py-4 mobile:pt-6 mobile:pb-3 rounded-md cursor-pointer transition-all duration-300"
            htmlFor={plan.id_plan}
        >
            <input
                className="hidden on-checked"
                type="radio"
                name={"plan"}
                value={plan.title}
                defaultChecked={plan.title==="Arcade"}
                onChange={() => setter(plan)}
                id={plan.id_plan}
            />
            <img src={`/icons/${plan.imgUrl}`} alt={plan.title} />

            <div className="flex flex-col place-self-end">
                <strong className="font-bold text-primary-blue-950">{plan.title}</strong>
                <em className="not-italic text-neutral-grey-500 text-sm">
                    {period
                        ? `$${plan.price_yearly}/yr`
                        : `$${plan.price_monthly}/mo`}
                </em>
                {period && <em className="not-italic text-primary-blue-950 text-sm">2 months free</em>}
            </div>
        </label>
    );
};
