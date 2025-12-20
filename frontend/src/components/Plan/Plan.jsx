import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import AllInfoContext from "../../contexts/AllInfoContext";

import iconArcade from "../../assets/images/icon-arcade.svg";
import iconAdvanced from "../../assets/images/icon-advanced.svg";
import iconPro from "../../assets/images/icon-pro.svg";

function Plan() {
  const Plans = [
    {
      title: "Arcade",
      price_monthly: 9,
      price_yearly: 90,
      imageUrl: iconArcade,
    },
    {
      title: "Advanced",
      price_monthly: 12,
      price_yearly: 120,
      imageUrl: iconAdvanced,
    },
    {
      title: "Pro",
      price_monthly: 15,
      price_yearly: 150,
      imageUrl: iconPro,
    },
  ];

  const [checked, setChecked] = useState(false);
  const [plan, setPlan] = useState(Plans[0]);
  const [_, setPersonalInfo] = useContext(AllInfoContext);
  const Navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setPersonalInfo((prevState) => ({
      ...prevState,
      plan_option: plan,
      period_billing: checked ? "Yearly" : "Monthly",
    }));
    Navigate("/addon");
  }

  return (
    <section className="section-two px-16 pt-6 pb-4 flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold my-2 text-primary-blue-950">
          Select your plan
        </h1>
        <p className="text-sm font-light text-neutral-grey-500">
          You have the option of monthly or yearly billing.
        </p>
      </header>
      <form onSubmit={handleSubmit} noValidate={true} className="h-full grid">
        <fieldset className="flex gap-4">
          <legend className="not-visible">Plan options</legend>
          {Plans.map((plan) => (
            <Formula
              key={plan.title}
              plan_={plan}
              title={plan.title}
              price_monthly={plan.price_monthly}
              price_yearly={plan.price_yearly}
              period={checked}
              imgUrl={plan.imageUrl}
              setter={setPlan}
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
        <div className="place-self-end w-full flex justify-between items-center">
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
    </section>
  );
}

export default Plan;

const Formula = ({ plan_, title, price_monthly, price_yearly, period, imgUrl, setter }) => {
  return (
    <label
      className="w-[125px] h-[175px] grid justify-between px-4 pt-6 pb-3 rounded-md cursor-pointer transition-all duration-300"
      htmlFor={title}
    >
      <input
        className="hidden on-checked"
        type="radio"
        name={"plan"}
        value={title}
        defaultChecked={title==="Arcade"}
        onChange={() => setter(plan_)}
        id={title}
      />
      <img src={imgUrl} alt={title} />

      <div className="flex flex-col place-self-end">
        <strong className="font-bold text-primary-blue-950">{title}</strong>
        <em className="not-italic text-neutral-grey-500 text-sm">
          {period
          ? `$${price_yearly}/yr`
          : `$${price_monthly}/mo`}
        </em>
        {period && <em className="not-italic text-primary-blue-950 text-sm">2 months free</em>}
      </div>
    </label>
  );
};
