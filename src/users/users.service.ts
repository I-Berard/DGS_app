import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const user = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword
    });

    try {
      const savedUser = await this.userRepo.save(user)
      const {password, ...userWithoutPass} = savedUser
      return userWithoutPass;
    }catch(err){
      throw new BadRequestException(err);
    }
  }

  async login(LoginUserDto: LoginUserDto){
    const { username, sandai_email, personal_email, password } = LoginUserDto;

    if(!username && !sandai_email && !personal_email) throw new BadRequestException("Provide email or username")
    if(!password) throw new BadRequestException("No password provided")

    const user = await this.userRepo.findOne({
      where: [
        {username},
        {sandai_email},
        {personal_email}
      ]
    })

    if(!user){
      throw new UnauthorizedException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new Error("Invalid credentials");

    const payload = {sub: user.id, username: user.username, role: user.role}
    return {access_token: this.jwtService.sign(payload)};
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users.map(({password, ...userWithoutPass}) => userWithoutPass);
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
