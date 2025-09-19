const writeGood = require('write-good');

exports.checkGrammar = (req, res) => {
    try {
        const {text} = req.body;

        // Check if text was provided in the request body
        if (!text) {
            return res.status(400).json({message: "Text is required", success: false});
        }

        // Use write-good to get suggestions
        const suggestions = writeGood(text);

        // Send the suggestions back as a JSON response
        res.status(200).json({message: "Grammar check completed successfully", success: true, data: suggestions});


    } catch (error) {
        console.error("Error in grammar check: ", error);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}