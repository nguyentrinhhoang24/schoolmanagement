import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeeItemSchema } from './schemas/feeitem.schema';
import { FeeItemController } from './feeitem.controller';
import { FeeItemService } from './feeitem.service';
import { BranchModule } from 'src/branch/branch.module';
import { BranchSchema } from 'src/branch/schemas/branch.schema';

@Module({
    imports: [
        BranchModule,
        MongooseModule.forFeature([{name: 'feeitem', schema: FeeItemSchema}]),
        MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
    ],
    controllers: [FeeItemController],
    providers: [FeeItemService],
    exports: [FeeItemService],
})
export class FeeItemModule {}
