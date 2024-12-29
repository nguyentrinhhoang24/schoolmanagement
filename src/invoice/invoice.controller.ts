import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/createinvoice.dto';
import { UpdateInvoiceDto } from './dto/updateinvoice.dto';

@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}
  
    @Get()
    async getAllInvoice(): Promise<Invoice[]> {
      return this.invoiceService.findAll();
    }
  
    @Post()
    async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
      return this.invoiceService.create(createInvoiceDto);
    }
  
    @Get(':id')
    async getInvoice(@Param('id') id: string,): Promise<Invoice> {
      return this.invoiceService.findById(id);
    }
    
    @Put(':id')
    async updateInvoice(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
      return this.invoiceService.updateById(id, updateInvoiceDto);
    }
  
    @Delete(':id')
    async deleteInvoice(@Param('id') id: string,): Promise<Invoice> {
      return this.invoiceService.deleteById(id);
    }
}
