const Radio = ({ text, value, onClick }) => {
    const handleClick = (event) => {
        onClick(value, event);
    };

    return (
        <div>
            <label className="cursor-pointer flex items-center w-full md:w-auto gap-2 border border-solid border-stone-600 p-2 rounded-lg hover:bg-stone-700 transition-all">
                <input
                    type="radio"
                    name="budget-plan"
                    value={value}
                    className="accent-green-500"
                    onClick={handleClick}
                />
                {text}
            </label>
        </div>
    );
};

export default Radio;
