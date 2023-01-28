import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from '@common/dto';
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { ServicesService } from './services.service';
import { IService } from './service.interface';

@ApiTags('Services')
@Controller({ path: 'services', version: '1' })
export class ServicesController {
  public constructor(private readonly servicesService: ServicesService) {}

  @Post()
  public create(@Body() createServiceDto: CreateServiceDto): IService {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  public findAll(): IService[] {
    return this.servicesService.findAll();
  }

  @Get(':id')
  public findOne(@Param() { id }: IdDto): IService {
    return this.servicesService.findOne(id);
  }

  @Put(':id')
  public update(
    @Param() { id }: IdDto,
    @Body() updateServiceDto: UpdateServiceDto
  ): IService {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  public remove(@Param() { id }: IdDto): void {
    return this.servicesService.remove(id);
  }
}
