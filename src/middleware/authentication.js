const authenticationMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).send({
            "message": "No authorization was provided",
        })
    } else {
        // Verify token
        next();
    }
};

exports.authenticationMiddleware = authenticationMiddleware