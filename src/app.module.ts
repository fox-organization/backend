import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { ServicesModule } from '@modules/services/services.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
