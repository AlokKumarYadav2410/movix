function handleError(err, req, res, next) {
    res.status(err.status).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
}