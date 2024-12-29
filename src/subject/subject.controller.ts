import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { Subject } from "./schemas/subject.schema";
import { CreateSubjectDto } from "./dto/createsubject.dto";
import { UpdateSubjectDto } from "./dto/updatesubject.dto";

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Get()
    async getAllSubject(): Promise<Subject[]> {
        return this.subjectService.findAll();
    }

    @Post()
    async createSubject(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
        return this.subjectService.create(createSubjectDto);
    }

    @Get(':id')
    async getSubject(@Param('id') id: string,): Promise<Subject> {
        return this.subjectService.findById(id);
    }

    @Put(':id')
    async updateSubject(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
        return this.subjectService.updateById(id, updateSubjectDto);
    }

    @Delete(':id')
    async deleteSubject(@Param('id') id: string,): Promise<Subject> {
        return this.subjectService.deleteById(id);
    }
}