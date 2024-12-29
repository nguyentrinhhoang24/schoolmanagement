import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './schemas/album.schema';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { ClassModule } from 'src/class/class.module';
import { BranchModule } from 'src/branch/branch.module';
import { BranchSchema } from 'src/branch/schemas/branch.schema';
import { ClassSchema } from 'src/class/schemas/class.schema';

@Module({
    imports: [
        BranchModule,
        ClassModule,
        MongooseModule.forFeature([{name: 'class', schema: ClassSchema}]),
        MongooseModule.forFeature([{name: 'branch', schema: BranchSchema}]),
        MongooseModule.forFeature([{name: 'album', schema: AlbumSchema}]),
    ],
    controllers: [AlbumController],
    providers: [AlbumService],
    exports: [AlbumService],
})
export class AlbumModule {}
