import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { InvoiceSchema } from './schemas/invoice.schema';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { FeeItemSchema } from 'src/feeitem/schemas/feeitem.schema';
import { ClassSchema } from 'src/class/schemas/class.schema';
import { BranchModule } from 'src/branch/branch.module';
import { BranchSchema } from 'src/branch/schemas/branch.schema';

@Module({
    imports: [
        BranchModule,
        MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
        MongooseModule.forFeature([
        {name: 'invoice', schema: InvoiceSchema},
        {name: 'feeitem', schema: FeeItemSchema}
    ])],
    controllers: [InvoiceController],
    providers: [InvoiceService],
    exports: [InvoiceService],
})
export class InvoiceModule {}
