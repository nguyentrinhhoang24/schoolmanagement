import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";
import { SessionSchema } from "src/session/schemas/session.schema";
import { BranchModule } from "src/branch/branch.module";
import { BranchSchema } from "src/branch/schemas/branch.schema";

@Module({
    imports: [
      BranchModule,
      MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
      MongooseModule.forFeature([{name: 'Session', schema: SessionSchema}]),
    ],
    controllers: [SessionController],
    providers: [SessionService],
    exports: [SessionService],
  })
  export class SessionModule {}