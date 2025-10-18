import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common'
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
            if(data.password !== data.confirmPassword) throw new BadRequestException('Passwords do not match')
            
            const user = new this.userModel(data);
            return await user.save();
        } catch (err) {
            if (err.code === 11000) {
                throw new ConflictException(`O email '${data.email}' já está em uso.`);
            }
            throw err;
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.userModel.find().exec();
        } catch (err) {
            throw new BadRequestException(err.response.message || 'Failed to get users');
        }
    }

    async findById(_id: string): Promise<User> {
        const user = await this.userModel.findById(_id).exec();
        if (!user) {
            throw new NotFoundException(`Failed to get user by id ${_id}`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.userModel.findOne({ email }).exec()
        } catch (err) {
            throw new BadRequestException(err.response.message || 'Failed to get user with email');
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(
                id,
                updateUserDto,
                { new: true }
            ).exec();
            if (!updatedUser) {
                throw new NotFoundException(`Unable to update: User with ID "${id}" not found.`);
            }

            return updatedUser;

        } catch (err) {
            throw new BadRequestException(err.response.message || 'Failed to update user');
        }
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}