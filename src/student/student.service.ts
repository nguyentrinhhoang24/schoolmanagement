import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from "./schemas/student.schema";
import { CreateStudentDto } from "./dto/createstudent.dto";
import { UpdateStudentDto } from "./dto/updatestudent.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Branch } from "src/branch/schemas/branch.schema";
import { Class } from "src/class/schemas/class.schema";

@Injectable()
export class StudentService {
    constructor(
      @InjectModel('student') private studentModel: Model<Student>,
      @InjectModel('branch') private branchModel: Model<Branch>,
      @InjectModel('class') private classModel: Model<Class>,
      // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

      async findAll(): Promise<Student[]> {
        const students = await this.studentModel.find();
        return students;
      }

      // sử dụng index
      async findBySchoolId(id: string): Promise<Student[]> {
        return this.studentModel.find({ school_id: id }).exec();
      }

      async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const branch = await this.branchModel.findById(createStudentDto.branch_id);
        const Class = await this.classModel.findById(createStudentDto.class_id);
        if (!branch) {
          throw new NotFoundException('Branch not found.');
        } else if (!Class) {
          throw new NotFoundException('Class not found.');
        }
        createStudentDto.school_id = branch.school_id;
        const newStudent = await this.studentModel.create(createStudentDto);
        await this.classModel.updateOne(
          { _id: Class._id },
          { $push: { student_id: newStudent._id } }
        )
        return newStudent;
      }
    
      async findById(id: string): Promise<Student> {
        const student = await this.studentModel.findById(id);
        if (!student) {
          throw new NotFoundException('Student not found.');
        }
        return student;
      }
    
      async updateById(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        return await this.studentModel.findByIdAndUpdate(id, updateStudentDto, {
          new: true,
          runValidators: true,
        });
      }
    
      async deleteById(id: string): Promise<Student> {
        return await this.studentModel.findByIdAndDelete(id);
      }
    
}