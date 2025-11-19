const { sanitizeInput } = require("../utils/sanitize");

const validateTask = (req, res, next) => {
    const { title, description } = req.body;

    //Sanitize Inputs
    title = sanitizeInput(title);
    description = sanitizeInput(description);

    //Validation Checks
    if(!title || title.trim() === '') {
        return res.status(400).json({message:'Title is required'});
    }

    if(!description || description.trim() === '') {
        return res.status(400).json({message:'Description is required'});
    }

    if(title.length > 100) {
        return res.status(400).json({message:'Title cannot exceed 100 characters'});
    }

    if(description.length > 500) {
        return res.status(400).json({message:'Description cannot exceed 500 characters'});
    }

    // Send Santized input to req.body
    req.body.title = title;
    req.body.description = description;

    next();
};

module.exports = {validateTask};