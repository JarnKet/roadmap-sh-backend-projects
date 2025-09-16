// --- LOGIC FOR TEMPERATURE CONVERSION ---
function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) {
        return value;
    }

    let valueInCelsius;

    // 1. แปลงหน่วยเริ่มต้นให้เป็น Celsius ก่อน (หน่วยฐาน)
    switch (fromUnit) {
        case 'fahrenheit':
            valueInCelsius = (value - 32) * 5 / 9;
            break;
        case 'kelvin':
            valueInCelsius = value - 273.15;
            break;
        default: // fromUnit is 'celsius'
            valueInCelsius = value;
            break;
    }

    // 2. แปลงจาก Celsius ไปเป็นหน่วยที่ต้องการ
    let result;
    switch (toUnit) {
        case 'fahrenheit':
            result = (valueInCelsius * 9 / 5) + 32;
            break;
        case 'kelvin':
            result = valueInCelsius + 273.15;
            break;
        default: // toUnit is 'celsius'
            result = valueInCelsius;
            break;
    }

    return result;
}

// --- ROUTES FOR TEMPERATURE CONVERTER ---


function initialRenderTemperature(req, res){
    res.render('temperature', { result: null });
}

function postRenderTemperature(req, res){
    console.log(req.body, "Body");

    const { value, fromUnit, toUnit } = req.body;
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
        return res.render('temperature', { result: 'Invalid Input' });
    }

    const calculationResult = convertTemperature(numericValue, fromUnit, toUnit);

    res.render('temperature', {
        result: calculationResult.toFixed(2), // อุณหภูมินิยมใช้ทศนิยม 2 ตำแหน่ง
        originalValue: value,
        fromUnit: fromUnit,
        toUnit: toUnit,
    });
}


module.exports = {
    initialRenderTemperature,
    postRenderTemperature,
}
