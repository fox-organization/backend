import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { IService } from './service.interface';
import { CreateServiceDto, UpdateServiceDto } from './dto';

@Injectable()
export class ServicesService {
  private services: IService[] = [];

  public create(createServiceDto: CreateServiceDto): IService {
    const service: IService = {
      id: randomUUID(),
      title: createServiceDto.title,
      description: createServiceDto.description,
      price: createServiceDto.price,
    };

    this.services.push(service);

    return service;
  }

  public findAll(): IService[] {
    return this.services;
  }

  public findOne(id: string): IService {
    const service = this.services.find((s) => s.id === id);

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  public update(id: string, updateServiceDto: UpdateServiceDto): IService {
    const service = this.findOne(id);
    service.title = updateServiceDto.title;
    service.description = updateServiceDto.description;
    service.price = updateServiceDto.price;
    return service;
  }

  public remove(id: string): void {
    this.services = this.services.filter((s) => s.id !== id);
  }
}
