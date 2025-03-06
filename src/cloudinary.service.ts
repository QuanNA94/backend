import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

export class CloudinaryService {
    constructor() {
        v2.config({
            cloud_name: 'dz5g1mhu8',
            api_key: '969933914493625',
            api_secret: '8WVakfBef89j6dmhiR6ChXVaosA',
        });
    }

    async uploadImage(
        filePath: string,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            v2.uploader.upload(
                filePath,
                { folder: 'products' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            );
        });
    }
}
