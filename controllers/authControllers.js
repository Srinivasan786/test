exports.ensureAuthorized = function(req, res, next) {
    try {
        let bearerToken;
        let bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            let bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            //check token is present
            if (bearerToken) {
                // req.token = bearerToken;
                next();
            } else {
                res.status(403).send({
                    success: false,
                    message: 'Not authorized'
                });
            }
        } else {
            res.status(403).send({
                success: false,
                message: 'No authorization provided'
            });
        }
    } catch (e) {
        res.status(500)
            .json({
                status: 'Error',
                message: e
            });
    }
};
