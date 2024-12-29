import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { Menu } from "./schemas/menu.schema";
import { CreateMenuDto } from "./dto/createmenu.dto";
import { UpdateMenuDto } from "./dto/updatemenu.dto";

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}
    
    @Get()
    async getAllMenu(): Promise<Menu[]> {
        return this.menuService.findAll();
    }

    @Post()
    async createMenu(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
        return this.menuService.create(createMenuDto);
    }

    @Get(':id')
    async getMenu(@Param('id') id: string,): Promise<Menu> {
        return this.menuService.findById(id);
    }

    @Put(':id')
    async updateMenu(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto): Promise<Menu> {
        return this.menuService.updateById(id, updateMenuDto);
    }

    @Delete(':id')
    async deleteMenu(@Param('id') id: string,): Promise<Menu> {
        return this.menuService.deleteById(id);
    }
}