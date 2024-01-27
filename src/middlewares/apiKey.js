'use strict';
const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization",
};

export default async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({ message: "Forbidden Error" });
        }
        // chekc objKey
        const objKey = await findById(key);
        if (!objKey) {
            return res.status(403).json({ message: "Forbidden Error" });
        }
        req.objKey = objKey;

        return next();
    } catch (err) {
        console.log(err);
    }
};
