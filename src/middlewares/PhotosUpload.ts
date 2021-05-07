import * as multer from "multer";
import { MulterAzureStorage } from 'multer-azure-blob-storage';
import path from 'path';
import crypto from 'crypto';

const azureStorage: MulterAzureStorage = new MulterAzureStorage({
    connectionString: process.env.ContainerConnectionString,
    accessKey: process.env.StorageKey,
    accountName: process.env.StorageAccountName,
    containerName: process.env.BlobContainer,
    containerAccessLevel:'blob'
});

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file:Express.Multer.File, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'public', 'uploads'))
        },
        filename: (req, file:Express.Multer.File, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(null, err.message)

                file.filename = `${hash.toString('hex')}${file.mimetype.replace('image/', '.')}`

                cb(null, file.filename)
            })
        }
    }),

    azure: azureStorage
}

export default {
    dest: path.resolve(__dirname, '..', '..', 'public', 'uploads'),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("invalid file type."))
        }
    }
}