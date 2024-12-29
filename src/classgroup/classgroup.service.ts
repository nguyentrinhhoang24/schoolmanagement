import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassGroup } from './schemas/classgroup.schema';
import { UpdateClassGroupDto } from './dto/updateclassgroup.dto';
import { CreateClassGroupDto } from './dto/createclassgroup.dto';
import { Branch } from 'src/branch/schemas/branch.schema';
import { School } from 'src/school/schemas/school.schema';
import { User } from 'src/auth/schemas/user.schema';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class ClassGroupService {
  constructor(
    @InjectModel('ClassGroup') private classGroupModel: Model<ClassGroup>,
    @InjectModel('Branch') private branchModel: Model<Branch>,
  ) {}

  async findAll(): Promise<ClassGroup[]> {
    const classgroups = await this.classGroupModel.find();
    return classgroups;
  }

  async create(classGroup: CreateClassGroupDto, user: User): Promise<ClassGroup> {
    if (!user.role.includes(Role.Schooladmin)) {
      throw new NotFoundException('You do not have permission to create classGroup.');
    }
    const branch = await this.branchModel.findById(classGroup.branch_id);
    if(!branch) {
      throw new NotFoundException('Branch not found.');
    }

    classGroup.school_id = branch.school_id;

    const newClassGroup = await this.classGroupModel.create(classGroup);
    await this.branchModel.updateOne(
      { _id: branch._id },
      { $push: { classgroup_id: newClassGroup._id } }
    )
    return newClassGroup;
  }

  async findByBranchId(branch_id: string): Promise<ClassGroup[]> {
    const classGroups = await this.classGroupModel.find({ branch_id: branch_id });
    return classGroups;
  }

  async findById(id: string): Promise<ClassGroup> {
    const ClassGroup = await this.classGroupModel.findById(id);
    if (!ClassGroup) {
      throw new NotFoundException('ClassGroup not found.');
    }
    return ClassGroup;
  }

  async updateById(id: string, classGroup: UpdateClassGroupDto): Promise<ClassGroup> {
    return await this.classGroupModel.findByIdAndUpdate(id, classGroup, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<ClassGroup> {
    const classGroup = await this.classGroupModel.findById(id);
    if (!classGroup) {
      throw new NotFoundException('ClassGroup not found.');
    }
    await this.branchModel.findByIdAndUpdate(
      classGroup.branch_id,
      { $pull: { classgroup_id: id } },
      { new: true }
    ) 
    return await this.classGroupModel.findByIdAndDelete(id);
  }
}