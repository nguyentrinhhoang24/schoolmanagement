import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Branch } from 'src/branch/schemas/branch.schema';
import { UpdateBranchDto } from 'src/branch/dto/updatebranch.dto';
import { CreateBranchDto } from 'src/branch/dto/createbranch.dto';
import { User } from 'src/auth/schemas/user.schema';
import { Role } from 'src/auth/enums/role.enum';
import { School } from 'src/school/schemas/school.schema';


@Injectable()
export class BranchService {
  constructor(
    @InjectModel('branch') private branchModel: Model<Branch>,
    @InjectModel('school') private schoolModel: Model<School>,
  ) {}

  async findAll(): Promise<Branch[]> {
    const branchs = await this.branchModel.find();
    return branchs;
  }

  async createBranch(createBranchDto: CreateBranchDto, user: User): Promise<Branch> {
    if (!user.role.includes(Role.Schooladmin)) {
      throw new ForbiddenException('dont have permission to create branch')
    }
    console.log('user:', user)
    createBranchDto.school_id = user.school_id;
    const newBranch = await this.branchModel.create(createBranchDto);
    await this.schoolModel.updateOne(
      { _id: user.school_id },
      { $push: { branch_id: newBranch._id } } 
    );
    
    return newBranch;
  }

  async findBySchoolid(user: User): Promise<Branch[]> {
    const school_id = user.school_id;
  
    if (!school_id) {
      throw new BadRequestException('School ID is missing');
    }
  
    const objectId = Types.ObjectId.isValid(school_id) ? new Types.ObjectId(school_id) : null;
    if (!objectId) {
      throw new BadRequestException('Invalid school ID format');
    }
  
    return await this.branchModel.find({ school_id: objectId });
  }

  async findById(id: string): Promise<Branch> {
    const branch = await this.branchModel.findById(id);
    if (!branch) {
      throw new NotFoundException('branch not found.');
    }
    return branch;
  }
  

  async updateById(id: string, branch: UpdateBranchDto): Promise<Branch> {
    return await this.branchModel.findByIdAndUpdate(id, branch, {
      new: true,
      runValidators: true,
    });
  }

  async deleteBySchoolId(school_id: string): Promise<Branch> {
    const branchs = await this.branchModel.find({school_id});
    if (!branchs || branchs.length === 0) {
      throw new NotFoundException('Branch not found.');
    }
    return await this.branchModel.findByIdAndDelete({school_id});
  }

  async deleteById(id: string): Promise<Branch> {
      const branch = await this.branchModel.findById(id);
      if (!branch) {
        throw new NotFoundException('Branch not found.');
      }
      await this.schoolModel.findByIdAndUpdate(
        branch.school_id,
        { $pull: { branch_id: id } },
        { new: true }
      ) 
      return await this.branchModel.findByIdAndDelete(id);
  }
}