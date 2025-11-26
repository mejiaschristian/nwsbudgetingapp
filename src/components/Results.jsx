import React, { useState } from "react";
import { calculateBudget } from "../App";

const Display = ({ budgetType, value, inputValue, onInputChange }) => {
    const isOverspent = Number(inputValue) > Number(value); // Check if overspent

    return (
        <div>
            <div
                className={`items-center border border-solid ${
                    isOverspent
                        ? "border-red-600 shadow-red-600 shadow"
                        : "border-stone-600"
                } rounded-lg hover:bg-stone-700 transition-all p-2 flex flex-col gap-2`}
            >
                <p>
                    {budgetType}: <span className="font-bold">{value}</span>{" "}
                </p>
                <input
                    className="bg-white hover:bg-stone-200 transition-all text-lg text-center text-black rounded p-1 w-full"
                    type="number"
                    value={inputValue}
                    id="amtSpent"
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder="Amount to spend"
                />
                <div className="flex gap-1 text-sm w-full">
                    <button
                        className="bg-red-600 p-1 w-full rounded cursor-pointer font-semibold hover:bg-red-700 transition-all"
                        onClick={() => onInputChange("")}
                    >
                        Clear
                    </button>
                    <button
                        className="bg-green-600 p-1 w-full rounded cursor-pointer font-semibold hover:bg-green-700 transition-all"
                        onClick={() => onInputChange(value)}
                    >
                        Max Amount
                    </button>
                </div>
            </div>
            {isOverspent && (
                <span className="text-red-500 text-sm font-semibold">
                    Overspent!
                </span>
            )}
        </div>
    );
};

const Results = ({ budget, selectedPlan }) => {
    const results = calculateBudget(budget, selectedPlan);

    const [needsAmount, setNeedsAmount] = useState(null);
    const [wantsAmount, setWantsAmount] = useState(null);
    const [savingsAmount, setSavingsAmount] = useState(null);

    if (!results) {
        return <div>Please enter a valid budget and select a plan.</div>;
    }

    const totalSpent =
        Number(needsAmount) + Number(wantsAmount) + Number(savingsAmount);
    const remainingBudget = (budget - totalSpent).toFixed(2);

    return (
        <div className="text-xl text-center flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Results:</h2>
            <h2 className="text-2xl">
                Total Amount Left:{" "}
                <span className="font-bold">{remainingBudget}</span>
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
                <Display
                    budgetType="Needs"
                    value={results.needs}
                    inputValue={needsAmount}
                    onInputChange={setNeedsAmount}
                />
                <Display
                    budgetType="Wants"
                    value={results.wants}
                    inputValue={wantsAmount}
                    onInputChange={setWantsAmount}
                />
                <Display
                    budgetType="Savings"
                    value={results.savings}
                    inputValue={savingsAmount}
                    onInputChange={setSavingsAmount}
                />
            </div>
        </div>
    );
};

export default Results;
