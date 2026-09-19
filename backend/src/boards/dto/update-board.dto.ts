import { IsString, MinLength } from 'class-validator';

export class UpdateBoardDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  content!: string;
}
