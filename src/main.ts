import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("My App API")
    .setDescription("Api documentation for DGS App")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/*
BACKEND CODE ANALYSIS FOR DGS_APP:

ARCHITECTURE:
- NestJS framework with TypeORM for database operations
- PostgreSQL database
- JWT authentication with Passport
- Swagger API documentation
- Modular structure: Users, Projects, Submissions

MODULES:

1. USERS MODULE:
   - Authentication with JWT tokens
   - Password hashing with bcrypt
   - Role-based access (user/admin)
   - Guards: JwtAuthGuard, AdminGuard
   - Endpoints: CRUD operations, login

2. PROJECTS MODULE:
   - Project management linked to users
   - Due date tracking
   - Tool and set categorization
   - User reassignment capability

3. SUBMISSIONS MODULE:
   - Linked to projects
   - Tracks: application, link, modality, summary
   - Pricing options array
   - Full name tracking

SECURITY:
- JWT Bearer authentication
- Password hashing (bcrypt, salt rounds: 10)
- Role-based authorization
- Guards protecting sensitive endpoints

STRENGTHS:
- Clean modular architecture
- Proper DTO validation (class-validator)
- Swagger documentation
- TypeScript for type safety
- Separation of concerns

POTENTIAL IMPROVEMENTS:
- Add environment variable validation
- Implement refresh tokens
- Add rate limiting
- Enhanced error handling
- Add logging service
- Database migrations
- Add CORS configuration
- Input sanitization
- Add API versioning
*/

