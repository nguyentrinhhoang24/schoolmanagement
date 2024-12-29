import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassGroupController } from "./classgroup.controller";
import { ClassGroupService } from "./classgroup.service";
import { ClassGroupSchema } from "./schemas/classgroup.schema";
import { BranchModule } from "src/branch/branch.module";
import { BranchSchema } from "src/branch/schemas/branch.schema";

@Module({
    imports: [
      BranchModule,
      MongooseModule.forFeature([{name: 'ClassGroup', schema: ClassGroupSchema}]),
      MongooseModule.forFeature([{name: 'Branch', schema: BranchSchema}]),
    ],
    controllers: [ClassGroupController],
    providers: [ClassGroupService],
    exports: [ClassGroupService],
  })
  export class ClassGroupModule {}