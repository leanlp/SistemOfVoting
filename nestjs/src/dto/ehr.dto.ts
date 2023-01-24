import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class Proposal {
  @ApiProperty({ example: 'Propuesta n° 1', description: 'proposal' })
  @IsString()
  readonly prop1: string;

  @ApiProperty({ example: "Propuesta n° 2", description: 'proposal' })
  @IsInt()
  readonly prop2: string;

  @ApiProperty({ example: "Propuesta n° 3", description: 'proposal' })
  @IsString()
  readonly prop3: string;

  @ApiProperty({ example: "Propuesta n° 4", description: 'proposal' })
  @IsInt()
  readonly prop4: string;

  @ApiProperty({ example: "Propuesta n° 5", description: 'proposal' })
  @IsInt()
  readonly prop5: string;

  @ApiProperty({ example: "Propuesta n° 6", description: 'proposal' })
  @IsInt()
  readonly prop6: string;
}