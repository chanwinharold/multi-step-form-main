import React, { useState } from "react";
import { Link } from "react-router";

import iconArcade from "../../assets/images/icon-arcade.svg";
import iconAdvenced from "../../assets/images/icon-advanced.svg";
import iconPro from "../../assets/images/icon-pro.svg";

function Plan() {
  const Plans = [
    {
      title: "Arcade",
      price: 9,
      imageUrl: iconArcade,
    },
    {
      title: "Advenced",
      price: 12,
      imageUrl: iconAdvenced,
    },
    {
      title: "Pro",
      price: 15,
      imageUrl: iconPro,
    },
  ];

  const [checked, setChecked] = useState(false);

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
      <form noValidate={true} className="h-full grid">
        <fieldset className="flex gap-4">
          <legend className="not-visible">Plan options</legend>
          {Plans.map((plan) => (
            <Formula
              key={plan.title}
              title={plan.title}
              price={plan.price}
              imgUrl={plan.imageUrl}
            />
          ))}
        </fieldset>
        <fieldset className="w-full h-fit rounded-md p-4 bg-neutral-blue-50 flex justify-center gap-6">
          <legend className="not-visible">Period billing choice</legend>
          <strong
            onClick={() => setChecked(false)}
            className={`cursor-pointer ${
              !checked ? "text-primary-blue-950" : "text-neutral-grey-500"
            }`}
          >
            Monthly
          </strong>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked((v) => !v)}
              className="toggle checked:bg-primary-purple-600 bg-primary-blue-950 text-white"
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

const Formula = ({ title, price, imgUrl }) => {
  return (
    <label
      className="w-[125px] h-[150px] grid justify-between px-4 pt-6 pb-3 rounded-md cursor-pointer transition-all duration-300"
      htmlFor={title}
    >
      <input
        className="hidden on-checked"
        type="radio"
        name={"plan"}
        value={title}
        id={title}
      />
      <img src={imgUrl} alt={title} />

      <div className="flex flex-col place-self-end">
        <strong className="font-bold text-primary-blue-950">{title}</strong>
        <em className="not-italic text-neutral-grey-500 text-sm">
          ${price}/mo
        </em>
      </div>
    </label>
  );
};
