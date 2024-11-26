import mongoose, { Schema } from "mongoose";


const docSchema = new Schema({
    referenceNumber: {
        type: String,
        required: true,
        unique: true
    },
    mimeType: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    size: {
        type: Number,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: v => v.toLocaleDateString(),
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        get: v => v.toLocaleDateString(),
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});


docSchema.statics.create = async function (referenceNumber, mimeType, fileName, size) {

    const doc = new this({
        referenceNumber,
        mimeType,
        fileName,
        ...(size && { size: size }),
    });

    await doc.save();

    return doc;
};

const DMS = mongoose.model('doc', docSchema)

export default DMS