import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BranchController } from "./branch.controller";
import { BranchService } from "./branch.service";
import { BranchSchema } from "src/branch/schemas/branch.schema";
import { AuthModule } from "src/auth/auth.module";
import { SchoolModule } from "src/school/school.module";
import { SchoolSchema } from "src/school/schemas/school.schema";

@Module({
    imports: [
      AuthModule,
      forwardRef(() => SchoolModule),
      MongooseModule.forFeature([{name: 'school', schema: SchoolSchema}]),
      MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
    ],
    controllers: [BranchController],
    providers: [BranchService],
    exports: [BranchService, MongooseModule],
  })
  export class BranchModule {}