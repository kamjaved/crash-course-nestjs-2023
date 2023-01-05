import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	exports: [],
	providers: [AppService],
	controllers: [AppController],

	imports: [
		ConfigModule.forRoot({
			envFilePath: [`.env.stage.${process.env.STAGE}`],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return {
					type: 'postgres',
					host: configService.get('DB_HOST'),
					port: configService.get('DB_PORT'),
					username: configService.get('DB_USERNAME'),
					password: configService.get('DB_PASSWORD'),
					database: configService.get('DB_NAME'),
					autoLoadEntities: true,
					synchronize: true,
				};
			},
		}),

		TasksModule,
		TodoModule,
		AuthModule,
	],
})
export class AppModule {}
