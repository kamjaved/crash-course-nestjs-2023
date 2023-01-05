import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([User]),
		PassportModule.register({ defaultStrategy: 'jwt' }),

		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return {
					secret: configService.get('JWT_SECRET'),
					signOptions: {
						expiresIn: 3600,
					},
				};
			},
		}),
	],

	providers: [AuthService, UserRepository, JwtStrategy],
	controllers: [AuthController],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
