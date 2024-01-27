'use strict';

export default (permission) => {
    return (req, res, next) => {
        console.log(req.objKey.permissions);
        if (!req.objKey.permissions) {
            return res.status(403).json({ message: "Permission denied" });
        }

        const validPermission = req.objKey.permissions.includes(permission);
        if (!validPermission) {
            return res.status(403).json({ message: "Permission denied" });
        }

        return next();
    };
};