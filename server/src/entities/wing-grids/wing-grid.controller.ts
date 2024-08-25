import {Body, Controller, Get, Logger, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {ApiCreatedResponse} from "@nestjs/swagger";
import {CreateWingGridDto} from "./dto/create-wing-grid.dto";
import {WingGridService} from "./wing-grid.service";
import {UpdateWingGridDto} from "./dto/update-wing-grid.dto";
import {RolesGuard} from "../../auth/guards/roles.guard";
import {AllowedRole} from "../../auth/decorators/allowed-role.decorator";
import {Role} from "../wings/enums/participate-role";

@Controller("wing-grids")
export class WingGridController {
    constructor(private readonly wingGridService: WingGridService) {
    }

    @ApiCreatedResponse({description: "Wing Grid created successfully"})
    @UseGuards(RolesGuard)
    @Post()
    public async create(@Body() body: CreateWingGridDto) {
        return await this.wingGridService.create(body);
    }

    @Get(":id")
    public async getWingGrid(@Param("id") id: number) {
        return this.wingGridService.getWingGrid(id);
    }

    @Patch()
    @AllowedRole(Role.Harmony)
    @UseGuards(RolesGuard)
    public async updateWingGrid(@Body() body: UpdateWingGridDto) {
        return this.wingGridService.updateWingGrid(body.wingGridId, body.cells);
    }
}
