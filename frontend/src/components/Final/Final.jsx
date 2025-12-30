import thankUrl from "../../assets/images/icon-thank-you.svg"

function Final() {
    return (
        <section className='section-four mobile:w-full mobile:h-full grid place-items-center self-center text-center gap-8 mobile:px-16 mobile:pt-6 mobile:pb-4 py-10 mobile-form'>
            <img src={thankUrl} alt="Thank you" />
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl text-primary-blue-950 font-bold'>Thank you!</h1>
                <p className='text-neutral-grey-500 max-w-[450px]'>
                    Thank for confirming your subscription! We hope you have fun using our
                    platform. If you ever need support, please feel free to email us at
                    support@loremgaming.com.
                </p>
            </div>
        </section>
    );
}

export default Final;