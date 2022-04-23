import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/guard/jwt.guard';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Conduit API')
    .setDescription('Conduit API')
    .setContact(
      'Realworld - Website',
      'https://github.com/bytesbanana/realworld-nestjs',
      ''
    )
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .setVersion('1.0.0')
    .addBearerAuth()

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
