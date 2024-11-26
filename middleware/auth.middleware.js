/* eslint-disable no-undef */
import generateResponse from "../lib/generateResponse.js"
import HttpStatus from "../lib/httpStatus.js"

const auth = (req, res, next) => {
    const secret = req.headers?.secret
    if (secret !== process.env.AT_SECRET) {
        generateResponse(
            res,
            HttpStatus.Unauthorized,
            'Unauthorized'
        )
    } else {
        next()
    }
}

export default auth