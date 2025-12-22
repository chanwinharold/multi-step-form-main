import {useContext} from 'react';
import { Link, useNavigate } from 'react-router';
import AllInfoContext from '../../contexts/AllInfoContext';

function Summary() {
    const [personalInfo, _] = useContext(AllInfoContext);
    const Navigate = useNavigate()

    let total_month = 0;
    let total_year = 0;

    personalInfo.addons.forEach(addon => {
        total_month += addon.monthly_price
    });
    personalInfo.addons.forEach(addon => {
        total_year += addon.yearly_price
    });

    const total = personalInfo.period_billing==="Monthly"
        ? (personalInfo.plan_option.price_monthly +  total_month)
        : (personalInfo.plan_option.price_yearly + total_year)

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
            <section className="h-full grid gap-4">
                <div className="grid bg-neutral-blue-100 p-6 rounded-md">
                    <article className="flex justify-between items-center pb-6 border-b border-neutral-purple-200">
                        <div className="flex flex-col">
                            <strong className="text-primary-blue-950 font-bold text-lg">{`${personalInfo.plan_option.title} (${personalInfo.period_billing})`}</strong>
                            <Link
                                className="text-neutral-grey-500 hover:text-primary-purple-600 underline"
                                to={"/plan"}
                            >
                                Change
                            </Link>
                        </div>
                        <strong className="text-primary-blue-950 font-bold text-lg">
                            {`$${personalInfo.period_billing === "Monthly" ? personalInfo.plan_option.price_monthly : personalInfo.plan_option.price_yearly}/${
                                personalInfo.period_billing === "Monthly" ? "mo" : "yr"
                            }`}
                        </strong>
                    </article>
                    <article className="pt-6 flex flex-col gap-4">
                        {personalInfo.addons.map((addon, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="text-neutral-grey-500">{addon.title}</span>
                                <span className="text-primary-blue-950">
                  {personalInfo.period_billing === "Monthly"
                      ? `+$${addon.monthly_price}/mo`
                      : `+$${addon.yearly_price}/yr`}
                </span>
                            </div>
                        ))}
                    </article>
                </div>

                <article className="px-6 flex justify-between items-center">
                    <p className="text-neutral-grey-500">
                        Total{" "}
                        {`(per ${
                            personalInfo.period_billing === "Monthly" ? "month" : "year"
                        })`}
                    </p>
                    <strong className='text-primary-purple-600 text-xl'>{`+$${total}/${personalInfo.period_billing === "Monthly" ? "mo" : "yr"}`}</strong>
                </article>
            </section>
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