import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { User, UserSchema } from './schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ register UserModel
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
