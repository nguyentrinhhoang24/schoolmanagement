import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './schemas/class.schema';
import { UpdateClassDto } from './dto/updateclass.dto';
import { CreateClassDto } from './dto/createclass.dto';
import { User } from 'src/auth/schemas/user.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Branch } from 'src/branch/schemas/branch.schema';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel('Class') private classModel: Model<Class>,
    @InjectModel('Branch') private branchModel: Model<Branch>,
  ) {}

  async findAll(): Promise<Class[]> {
    const classs = await this.classModel.find();
    return classs;
  }

  async create(createClassDto: CreateClassDto, user: User): Promise<Class> {
    if (!user.role.includes(Role.Schooladmin)) {
      throw new NotFoundException('You do not have permission to create class.');
    }

    const branch = await this.branchModel.findById(createClassDto.branch_id);
    if (!branch) {
      throw new NotFoundException('branch not found.');
    }

    createClassDto.school_id = branch.school_id;

    const newClass = await this.classModel.create(createClassDto);
    await this.branchModel.updateOne(
      { _id: branch._id },
      { $push: { class_id: newClass._id } }
    )
    return newClass;
  }

  async findById(id: string): Promise<Class> {
    const Class = await this.classModel.findById(id);
    if (!Class) {
      throw new NotFoundException('Class not found.');
    }
    return Class;
  }

  async updateById(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    return await this.classModel.findByIdAndUpdate(id, updateClassDto, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Class> {
    return await this.classModel.findByIdAndDelete(id);
  }
}