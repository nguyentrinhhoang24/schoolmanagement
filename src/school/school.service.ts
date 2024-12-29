import { BadRequestException, ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { School } from 'src/school/schemas/school.schema';
import { UpdateSchoolDto } from 'src/school/dto/updateschool.dto';
import { CreateSchoolDto } from './dto/createschool.dto';
import { User } from 'src/auth/schemas/user.schema';
import { Role } from 'src/auth/enums/role.enum';
import { Connection } from 'mongoose';
import { Branch } from 'src/branch/schemas/branch.schema';
import { BranchService } from 'src/branch/branch.service';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name) private schoolModel: mongoose.Model<School>,
    @InjectModel('branch') private branchModel: mongoose.Model<Branch>,
    @Inject(forwardRef(() => BranchService)) private readonly branchService: BranchService,
    @InjectConnection() private readonly connection: Connection
  ) {}

  async findAll(): Promise<School[]> {
    const schools = await this.schoolModel.find();
    return schools;
  }

  async create(createSchoolDto: CreateSchoolDto, user: User): Promise<School> {
    if(user.role.includes(Role.Superadmin)) {
      const newSchool = await this.schoolModel.create(createSchoolDto);
      return newSchool;
    } else {
      throw new ForbiddenException('dont have permission to create school :))')
    }
  }

  async findById(id: string): Promise<School> {
    const school = await this.schoolModel.findById(id);
    if (!school) {
      throw new NotFoundException('School not found.');
    }
    return school;
  }

  async updateById(id: string, school: UpdateSchoolDto, user: User): Promise<School> {
    // Kiểm tra nếu người dùng có vai trò là Schooladmin và đảm bảo họ chỉ được cập nhật trường của mình
    if (user.role.includes(Role.Schooladmin)) {
      console.log(typeof id);
      console.log(typeof user.school_id);
      if (user.school_id != id) {
        throw new ForbiddenException('can not update this school :))');
      }
      else {
        const updatedSchool = await this.schoolModel.findByIdAndUpdate(id, school, {
          new: true,
          runValidators: true,
      });
  
      if (!updatedSchool) {
          throw new NotFoundException('School not found :)))');
      }
      return updatedSchool;
      }
    } else {
      throw new ForbiddenException('dont have permission to update :))')
    }
}

  // async deleteById(id: string): Promise<School> {
  //   return await this.schoolModel.findByIdAndDelete(id);
  // }

  async deleteSchool(id: string): Promise<School> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      // Tìm và lưu lại thông tin trường học trước khi xóa
      const school = await this.schoolModel.findById(id);
      if (!school) {
        throw new NotFoundException('School not found.');
      }
      await this.branchService.deleteBySchoolId(id);
      await this.schoolModel.findByIdAndDelete(id).session(session);
  
      await session.commitTransaction();
  
      return school;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Failed to delete school and related branches: ' + error.message);
    } finally {
      session.endSession();
    }
  }
  
}