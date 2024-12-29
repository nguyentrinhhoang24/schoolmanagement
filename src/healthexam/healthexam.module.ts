import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthExamSchema } from "./schemas/healthexam.schema";
import { HealthExamController } from "./healthexam.controller";
import { HealthExamService } from "./healthexam.service";
import { ClassModule } from "src/class/class.module";
import { ClassSchema } from "src/class/schemas/class.schema";
import { BranchModule } from "src/branch/branch.module";
import { BranchSchema } from "src/branch/schemas/branch.schema";

@Module({
    imports: [
        BranchModule,
        ClassModule,
        MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
        MongooseModule.forFeature([{name: 'class', schema: ClassSchema}]),
        MongooseModule.forFeature([{name: 'healthexam', schema: HealthExamSchema}])
    ],
    controllers: [HealthExamController],
    providers: [HealthExamService],
    exports: [HealthExamService],
})

export class HealthExamModule {}