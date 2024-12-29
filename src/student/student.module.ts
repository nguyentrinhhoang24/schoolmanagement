import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./schemas/student.schema";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { CacheModule } from "@nestjs/cache-manager";
import { BranchModule } from "src/branch/branch.module";
import { ClassModule } from "src/class/class.module";
import { BranchSchema } from "src/branch/schemas/branch.schema";
import { ClassSchema } from "src/class/schemas/class.schema";

@Module({
    imports: [
        BranchModule,
        ClassModule,
        MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
        MongooseModule.forFeature([{name: 'class', schema: ClassSchema}]),
        MongooseModule.forFeature([{name: 'student', schema: StudentSchema}]),
        CacheModule.register({
            ttl: 60,
            max: 100,
          }),
    ],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService],
})

export class StudentModule {}