import { IsEnum } from 'class-validator';
import { DeliveryStatus } from '../delivery.entity.js';

export class UpdateDeliveryStatusDto {
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;
}
