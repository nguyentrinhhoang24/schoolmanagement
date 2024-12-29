import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MenuSchema } from "./schemas/menu.schema";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { BranchModule } from "src/branch/branch.module";
import { BranchSchema } from "src/branch/schemas/branch.schema";

@Module({
    imports: [
        BranchModule,
        MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
        MongooseModule.forFeature([{name: 'menu', schema: MenuSchema}]),
    ],
    controllers: [MenuController],
    providers: [MenuService],
    exports: [MenuService],
})

export class MenuModule {}