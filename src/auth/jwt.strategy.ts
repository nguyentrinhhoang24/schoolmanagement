import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  async validate(payload: { id: string, email: string, school_id: string}) {
    const { id } = payload;

    if (!id) {
      throw new UnauthorizedException('Invalid token payload.');
    }

    const user = await this.userModel.findById(id).select('-password');

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    console.log('payload:',payload);

    return { id: user._id, email: user.email, role: user.role, user, school_id: user.school_id };
  }
}
