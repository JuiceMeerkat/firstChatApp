

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)) {
            console.log('req.user : ', req.user);
            console.log('req : ', req);
            return res.status(403).json({
                "message": "Access denied, role doesn't match url role"
            })

        }
        next();
    };
};


 export default authorizeRoles;