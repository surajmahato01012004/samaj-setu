const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // Make sure the user is authenticated first
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        // Check whether user's role is allowed
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied for your role"
            });
        }

        next();
    };
};

module.exports = {
    authorize
};