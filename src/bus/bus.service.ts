import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bus } from './schemas/bus.schema';
import { CreateBusDto } from './dto/createbus.dto';
import { UpdateBusDto } from './dto/updatebus.dto';
import { Branch } from 'src/branch/schemas/branch.schema';

@Injectable()
export class BusService {
    constructor(
        @InjectModel('bus') private busModel:Model<Bus>,
        @InjectModel('Branch') private branchModel:Model<Branch>,   
    ){}

    async findAll(): Promise<Bus[]>{
        const allbus = await this.busModel.find();
        return allbus;
    }

    async create(createBusDto: CreateBusDto): Promise<Bus> {
        const branch = await this.branchModel.findById(createBusDto.branch_id);
        if(!branch){
            throw new NotFoundException('Branch not found!!');
        }
        const newBus = await this.busModel.create(createBusDto);
        await this.branchModel.updateOne(
            { _id: branch._id },
            { $push: { bus_id: newBus._id } }
        );
        return newBus;
    }

    async findById(id: string): Promise<Bus> {
        const bus = await this.busModel.findById(id);
        if(!bus){
            throw new NotFoundException('bus not found!!');
        }
        return bus;
    }

    async updateById(id: string, updateBusDto: UpdateBusDto): Promise<Bus> {
        return await this.busModel.findByIdAndUpdate(id, updateBusDto, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Bus> {
        return await this.busModel.findByIdAndDelete(id);
    }
}
