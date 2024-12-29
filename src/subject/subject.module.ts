import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SubjectSchema } from "./schemas/subject.schema";
import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";
import { BranchModule } from "src/branch/branch.module";
import { BranchSchema } from "src/branch/schemas/branch.schema";

@Module({
    imports: [
        BranchModule,
        MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
        MongooseModule.forFeature([{name: 'subject', schema: SubjectSchema}])
    ],
    controllers: [SubjectController],
    providers: [SubjectService],
    exports: [SubjectService],
})

export class SubjectModule {}