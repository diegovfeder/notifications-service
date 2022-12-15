import { Module } from '@nestjs/common';
import { DatabaseModule } from './app/infra/database/database.module';
import { HttpModule } from './app/infra/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
