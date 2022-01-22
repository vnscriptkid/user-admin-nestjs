import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret-token',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  exports: [JwtModule],
})
export class CommonModule {}
