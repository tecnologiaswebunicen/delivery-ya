import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../../src/app.module.js';
import { DeliveryStatus } from './../../src/deliveries/delivery.entity.js';

describe('DeliveriesController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/deliveries (POST) creates a delivery with pending status', async () => {
    const response = await request(app.getHttpServer())
      .post('/deliveries')
      .send({
        trackingCode: `TRK-${Date.now()}`,
        recipientName: 'John Doe',
        originAddress: '123 Origin St',
        destinationAddress: '456 Destination Ave',
      })
      .expect(201);

    expect(response.body).toMatchObject({
      status: DeliveryStatus.PENDING,
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
