document.addEventListener('DOMContentLoaded', function() {
    function calculateBudget() {
        const budgetInput = document.getElementById('budgetid');
        const budget = parseFloat(budgetInput.value);

        // Check if the budget is valid
        if (isNaN(budget) || budget <= 0) {
            alert('Please enter a valid budget amount.');
            return;
        }

        // Calculate budget allocations
        const budget50 = 0.50 * budget;
        const budget30 = 0.30 * budget;
        const budget20 = 0.20 * budget;

        // Update the budget display
        document.getElementById('budgetDisplay').textContent = `Budget: ${budget.toLocaleString()}`;
        document.getElementById('budget50Display').textContent = `${budget50.toLocaleString()}`;
        document.getElementById('budget30Display').textContent = `${budget30.toLocaleString()}`;
        document.getElementById('budget20Display').textContent = `${budget20.toLocaleString()}`;

        // Update radio button values
        document.getElementById('needRadio').value = budget50;
        document.getElementById('wantRadio').value = budget30;
        document.getElementById('emergencyRadio').value = budget20;

        // Show the result and hide extra inputs section
        document.getElementById('result').style.display = 'block';
        document.getElementById('extraInputs').style.display = 'none';

        // Clear previous selections and remaining amount
        document.querySelectorAll('input[name="budgetChoice"]').forEach(function(radio) {
            radio.checked = false;
        });
        document.getElementById('moneyspent').value = '';
        document.getElementById('remaining').innerHTML = '';

        // Add event listeners to update remaining only when a radio button is selected
        document.querySelectorAll('input[name="budgetChoice"]').forEach(function(radio) {
            radio.addEventListener('change', function() {
                document.getElementById('extraInputs').style.display = 'block';
                calculateRemaining();
            }, { once: true }); // Ensure the listener is only added once
        });

        // Apply the glow effect to the budget display
        applyGlowEffect(document.getElementById('budgetDisplay'));
    }

    function calculateRemaining() {
        const selectedRadio = document.querySelector('input[name="budgetChoice"]:checked');
        const spentAmount = parseFloat(document.getElementById('moneyspent').value);

        // Check if the selected radio and spent amount are valid
        if (!selectedRadio || isNaN(spentAmount) || spentAmount < 0) {
            document.getElementById('remaining').innerHTML = '';
            return;
        }

        const budgetAmount = parseFloat(selectedRadio.value);
        const remainingAmount = budgetAmount - spentAmount;

        // Update the remaining amount display
        const remainingDiv = document.getElementById('remaining');
        remainingDiv.innerHTML = `<p style="font-size: 18px">Remaining: <b>${remainingAmount.toLocaleString()}</b> left</p>`;

        // Apply the glow effect to the remaining amount display
        applyGlowEffect(remainingDiv);
    }

    function applyGlowEffect(element) {
        element.classList.add('glow');
        setTimeout(function() {
            element.classList.remove('glow');
        }, 1000);
    }

    // Event listeners
    document.getElementById('calculateButton').addEventListener('click', calculateBudget);

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        calculateBudget();
    });

    document.getElementById('calculateSpentButton').addEventListener('click', calculateRemaining);

    // Handle Enter key press in the "budgetid" input field
    document.getElementById('budgetid').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            calculateBudget();
            // Apply the glow effect here as well
            applyGlowEffect(document.getElementById('budgetDisplay'));
        }
    });

    // Handle Enter key press in the "moneyspent" input field
    document.getElementById('moneyspent').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            calculateRemaining();
        }
    });
});
