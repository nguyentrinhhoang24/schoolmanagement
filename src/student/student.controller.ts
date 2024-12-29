import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { StudentService } from "./student.service";
import { Student } from "./schemas/student.schema";
import { CreateStudentDto } from "./dto/createstudent.dto";
import { UpdateStudentDto } from "./dto/updatestudent.dto";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Controller('student')
export class StudentController {
    constructor(
      @Inject(CACHE_MANAGER) private cacheManager: Cache, 
      private readonly studentService: StudentService,
    ) {}
  
    @Get()
    async getAllStudent(): Promise<Student[]> {
      return this.studentService.findAll();
    }

    @Get('school/:id')
    async getBySchoolId(@Param('id') id: string): Promise<Student[]> {
      return this.studentService.findBySchoolId(id);
    }

    @Get('cache/set-cache')
    async demoSetCache() {
      await this.cacheManager.set('newnet', 'hello world');
      return true;
    }

    @Get('cache/get-cache') 
    async demoGetCache() {
      return this.cacheManager.get('newnet');
      
    }
  
    @Post()
    async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
      return this.studentService.create(createStudentDto);
    }
  
    @Get(':id')
    async getStudent(@Param('id') id: string,): Promise<Student> {
      return this.studentService.findById(id);
    }
    
    @Put(':id')
    async updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
      return this.studentService.updateById(id, updateStudentDto);
    }
  
    @Delete(':id')
    async deleteStudent(@Param('id') id: string,): Promise<Student> {
      return this.studentService.deleteById(id);
    }
  }
  