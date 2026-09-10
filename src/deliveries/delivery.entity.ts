import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DeliveryStatus {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  trackingCode: string;

  @Column()
  recipientName: string;

  @Column()
  originAddress: string;

  @Column()
  destinationAddress: string;

  @Column({ type: 'enum', enum: DeliveryStatus})
  status: DeliveryStatus;

  @Column({ type: 'timestamptz', nullable: true })
  estimatedDeliveryAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
