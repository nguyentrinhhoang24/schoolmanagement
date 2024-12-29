import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HealthExam } from "./schemas/healthexam.schema";
import { CreateHealthExamDto } from "./dto/createhealthexam.dto";
import { UpdateHealthExamDto } from "./dto/updatehealthexam.dto";
import { Branch } from "src/branch/schemas/branch.schema";
import { Class } from "src/class/schemas/class.schema";

@Injectable()
export class HealthExamService {
    constructor(
        @InjectModel('healthexam') private healthexamModel: Model<HealthExam>,
        @InjectModel('branch') private branchModel: Model<Branch>,
        @InjectModel('class') private classModel: Model<Class>,
    ) {}

    async findAll(): Promise<HealthExam[]> {
        const healthexams = await this.healthexamModel.find();
        return healthexams;
    }

    async create(createHealthExamDto: CreateHealthExamDto): Promise<HealthExam> {
        const branch = await this.branchModel.findById(createHealthExamDto.branch_id);
        const Class = await this.classModel.findById(createHealthExamDto.class_id);
        if (!branch) {
            throw new NotFoundException('Branch not found.');
        } else if (!Class) {
            throw new NotFoundException('Class not found!');
        }
        const newHealthExam = await this.healthexamModel.create(createHealthExamDto);
        await Promise.all([
            this.branchModel.updateOne(
                {_id: branch._id},
                {$push: {healthexam_id: newHealthExam._id}},
            ),
            this.classModel.updateOne(
                {_id: Class._id},
                {$push: {healthexam_id: newHealthExam._id}},
            ),
        ]);
        return newHealthExam;
    }

    async findById(id: string): Promise<HealthExam> {
        const healthExam = await this.healthexamModel.findById(id);
        if(!healthExam) {
            throw new NotFoundException('health exam schedule not found')
        }
        return healthExam; 
    }

    async updateById(id: string, updateHealthExamDto: UpdateHealthExamDto): Promise<HealthExam> {
        return await this.healthexamModel.findByIdAndUpdate(id, updateHealthExamDto, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<HealthExam> {
        return await this.healthexamModel.findByIdAndDelete(id);
    }
}