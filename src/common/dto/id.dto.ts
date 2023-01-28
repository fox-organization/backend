import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID('4')
  @IsNotEmpty()
  public id!: string;
}
