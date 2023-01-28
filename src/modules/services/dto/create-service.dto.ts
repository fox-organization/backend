import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString, MinLength } from 'class-validator';
import { IService } from '../service.interface';

export class CreateServiceDto
  implements Pick<IService, 'title' | 'description' | 'price'>
{
  @ApiProperty()
  @IsString()
  @MinLength(3)
  public title!: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  public description!: string;

  @ApiProperty()
  @IsPositive()
  public price!: number;
}
