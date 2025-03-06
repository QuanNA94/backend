import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@/frameworks/auth/auth.service';
import { jwtConstants } from './constants';

// @Injectable: Đánh dấu JwtStrategy là một service có thể được inject vào các nơi khác trong ứng dụng.
@Injectable()
// Định nghĩa lớp JwtStrategy, kế thừa từ PassportStrategy và sử dụng chiến lược passport-jwt.
export class JwtStrategy extends PassportStrategy(Strategy) {
    //Inject AuthService vào constructor để sử dụng trong chiến lược.
    constructor(private authService: AuthService) {
        super({
            // jwtFromRequest: Xác định cách trích xuất JWT từ request.
            // Ở đây sử dụng Authorization header theo định dạng Bearer <token>.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // ignoreExpiration: Nếu false, JWT hết hạn sẽ bị từ chối.
            secretOrKey: jwtConstants.secret, // Giá trị bí mật được dùng để xác minh token
        });
    }

    // Định nghĩa hàm validate sẽ được gọi sau khi JWT được giải mã và xác minh
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validationUser(username, password);
        if (!user) {
            throw new UnauthorizedException(); // Exception này được ném ra khi xác thực thất bại.
        }
        return user;
    }
}
