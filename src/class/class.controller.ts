import { Controller, Post, Put, Param, Body, Delete, Get, UseGuards, Req } from '@nestjs/common';
import { ClassService } from './class.service';
import { UpdateClassDto } from './dto/updateclass.dto';
import { CreateClassDto } from './dto/createclass.dto';
import { Class } from './schemas/class.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  async getAllClass(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Post()
  @Roles(Role.Schooladmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createClass(@Body() createClassDto: CreateClassDto, @Req() req): Promise<Class> {
    return this.classService.create(createClassDto, req.user);
  }

  @Get(':id')
  async getClass(@Param('id') id: string,): Promise<Class> {
    return this.classService.findById(id);
  }
  
  @Put(':id')
  async updateClass(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto): Promise<Class> {
    return this.classService.updateById(id, updateClassDto);
  }

  @Delete(':id')
  async deleteClass(@Param('id') id: string,): Promise<Class> {
    return this.classService.deleteById(id);
  }
}