import { IsISO8601, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @MinLength(1)
  trackingCode: string;

  @IsString()
  @MinLength(1)
  recipientName: string;

  @IsString()
  @MinLength(1)
  originAddress: string;

  @IsString()
  @MinLength(1)
  destinationAddress: string;

  @IsOptional()
  @IsISO8601()
  estimatedDeliveryAt?: string;
}
