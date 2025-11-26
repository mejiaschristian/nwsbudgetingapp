import React from "react";
import infoIcon from "../assets/info.svg";

const Heading = () => {
    const [showInfo, setShowInfo] = React.useState(false);

    const toggleInfo = () => {
        setShowInfo((prev) => !prev);
    };

    return (
        <div className="mt-3 w-full">
            <div className="flex flex-wrap justify-center items-center gap-5">
                <h1 className="text-4xl font-bold text-center">
                    NWS Budgeting App
                </h1>
                <img
                    src={infoIcon}
                    alt="Toggle Info"
                    className="w-6 h-6 cursor-pointer opacity-60"
                    style={{ filter: "invert(1)" }}
                    onClick={toggleInfo}
                />
            </div>
            <p className="text-center mx-auto max-w-[50%] mt-4 text-stone-300 flex flex-col items-center gap-2">
                {showInfo && (
                    <span>
                        A <b>N</b>eeds, <b>W</b>ants, and <b>S</b>avings budgeting app. This
                        budgeting app will help you prioritize your needs and
                        wants based on your budget. Choose your desired
                        percentage for each category.
                    </span>
                )}
            </p>
        </div>
    );
};

export default Heading;
