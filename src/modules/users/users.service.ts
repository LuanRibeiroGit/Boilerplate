import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-users.dto'
import { UpdateUserDto } from './dto/update-users.dto'
import { Model } from 'mongoose'
import { User, UserDocument } from './schema/users.schema'


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
        try {
            if(data.password !== data.confirmPassword) throw new BadRequestException('Passwords do not match')
            const user = await new this.userModel(data).save()
            const { password, ...result } = user.toObject()
            return result
        } catch (err) {
            if (err.code === 11000) {
                throw new ConflictException(`The email '${data.email}' is already in use`)
            }
            throw err
        }
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().select('-password').exec()
    }

    async findById(_id: string): Promise<Omit<User, 'password'>> {
        const user = await this.userModel.findById(_id).exec()
        if (!user) {
            throw new NotFoundException(`Failed to get user by id ${_id}`)
        }
        const { password, ...result } = user.toObject()
        return result
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        const user = await this.userModel.findOne({ email }).exec()
        if (!user) {
            throw new BadRequestException(`Failed to get user with email ${email}`)
        }
        return user
        
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            console.log(id)
            console.log(updateUserDto)
            const updatedUser = await this.userModel.findByIdAndUpdate(
                id,
                updateUserDto,
                { new: true }
            ).exec()
            if (!updatedUser) {
                throw new NotFoundException(`User with ID "${id}" not found`)
            }
            
            return updatedUser

        }catch (err){
            if ((err as any).code === 11000) {
            throw new ConflictException(
                `The email '${updateUserDto.email}' is already in use`
            );
        }
            
            throw new BadRequestException('User not Found')
        }
    }

    async remove(id: string): Promise<void>{
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec()
        if (!deletedUser) {
            throw new NotFoundException(`User with ID "${id}" not found`)
        }
    }
}