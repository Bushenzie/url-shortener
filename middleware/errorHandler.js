const {StatusCodes} = require("http-status-codes")

async function errorHandler(err,req,res,next) {
    if(err) {
        return res.status(err.statusCode ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: err.message ? err.message : "Something went wrong!"
        })
    }
    next();
}

module.exports = errorHandler;