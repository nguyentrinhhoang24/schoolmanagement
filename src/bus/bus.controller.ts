import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BusService } from './bus.service';
import { Bus } from './schemas/bus.schema';
import { CreateBusDto } from './dto/createbus.dto';
import { UpdateBusDto } from './dto/updatebus.dto';
import { time } from 'console';

@Controller('bus')
export class BusController {
    constructor(private readonly busService: BusService) {}

    @Get()
    async getAllBus(): Promise<Bus[]> {
        return this.busService.findAll();
    }

    @Post()
    async createBus(@Body() createBusDto: CreateBusDto): Promise<Bus> {
        return this.busService.create(createBusDto);
    }

    @Get(':id')
    async getBus(@Param('id') id: string):Promise<Bus> {
        return this.busService.findById(id);
    }

    @Put()
    async update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto): Promise<Bus> {
        return this.busService.updateById(id, updateBusDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Bus> {
        return this.busService.deleteById(id);
    }
}
