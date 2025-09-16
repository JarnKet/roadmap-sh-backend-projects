// --- LOGIC FOR LENGTH CONVERSION ---
const lengthConversionRates = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
};

function convertLength(value, fromUnit, toUnit) {
    const valueInMeters = value * lengthConversionRates[fromUnit];
    const result = valueInMeters / lengthConversionRates[toUnit];
    return result;
}


 const initialRenderLength = async (req, res) => {
    res.render('length', { result: null });
}

 const postRenderLength = async (req, res) => {
    const { value, fromUnit, toUnit } = req.body;
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
        // กรณีผู้ใช้กรอกข้อมูลที่ไม่ใช่ตัวเลข
        return res.render('length', { result: 'Invalid Input' });
    }

    const calculationResult = convertLength(numericValue, fromUnit, toUnit);

    // เรนเดอร์หน้า length.ejs อีกครั้ง แต่ครั้งนี้ส่งผลลัพธ์ไปด้วย
    res.render('length', {
        result: calculationResult.toFixed(4), // แสดงทศนิยม 4 ตำแหน่ง
        originalValue: value,
        fromUnit: fromUnit,
        toUnit: toUnit,
    });
}


module.exports ={
    initialRenderLength,
    postRenderLength
}