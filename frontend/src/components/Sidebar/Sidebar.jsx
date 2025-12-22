function Sidebar() {
    const Steps = [
        {
            number: 1,
            title: "Your Info",
        },
        {
            number: 2,
            title: "Select Plan",
        },
        {
            number: 3,
            title: "Add-ons",
        },
        {
            number: 4,
            title: "Summary",
        },
    ];

    return (
        <section className="min-w-[250px] min-h-[500px] flex flex-col gap-6 bg-sidebar-img rounded-xl px-8 py-10">
            {Steps.map(step => (
                <Step key={step.number} number={step.number} title={step.title} />
            ))}
        </section>
    );
}

export default Sidebar;

function Step({ number, title }) {
    return (
        <article className="flex gap-4 items-center text-neutral-white">
            <div className="step-circle w-8 h-8 grid place-items-center content-center rounded-full border border-neutral-white">
                <span className="font-bold text-sm">{number}</span>
            </div>
            <div className="flex flex-col">
                <em className="not-italic uppercase font-light text-xs">Step {number}</em>
                <strong className="uppercase font-bold text-sm">{title}</strong>
            </div>
        </article>
    );
}
