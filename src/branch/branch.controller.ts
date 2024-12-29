import { Controller, Post, Put, Param, Body, Delete, Get, UseGuards, Req } from '@nestjs/common';
import { BranchService } from './branch.service';
import { UpdateBranchDto } from 'src/branch/dto/updatebranch.dto';
import { CreateBranchDto } from 'src/branch/dto/createbranch.dto';
import { Branch } from './schemas/branch.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Branch') 
@Controller('branch')
// @UseGuards(AuthGuard(), RolesGuard)
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  @Roles(Role.Schooladmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({summary: 'Get all branches'})
  async getAllBranch(): Promise<Branch[]> {
    return this.branchService.findAll();
  }

  @Post()
  @ApiOperation({summary: 'Create a branch'})
  @Roles(Role.Schooladmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createBranch(@Body() createBranchDto: CreateBranchDto, @Req() req): Promise<Branch> {
    return this.branchService.createBranch(createBranchDto, req.user);
  }
  
  @Roles(Role.Schooladmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('by-school')
  async getBranchBySchool( @Req() req): Promise<Branch[]> {
    console.log('User in request:', req.user);
    return this.branchService.findBySchoolid(req.user);
  }

  @Get(':id')
  @ApiOperation({summary: 'get a branch by id'})
  async getBranch(@Param('id') id: string,): Promise<Branch> {
    return this.branchService.findById(id);
  }
  
  @Put(':id')
  @ApiOperation({summary: 'update a branch by id'})
  async updateBranch(@Param('id') id: string, @Body() Branch: UpdateBranchDto): Promise<Branch> {
    return this.branchService.updateById(id, Branch);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete a branch by id'})
  async deleteBranch(@Param('id') id: string,): Promise<Branch> {
    return this.branchService.deleteById(id);
  }
}