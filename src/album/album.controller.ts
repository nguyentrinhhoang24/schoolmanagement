import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './schemas/album.schema';
import { CreateAlbumDto } from './dto/createalbum.dto';
import { UpdateAlbumDto } from './dto/updatealbum.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    async getAllAlbum(): Promise<Album[]> {
        return this.albumService.findAll();
    }

    @Post()
    @UseInterceptors(
        FilesInterceptor('images', 10, {
        storage: diskStorage({
            destination: './uploads', // Nơi lưu ảnh
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
    }),)
    async createAlbum(@Body() createAlbumDto: CreateAlbumDto, @UploadedFiles() files: Array<Express.Multer.File>): Promise<Album> {
        const imageUrls = files.map(file => `http://localhost:5000/uploads/${file.filename}`);
        return this.albumService.create(createAlbumDto, imageUrls);
    }

    @Get(':id')
    async getAlbum(@Param('id') id: string): Promise<Album> {
        return this.albumService.findById(id);
    }

    @Put(':id')
    async updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        return this.albumService.updateById(id, updateAlbumDto);
    }

    @Delete(':id')
    async deleteALbum(@Param('id') id: string): Promise<Album> {
        return this.albumService.deleteById(id);
    }

    @Patch(':id/add-images')
    @UseInterceptors(
        FilesInterceptor('images', 10, {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
        }),
    )
    async addImagesToAlbum(
        @Param('id') albumId: string,
        @UploadedFiles() files: Array<Express.Multer.File>,
    ) {
        if (!files || files.length === 0) {
        throw new BadRequestException('No files uploaded');
        }

        const imageUrls = files.map((file) => `http://localhost:5000/uploads/${file.filename}`);
        return this.albumService.addImagesToAlbum(albumId, imageUrls);
    }

}
