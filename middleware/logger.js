module.exports = (req, res, next) => {
    console.log('Request:', req.method, req.path);
    next();
}