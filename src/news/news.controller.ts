import { Controller, Post, Put, Param, Body, Delete, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { UpdateNewsDto } from 'src/news/dto/updatenews.dto';
import { CreateNewsDto } from 'src/news/dto/createnews.dto';
import { News } from './schemas/news.schema';

@Controller('News')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getAllNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Post()
  async createNews(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.create(createNewsDto);
  }

  @Get(':id')
  async getNews(@Param('id') id: string,): Promise<News> {
    return this.newsService.findById(id);
  }
  
  @Put(':id')
  async updateNews(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto): Promise<News> {
    return this.newsService.updateById(id, updateNewsDto);
  }

  @Delete(':id')
  async deleteNews(@Param('id') id: string,): Promise<News> {
    return this.newsService.deleteById(id);
  }
}