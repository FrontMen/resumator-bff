import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

// service
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';

// entity
import { User } from '../users/entity/user.entity';

// dto
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService
  ) {}
  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Something went wrong');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new NotFoundException('Email or password incorrect');
    }

    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<{ user: User; token: string }> {
    const foundUser = await this.userService.findUserByEmail(signUpDto.email);

    if (foundUser) {
      throw new ConflictException('Email already exist');
    }

    const hashedPassword = await hash(signUpDto.password, 10);

    const foundRole = await this.rolesService.getOneByName('employees');

    const createdUser = await this.userService.create({
      ...signUpDto,
      password: hashedPassword,
      role: foundRole.id
    });

    const token = this.jwtService.sign(
      { user: createdUser.email },
      { expiresIn: '5d' }
    );

    return {
      user: createdUser,
      token
    };
  }

  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    const foundUser = await this.userService.findUserByEmail(loginDto.email);

    if (!foundUser) {
      throw new NotFoundException('User email or password incorrect');
    }

    const isCorrectPassword = await compare(
      loginDto.password,
      foundUser.password
    );

    if (!isCorrectPassword) {
      throw new ConflictException('Incorrect password');
    }

    return {
      token: this.jwtService.sign(
        { email: loginDto.email },
        { expiresIn: '5d' }
      ),
      user: foundUser
    };
  }
}
