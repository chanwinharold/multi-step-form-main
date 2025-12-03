import React from "react";
import { Link } from "react-router";

function Plan() {
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
      <form noValidate={true}>
        <fieldset>
            <legend className="">Plan options</legend>

        </fieldset>
        <fieldset>
            <legend>Period billing choice</legend>

        </fieldset>
        <div>
            <Link>Go Back</Link>
            <button type="submit">
                Next Step
            </button>
        </div>
      </form>
    </section>
  );
}

export default Plan;
