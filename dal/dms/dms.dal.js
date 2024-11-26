import DMS from "../../models/dms.model.js"

export const getDocDal = async (referenceNo) => {
    const docData = await DMS.findOne({ referenceNumber: referenceNo })
    return docData
}