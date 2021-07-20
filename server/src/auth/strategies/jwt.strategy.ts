// import { Injectable } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
// import { PassportStrategy } from '@nestjs/passport'
// import { ExtractJwt, Strategy } from 'passport-jwt'
// // import { UserModel } from '../user.model'

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: true,
//       secretOrKey: configService.get('JWT_SECRET'),
//     })
//   }
//   validate(){}
// }

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
// import { UserModel } from '../user.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('SECRET_KEY'),
    })
  }

  async validate({ email, id, roles }) {
    return { email, id, roles }
  }
}
