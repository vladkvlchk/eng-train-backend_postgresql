import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 4444;
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
        .setTitle('ENG-TRAIN documentation')
        .setDescription('Documentation REST API')
        .setVersion("1.0.1")
        .addTag('vladkvlchk')
        .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
bootstrap();
