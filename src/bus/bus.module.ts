import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusSchema } from './schemas/bus.schema';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';
import { BranchModule } from 'src/branch/branch.module';
import { BranchSchema } from 'src/branch/schemas/branch.schema';

@Module({
    imports: [
        BranchModule,
        MongooseModule.forFeature([{name: 'Branch', schema: BranchSchema}]),
        MongooseModule.forFeature([{name: 'bus', schema: BusSchema}]),
    ],
    controllers: [BusController],
    providers: [BusService],
    exports: [BusService],
})
export class BusModule {}
