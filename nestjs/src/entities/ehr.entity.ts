import { ApiProperty } from '@nestjs/swagger';

export class Proposals {
  @ApiProperty({ example: "Propuesta n° 1", description: 'proposal' })
  prop1: string;

  @ApiProperty({ example: "Propuesta n° 2", description: 'proposal' })
  prop2: string;

  @ApiProperty({ example: "Propuesta n° 3", description: 'proposal' })
  prop3: string;

  @ApiProperty({ example: "Propuesta n° 4", description: 'proposal' })
  prop4: string;

  @ApiProperty({ example: "Propuesta n° 5", description: 'proposal' })
  prop5: string;

  @ApiProperty({ example: "Propuesta n° 6", description: 'proposal' })
  prop6: string;
}