import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './schemas/news.schema';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { BranchModule } from 'src/branch/branch.module';
import { BranchSchema } from 'src/branch/schemas/branch.schema';

@Module({
    imports:[
        BranchModule,
        MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
        MongooseModule.forFeature([{name: 'news', schema: NewsSchema}]),
    ],
    controllers: [NewsController],
    providers: [NewsService],
    exports: [NewsService],
})
export class NewsModule {}
