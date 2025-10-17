import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-users.dto'
import { UpdateUserDto } from './dto/update-users.dto'
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.schema'


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(data: Partial<User>): Promise<User> {
        try {
            const user = new this.userModel(data);
            console.log(user)
            return await user.save();
        } catch (err){
            console.error(err)
            throw new Error('Failed to create user');
        }
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    findOne(id: number) {
        return `This action returns a #${id} user`
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}