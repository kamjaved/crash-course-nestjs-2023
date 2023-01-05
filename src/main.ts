import { TransformInterceptor } from './transform.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const PORT = 3000;
	const app = await NestFactory.create(AppModule);
	const logger = new Logger();
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new TransformInterceptor());
	await app.listen(PORT, () => {
		logger.verbose(`Application Strated Runnig at port ${PORT}`);
	});
}
bootstrap();
