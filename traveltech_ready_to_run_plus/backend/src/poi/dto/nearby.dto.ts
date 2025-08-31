
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class NearbyDto {
  @IsNumber() lat: number;
  @IsNumber() lng: number;
  @IsOptional() @IsNumber() radius?: number; // meters
  @IsOptional() @IsString() prefs?: string; // csv categories
}
