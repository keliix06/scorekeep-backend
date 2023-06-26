import { Module } from '@nestjs/common';
import { Env } from './env/env.service';

@Module({
  providers: [Env],
  exports: [Env],
})
export class UtilsModule {}
