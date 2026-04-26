import { AuthService } from './auth.service';
import { FileUploadService } from '../common/services/file-upload.service';
import { UserResponseDto } from './dtos/response.dto';
export declare class UploadController {
    private readonly authService;
    private readonly fileUploadService;
    constructor(authService: AuthService, fileUploadService: FileUploadService);
    uploadProfilePicture(req: any, file: Express.Multer.File): Promise<UserResponseDto>;
}
