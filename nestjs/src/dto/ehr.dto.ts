import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateEHRDto {
  @ApiProperty({ example: 'jeje', description: 'prop1' })
  @IsString()
  readonly prop1: string;

  @ApiProperty({ example: "jaja", description: 'prop1' })
  @IsInt()
  readonly prop2: string;

  @ApiProperty({ example: "jaja", description: 'prop1' })
  @IsString()
  readonly prop3: string;

  @ApiProperty({ example: "jaja", description: 'prop1' })
  @IsInt()
  readonly prop4: string;

  @ApiProperty({ example: "jaja", description: 'prop1' })
  @IsInt()
  readonly prop5: string;

  @ApiProperty({ example: "jaja", description: 'prop1' })
  @IsInt()
  readonly prop6: string;
}