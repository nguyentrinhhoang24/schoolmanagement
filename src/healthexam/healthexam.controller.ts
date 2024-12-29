import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { HealthExamService } from "./healthexam.service";
import { HealthExam } from "./schemas/healthexam.schema";
import { CreateHealthExamDto } from "./dto/createhealthexam.dto";
import { UpdateHealthExamDto } from "./dto/updatehealthexam.dto";

@Controller('healthexam')
export class HealthExamController {
    constructor(private readonly healthexamService: HealthExamService) {}

    @Get()
    async getAllHealthExam(): Promise<HealthExam[]> {
        return this.healthexamService.findAll();
    }

    @Post()
    async createHealthExam(@Body() createHealthExamDto: CreateHealthExamDto): Promise<HealthExam> {
        return this.healthexamService.create(createHealthExamDto);
    }

    @Get(':id')
    async getHealthExam(@Param('id') id: string,): Promise<HealthExam> {
        return this.healthexamService.findById(id);
    }

    @Put()
    async updateHealthExam(@Param('id') id: string, @Body() updateHealthExamDto: UpdateHealthExamDto): Promise<HealthExam> {
        return this.healthexamService.updateById(id, updateHealthExamDto);
    }

    @Delete()
    async deleteHealthExam(@Param('id') id: string): Promise<HealthExam> {
        return this.healthexamService.deleteById(id);
    }
}