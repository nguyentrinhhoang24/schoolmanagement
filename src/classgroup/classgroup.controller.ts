import { Controller, Post, Put, Param, Body, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { ClassGroupService } from './classgroup.service';
import { UpdateClassGroupDto } from './dto/updateclassgroup.dto';
import { CreateClassGroupDto } from './dto/createclassgroup.dto';
import { ClassGroup } from './schemas/classgroup.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('classgroup')
export class ClassGroupController {
  constructor(private readonly classGroupService: ClassGroupService) {}

  @Get()
  async getAllClassGroup(): Promise<ClassGroup[]> {
    return this.classGroupService.findAll();
  }

  @Post()
  @Roles(Role.Schooladmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createClassGroup(@Body() classGroup: CreateClassGroupDto, @Req() req): Promise<ClassGroup> {
    return this.classGroupService.create(classGroup, req.user);
  }

  @Get('by-branch/:branch_id')
  async getClassGroupByBranchId(@Param('branch_id') branch_id: string): Promise<ClassGroup[]> {
    return this.classGroupService.findByBranchId(branch_id);
  }

  @Get(':id')
  async getClassGroup(@Param('id') id: string,): Promise<ClassGroup> {
    return this.classGroupService.findById(id);
  }
  
  @Put(':id')
  async updateClassGroup(@Param('id') id: string, @Body() classGroup: UpdateClassGroupDto): Promise<ClassGroup> {
    return this.classGroupService.updateById(id, classGroup);
  }

  @Delete(':id')
  async deleteClassGroup(@Param('id') id: string,): Promise<ClassGroup> {
    return this.classGroupService.deleteById(id);
  }
}