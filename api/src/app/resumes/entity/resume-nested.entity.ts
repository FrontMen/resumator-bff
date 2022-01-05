// TODO: Create custom decorator for common validations
import {
  IsBoolean,
  IsDateString,
  IsString,
  IsUrl,
  MaxLength,
  MinLength
} from 'class-validator';

export class Education {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @MinLength(3)
  @MaxLength(30)
  @IsString()
  institute: string;

  @MinLength(3)
  @MaxLength(30)
  @IsString()
  name: string;
}

export class Experience {
  @MinLength(3)
  @MaxLength(30)
  @IsString()
  company: string;

  @MinLength(20)
  @MaxLength(300)
  @IsString()
  description: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @MinLength(3)
  @MaxLength(30)
  @IsString()
  role: string;
}

export class Stack {
  @IsBoolean()
  isActive: boolean;

  @IsString()
  name: string;
}

export class Publication {
  @IsDateString()
  createdAt: Date;

  @MinLength(5)
  @MaxLength(100)
  @IsString()
  description: string;

  @IsUrl()
  link: string;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  title: string;
}

export class SideProject {
  @MinLength(5)
  @MaxLength(100)
  @IsString()
  description: string;

  @IsUrl()
  link: string;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  title: string;
}

export class SocialLink {
  @IsUrl()
  link: string;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  linkType: string;
}
