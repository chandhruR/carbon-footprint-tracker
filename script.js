// Predefined carbon footprint values (kg of CO2 per unit)
const carbonValues = {
    groceries: 0.12,
    electronics: 0.6,
    transport: 0.4,
    publicTransport: 0.16,
    fuel: 8.89,
    flights: 0.29
};

// Suggestion tips for users to reduce their carbon footprint and potential savings
const savings = {
    groceries: {
        tip: "Try buying local or organic to reduce your carbon footprint.",
        savingsPerDollar: 0.02
    },
    electronics: {
        tip: "Consider purchasing energy-efficient devices.",
        savingsPerDollar: 0.15
    },
    transport: {
        tip: "Take public transport to reduce emissions.",
        savingsPerMile: 0.24
    },
    fuel: {
        tip: "Use electric or hybrid vehicles when possible.",
        savingsPerGallon: 8.89
    },
    flights: {
        tip: "Consider traveling by train or reducing the number of flights.",
        savingsPerMile: 0.15
    }
};

// Initialize variables
let totalCarbonFootprint = 0;
let usedCategories = [];
let categorySavings = {};

// Function to update savings tips
function updateSavingsTips() {
    let tipsContainer = document.getElementById('savings-tips');
    tipsContainer.innerHTML = '';  // Clear any existing tips

    usedCategories.forEach((category, index) => {
        let tip = savings[category].tip;
        let savedCO2 = categorySavings[category].toFixed(2);
        let tipElement = document.createElement('p');
        tipElement.innerHTML = `${tip} You could reduce your carbon footprint by ${savedCO2} kg of CO2.`;
        tipsContainer.appendChild(tipElement);

        // Delay adding the 'show' class to trigger the fade-in animation for each tip
        setTimeout(() => {
            tipElement.classList.add('show');
        }, 100 * index);
    });
}

// Event listener for the form submission
document.getElementById('purchase-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    let carbonFootprint = 0;

    // Calculate the carbon footprint based on the category and unit
    if (category === 'groceries' || category === 'electronics') {
        carbonFootprint = (carbonValues[category] * amount).toFixed(2);
    } else if (category === 'transport') {
        carbonFootprint = (carbonValues['transport'] * amount).toFixed(2);
    } else if (category === 'fuel') {
        carbonFootprint = (carbonValues['fuel'] * amount).toFixed(2);
    } else if (category === 'flights') {
        carbonFootprint = (carbonValues['flights'] * amount).toFixed(2);
    }

    totalCarbonFootprint += parseFloat(carbonFootprint);

    // Store the latest savings for each category
    if (categorySavings[category] == undefined) {
        categorySavings[category] = 0;
    }
    categorySavings[category] += parseFloat(carbonFootprint);

    // Display the current purchase's carbon footprint
    const carbonResultElement = document.getElementById('carbon-result');
    carbonResultElement.innerText = `This purchase's estimated carbon footprint is ${carbonFootprint} kg of CO2`;

    // Trigger animation for current purchase result
    carbonResultElement.style.opacity = 0
    await new Promise(r => setTimeout(r, 200));
    carbonResultElement.style.opacity = 1

    // Display the cumulative total carbon footprint
    const totalCarbonResultElement = document.getElementById('total-carbon-result');
    totalCarbonResultElement.innerText = `Your total carbon footprint is ${totalCarbonFootprint.toFixed(2)} kg of CO2`;

    // Trigger animation for total result
    /*totalCarbonResultElement.classList.remove('show'); // Reset the animation
    void totalCarbonResultElement.offsetWidth; // Trigger reflow
    totalCarbonResultElement.classList.add('show'); // Add the class to animate*/
    totalCarbonResultElement.style.opacity = 0;
    await new Promise(r => setTimeout(r, 200));
    totalCarbonResultElement.style.opacity = 1;

    // Track the category for eco-friendly tips
    if (!usedCategories.includes(category)) {
        usedCategories.push(category);
    }
    updateSavingsTips();
});
