import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/createinvoice.dto';
import { UpdateInvoiceDto } from './dto/updateinvoice.dto';
import { FeeItem } from 'src/feeitem/schemas/feeitem.schema';
import { Branch } from 'src/branch/schemas/branch.schema';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectModel('invoice') private invoiceModel: Model<Invoice>,
        @InjectModel('feeitem') private feeitemModel: Model<FeeItem>,
        @InjectModel('branch') private branchModel: Model<Branch>,
    ) {}

    async findAll(): Promise<Invoice[]> {
        const invoices = await this.invoiceModel.find();
        return invoices;
    }
    
    async calculateTotal(feeItems: { fee_item: string; quantity: number }[]): Promise<number> {
        const feeItemIds = feeItems.map(item => item.fee_item);
      
        // Lấy thông tin các fee items từ database
        const feeItemsFromDb = await this.feeitemModel.find({ _id: { $in: feeItemIds } });
      
        // Tính tổng
        return feeItems.reduce((total, item) => {
          const feeItem = feeItemsFromDb.find(f => f._id.toString() === item.fee_item);
          if (feeItem) {
            return total += feeItem.price * item.quantity;
          }
          return total;
        }, 0);
      }

    async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
        const {school_id, branch_id, class_id, student_id, title, payment_deadline, payment_method, description, fee_items} = createInvoiceDto;

        const branch = await this.branchModel.findById(branch_id);
        if(!branch) {
            throw new NotFoundException('branch not found!');
        }

        createInvoiceDto.school_id = branch.school_id;

        // tính total
        const total = await this.calculateTotal(fee_items);

        const newInvoice = new this.invoiceModel({
            ...createInvoiceDto,
            total,
        });
        await this.branchModel.updateOne(
            { _id: branch._id },
            { $push: { invoice_id: newInvoice._id } }
        )

        return newInvoice.save();
    }

    async findById(id: string): Promise<Invoice> {
        const invoice = await this.invoiceModel.findById(id);
        if(!invoice) {
            throw new NotFoundException('invoice not found!');
        }
        return invoice;
    }

    async updateById(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
        // return await this.invoiceModel.findByIdAndUpdate(id, updateInvoiceDto, {
        //     new: true,
        //     runValidators: true,
        // });

        const {school_id, branch_id, class_id, student_id, title, payment_deadline, payment_method, description, fee_items} = updateInvoiceDto;

        let total = undefined;
        if (fee_items) {
            total = await this.calculateTotal(fee_items);
        }

        const updateInvoice = await this.invoiceModel.findByIdAndUpdate(
            id,
            {...updateInvoiceDto, ...(total !== undefined && {total})},
            {new: true, runValidators: true},
        );

        if(!updateInvoice) {
            throw new NotFoundException('invoice not found!!');
        }
        return updateInvoice;
    }

    async deleteById(id: string): Promise<Invoice> {
        return await this.invoiceModel.findByIdAndDelete(id);
    }
}
