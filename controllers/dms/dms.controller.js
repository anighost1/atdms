import Dms from "../../models/dms.model.js"
import generateResponse from "../../lib/generateResponse.js"
import HttpStatus from "../../lib/httpStatus.js"
import { getDocDal } from "../../dal/dms/dms.dal.js"

export const create = async (req, res) => {
    const doc = req?.file
    try {
        const newDoc = await Dms.create(req?.unique, doc?.mimetype, doc?.filename, doc?.size)
        generateResponse(
            res,
            HttpStatus.OK,
            'Document successfully created',
            newDoc
        )
    } catch (err) {
        console.error(`[${new Date().toISOString()}]`, err)
        generateResponse(
            res,
            err?.status || HttpStatus.BadRequest,
            err?.message
        )
    }
}

export const get = async (req, res) => {
    const { referenceNo } = req.params
    try {

        if (!referenceNo) {
            throw new Error('Reference number is required as "referenceNo"')
        }

        const docData = await getDocDal(referenceNo)
        if (!docData) {
            throw new Error('No document found')
        }
        const docDataPlain = docData.toObject ? docData.toObject() : { ...docData };
        if (docDataPlain) {
            docDataPlain.docPath = `${req.protocol}://${req.get('host')}/doc/${docData?.fileName}`;
        } else {
            throw new Error('No document found')
        }
        generateResponse(
            res,
            HttpStatus.OK,
            'Document fetched successfully',
            docDataPlain
        )
    } catch (err) {
        console.error(`[${new Date().toISOString()}]`, err)
        generateResponse(
            res,
            err?.status || HttpStatus.NotFound,
            err?.message
        )
    }
}