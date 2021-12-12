
module.exports = (req, res, next) => {
    req.userIdParam = req.params.userId;
    next();
}