import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class SendMessageDto {
  @ApiProperty()
  @IsEmail()
  userEmail: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  message: string;

}