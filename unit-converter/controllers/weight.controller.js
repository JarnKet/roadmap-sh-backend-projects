// --- LOGIC FOR WEIGHT CONVERSION ---
const weightConversionRates = {
    gram: 1,
    kilogram: 1000,
    milligram: 0.001,
    pound: 453.592,
    ounce: 28.3495,
};

function convertWeight(value, fromUnit, toUnit) {
    const valueInGrams = value * weightConversionRates[fromUnit];
    const result = valueInGrams / weightConversionRates[toUnit];
    return result;
}

// --- ROUTES FOR WEIGHT CONVERTER ---


function initialRenderWeight(req, res) {
    res.render('weight', { result: null });
}

function postRenderWeight(req, res) {
    const { value, fromUnit, toUnit } = req.body;
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
        return res.render('weight', { result: 'Invalid Input' });
    }

    const calculationResult = convertWeight(numericValue, fromUnit, toUnit);

    res.render('weight', {
        result: calculationResult.toFixed(4),
        originalValue: value,
        fromUnit: fromUnit,
        toUnit: toUnit,
    });
}

module.exports = {
    initialRenderWeight,
    postRenderWeight
};