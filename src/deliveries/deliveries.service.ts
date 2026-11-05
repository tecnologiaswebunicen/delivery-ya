import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery, DeliveryStatus } from './delivery.entity.js';
import { CreateDeliveryDto } from './dto/create-delivery.dto.js';

@Injectable()
export class DeliveriesService {

  private readonly logger = new Logger(DeliveriesService.name);
  
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveriesRepository: Repository<Delivery>,
  ) {}

  findAll(): Promise<Delivery[]> {
    return this.deliveriesRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Delivery> {
    const delivery = await this.deliveriesRepository.findOneBy({ id });
    if (!delivery) {
      this.logger.warn('Tried to find Delivery ${id}');
      throw new NotFoundException(`Delivery ${id} not found`);
    }
    return delivery;
  }

  create(dto: CreateDeliveryDto): Promise<Delivery> {
    const delivery = this.deliveriesRepository.create({
      ...dto,
      status: DeliveryStatus.PENDING,
      estimatedDeliveryAt: dto.estimatedDeliveryAt ? new Date(dto.estimatedDeliveryAt) : null,
    });
    return this.deliveriesRepository.save(delivery);
  }

  async updateStatus(id: string, status: DeliveryStatus): Promise<Delivery> {
    const delivery = await this.findOne(id);
    delivery.status = status;
    return this.deliveriesRepository.save(delivery);
  }

  async remove(id: string): Promise<void> {
    const result = await this.deliveriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Delivery ${id} not found`);
    }
  }
}
