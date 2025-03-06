import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            const result = await this.cloudinaryService.uploadImage(file.path);
            return result;
        } catch (error) {
            console.log('Error upload images', error);
            throw new Error('Failed to upload image');
        }
    }
}
