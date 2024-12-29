import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Menu } from "./schemas/menu.schema";
import { CreateMenuDto } from "./dto/createmenu.dto";
import { UpdateMenuDto } from "./dto/updatemenu.dto";
import { Model } from "mongoose";
import { Branch } from "src/branch/schemas/branch.schema";

@Injectable()
export class MenuService {
    constructor(
        @InjectModel('menu') private menuModel: Model<Menu>,
        @InjectModel('branch') private branchModel: Model<Branch>,
    ) {}

    async findAll(): Promise<Menu[]> {
        const menu = await this.menuModel.find();
        return menu;
    }

    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        const branch = await this.menuModel.findById(createMenuDto.branch_id);
        if(!branch){
            throw new NotFoundException('Branch not found');
        }
        createMenuDto.school_id = branch.school_id;
        
        const newMenu = await this.menuModel.create(createMenuDto);
        await this.branchModel.updateOne(
            { _id: branch._id },
            { $push: { menu_id: newMenu._id } }
        )
        return newMenu;
    }

    async findById(id: string): Promise<Menu> {
        const menu = await this.menuModel.findById(id);
        if(!menu){
            throw new NotFoundException('menu not found');
        }
        return menu;
    }

    async updateById(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        return await this.menuModel.findByIdAndUpdate(id, updateMenuDto, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Menu> {
        return await this.menuModel.findByIdAndDelete(id);
    }
}