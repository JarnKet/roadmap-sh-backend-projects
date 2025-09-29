const User = require('../models/user.model');



//@desc Get user profile
//@route GET /api/v1/users/profile
//@access Private
exports.getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({
            message: "User profile fetched successfully",
            success: true,
            data: user
        });
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
}