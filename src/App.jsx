import React, { useState } from "react";
import Heading from "./components/Heading";
import Radio from "./components/Radio";
import Results from "./components/Results";

// eslint-disable-next-line react-refresh/only-export-components
export function calculateBudget(budget, selectedPlan) {
    if (!budget || budget <= 0) {
        return null;
    }

    const budget70 = 0.7 * budget;
    const budget60 = 0.6 * budget;
    const budget50 = 0.5 * budget;
    const budget30 = 0.3 * budget;
    const budget20 = 0.2 * budget;
    const budget10 = 0.1 * budget;

    if (selectedPlan === "70-20-10") {
        return {
            needs: budget70.toFixed(2),
            wants: budget20.toFixed(2),
            savings: budget10.toFixed(2),
        };
    } else if (selectedPlan === "60-30-10") {
        return {
            needs: budget60.toFixed(2),
            wants: budget30.toFixed(2),
            savings: budget10.toFixed(2),
        };
    } else if (selectedPlan === "50-30-20") {
        return {
            needs: budget50.toFixed(2),
            wants: budget30.toFixed(2),
            savings: budget20.toFixed(2),
        };
    }

    return null;
}

const App = () => {
    const [budget, setBudget] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState("");
    const [showResults, setShowResults] = useState(false);

    const handleBudgetChange = (e) => {
        const newBudget = Number(e.target.value) || null;
        setBudget(newBudget);

        // If a plan is already selected, show results dynamically
        if (selectedPlan) {
            setShowResults(true);
        }
    };

    const handleRadioClick = (value, event) => {
        if (!budget || budget <= 0) {
            alert("Please enter a valid budget amount.");
            event.preventDefault();
            return;
        }

        setSelectedPlan(value);
        setShowResults(true);
    };

    const handleClear = () => {
        setBudget(null);
        setSelectedPlan("");
        setShowResults(false);
        document.getElementById("budget").value = "";
        document
            .querySelectorAll('input[name="budget-plan"]')
            .forEach((el) => (el.checked = false));
    };

    return (
        <main className="bg-stone-800 p-6 min-h-screen text-white w-full">
            <Heading />
            <div className="mt-5 w-full flex flex-col gap-6 items-center">
                <div className=" flex justify-center gap-3 flex-row flex-wrap items-center">
                    <h2 className="text-xl font-bold text-center">
                        Budget Amount:
                    </h2>
                    <input
                        className="bg-white hover:bg-stone-200 transition-all text-black rounded-lg p-2 w-40 text-center"
                        type="number"
                        id="budget"
                        placeholder="Enter Budget"
                        value={budget}
                        onChange={handleBudgetChange}
                    />
                    <button
                        className="cursor-pointer bg-red-500 hover:bg-red-600 transition-all rounded-lg font-semibold p-2 text-center w-full md:w-auto"
                        onClick={handleClear}
                    >
                        Reset
                    </button>
                </div>
                <div className="flex flex-col gap-4 font-semibold">
                    <h2 className="text-xl font-bold text-center">
                        Select and Compute a Budget Plan:
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <Radio
                            text="50% / 30% / 20%"
                            value="50-30-20"
                            onClick={handleRadioClick}
                        />
                        <Radio
                            text="60% / 30% / 10%"
                            value="60-30-10"
                            onClick={handleRadioClick}
                        />
                        <Radio
                            text="70% / 20% / 10%"
                            value="70-20-10"
                            onClick={handleRadioClick}
                        />
                    </div>
                </div>
                {showResults && (
                    <Results budget={budget} selectedPlan={selectedPlan} />
                )}
            </div>
        </main>
    );
};

export default App;
