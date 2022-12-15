"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const express_validator_1 = require("express-validator");
const validateData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
};
exports.validateData = validateData;
//# sourceMappingURL=validateData.js.map