import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service.js';
import { CreateDeliveryDto } from './dto/create-delivery.dto.js';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto.js';
import { Delivery } from './delivery.entity.js';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get()
  findAll(): Promise<Delivery[]> {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Delivery> {
    return this.deliveriesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDeliveryDto): Promise<Delivery> {
    return this.deliveriesService.create(dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateDeliveryStatusDto,
  ): Promise<Delivery> {
    return this.deliveriesService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.deliveriesService.remove(id);
  }
}
