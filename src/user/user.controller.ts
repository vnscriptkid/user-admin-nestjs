import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  all() {
    return ['user1', 'user2'];
  }
}
