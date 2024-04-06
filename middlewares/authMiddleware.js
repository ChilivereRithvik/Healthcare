const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        JWT.verify(token, process.env.JWT_SEC, (err, decode) => {
            if (err) {
                console.error(err); // Log the error for debugging purposes
                return res.status(200).send({ message: "Authentication Failed", success: false });
            } else {
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (e) {
        console.error(e); // Log any unexpected errors for debugging purposes
        res.status(401).send({
            message: "Internal Server Error",
            success: false,
        });
    }
};
