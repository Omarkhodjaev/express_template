import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterDto, LoginDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/user-update.dto';
import { validate } from 'class-validator';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  private async findUserOrFail(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
  }

  private async validateOrThrow(dto: any) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw {
        status: 400,
        message: 'Validation error',
        details: errors.map(e => ({
          property: e.property,
          constraints: e.constraints
        }))
      };
    }
  }

  async register(data: RegisterDto) {
    await this.validateOrThrow(data);
    const existing = await this.userRepository.findOneBy({ email: data.email });
    if (existing) {
      throw { status: 409, message: 'Email already exists' };
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepository.create({ ...data, password: hashedPassword });
    await this.userRepository.save(user);
    return { id: user.id, name: user.name, email: user.email };
  }

  async login(data: LoginDto) {
    await this.validateOrThrow(data);
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw { status: 401, message: 'Invalid credentials' };
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw { status: 401, message: 'Invalid credentials' };
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    return { token };
  }

  async getUsers() {
    return this.userRepository.find({ select: ['id', 'name', 'email', 'createdAt', 'updatedAt'] });
  }

  async getUser(id: number) {
    const user = await this.findUserOrFail(id);
    const { password, ...rest } = user;
    return rest;
  }

  async updateUser(id: number, data: UpdateUserDto) {
    await this.validateOrThrow(data);
    await this.findUserOrFail(id);
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await this.userRepository.update(id, data);
    return this.getUser(id);
  }

  async deleteUser(id: number) {
    await this.findUserOrFail(id);
    await this.userRepository.delete(id);
    return { message: 'User deleted' };
  }
} 