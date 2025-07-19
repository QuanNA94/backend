import { UsersService } from '@/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable: Đánh dấu JwtStrategy là một service có thể được inject vào các nơi khác trong ứng dụng.
@Injectable()
// Định nghĩa lớp JwtStrategy, kế thừa từ PassportStrategy và sử dụng chiến lược passport-jwt.
export class JwtStrategy extends PassportStrategy(Strategy) {
    //Inject AuthService vào constructor để sử dụng trong chiến lược.
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET');

        super({
            // jwtFromRequest: Xác định cách trích xuất JWT từ request.
            // Ở đây sử dụng Authorization header theo định dạng Bearer <token>.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // ignoreExpiration: Nếu false, JWT hết hạn sẽ bị từ chối.
            secretOrKey: jwtSecret,
        });
    }

    // Định nghĩa hàm validate sẽ được gọi sau khi JWT được giải mã và xác minh
    async validate(payload: any) {
        const user = await this.userService.findOne(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
