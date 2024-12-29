import { Controller, Put, Param, Body, Post, Delete, Get, UseGuards, Req } from '@nestjs/common';
import { SchoolService } from './school.service';
import { UpdateSchoolDto } from 'src/school/dto/updateschool.dto';
import { CreateSchoolDto } from 'src/school/dto/createschool.dto';
import { School } from './schemas/school.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Get()
  // @Roles(Role.Superadmin)
  // @UseGuards(AuthGuard(), RolesGuard)
  async getAllSchool(): Promise<School[]> {
    return this.schoolService.findAll();
  }

  @Post()
  @Roles(Role.Superadmin)
  @UseGuards(AuthGuard(), RolesGuard)
  async createSchool(@Body() createSchoolDto: CreateSchoolDto, @Req() req,): Promise<School> {
    return this.schoolService.create(createSchoolDto, req.user);
  }

  @Get(':id')
  @Roles(Role.Schooladmin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getSchool(@Param('id') id: string,): Promise<School> {
    return this.schoolService.findById(id);
  }
  
  @Put(':id')
  @Roles(Role.Schooladmin)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateSchool(@Param('id') id: string, @Body() school: UpdateSchoolDto, @Req() req, ): Promise<School> {
    return this.schoolService.updateById(id, school, req.user);
  }

  // @Roles(Role.Superadmin)
  // @UseGuards(AuthGuard(), RolesGuard)
  @Delete(':id')
  async deleteSchool(@Param('id') id: string,): Promise<School> {
    return this.schoolService.deleteSchool(id);
  }
}