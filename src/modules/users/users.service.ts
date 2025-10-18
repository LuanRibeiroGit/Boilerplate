import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-users.dto'
import { UpdateUserDto } from './dto/update-users.dto'
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.schema'


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(data: CreateUserDto): Promise<User> {
        try {
            const existingUser = await this.findOne(data.email)
            if(existingUser) throw new BadRequestException('Email already exists')
            if(data.password !== data.confirmPassword) throw new BadRequestException('Passwords do not match')

            
            const user = new this.userModel(data);
            return await user.save();
        } catch (err){
            console.error(err.response.message || 'Failed to create user')
            throw new BadRequestException(err.response.message || 'Failed to create user');
        }
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email }).exec()
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}