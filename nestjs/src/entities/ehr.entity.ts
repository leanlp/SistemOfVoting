import { ApiProperty } from '@nestjs/swagger';

export class EHR {
  @ApiProperty({ example: 'jeje', description: 'prop1' })
  prop1: string;

  @ApiProperty({ example: "jaja", description: 'prop1' })
  prop2: string;

  @ApiProperty({ example: 70, description: 'prop1' })
  prop3: string;

  @ApiProperty({ example: 150, description: 'prop1' })
  prop4: string;

  @ApiProperty({ example: 75, description: 'prop1' })
  prop5: string;

  @ApiProperty({example: '120/80', description: "prop1"})
  prop6: string;
}