import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'Student'})
    readonly value: string;

    @ApiProperty({example: 'person who study'})
    readonly description: string;
  }