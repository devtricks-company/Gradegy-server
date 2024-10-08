import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    //the config module is for configuration evniroment,and depends which env file is used.decied apply config as development(local for test) or production

    ConfigModule.forRoot({
      //read configuration from the yaml file
      isGlobal: true,
      load: [configuration],
    }),

    //mongo db connection setup by mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongodb.database.connectionString'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
