import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album } from './schemas/album.schema';
import { CreateAlbumDto } from './dto/createalbum.dto';
import { UpdateAlbumDto } from './dto/updatealbum.dto';
import { Branch } from 'src/branch/schemas/branch.schema';
import { Class } from 'src/class/schemas/class.schema';

@Injectable()
export class AlbumService {
    constructor(
        @InjectModel('album') private albumModel: Model<Album>,
        @InjectModel('branch') private branchModel: Model<Branch>,
        @InjectModel('class') private classModel: Model<Class>,
    ) {}

    async findAll(): Promise<Album[]> {
        const albums = await this.albumModel.find();
        return albums;
    }

    async create(createAlbumDto: CreateAlbumDto, imageUrls: string[]): Promise<Album> {
        const branch = await this.branchModel.findById(createAlbumDto.branch_id);
        const Class = await this.classModel.findById(createAlbumDto.class_id);
        if(!branch) {
            throw new NotFoundException('Branch not found.');
        } else if(!Class) {
            throw new NotFoundException('Class not found.');
        }
        const newAlbum = await this.albumModel.create({...createAlbumDto, images: imageUrls});
        await Promise.all([
            this.branchModel.updateOne(
                { _id: branch._id },
                { $push: { album_id: newAlbum._id } }
            ),
            this.classModel.updateOne(
                { _id: Class._id },
                { $push: { album_id: newAlbum._id } }
            ),
        ]);
        return newAlbum;
    }

    async findById(id: string): Promise<Album> {
        const album = await this.albumModel.findById(id);
        if(!album) {
            throw new NotFoundException('album not found!')
        }
        return album;
    }

    async updateById(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        return await this.albumModel.findByIdAndUpdate(id, updateAlbumDto, {
            new: true,
            runValidators: true,
        });

    }

    async deleteById(id: string): Promise<Album> {
        return await this.albumModel.findByIdAndDelete(id);
    }

    async addImagesToAlbum(albumId: string, imageUrls: string[]): Promise<Album> {
        const album = await this.albumModel.findById(albumId);
        if (!album) {
          throw new NotFoundException('Album not found');
        }
    
        album.images.push(...imageUrls);
        return album.save();
      }
}
