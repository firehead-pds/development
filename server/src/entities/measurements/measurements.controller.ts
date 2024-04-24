import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMeasurementsDto } from "./dto/create-measurements.dto";
import { UpdateMeasurementsDto } from "./dto/update-measurements.dto";
import { Measurements } from "./measurements.entity";
import { MeasurementsService } from "./measurements.service";

@Controller("/measurements")
export class MeasurementsController {
  constructor(
    @InjectRepository(Measurements)
    private repository: Repository<Measurements>,
    private readonly service: MeasurementsService
  ) {
  }

  @Post()
  public async create(
    @Body() body: CreateMeasurementsDto
  ): Promise<Measurements> {
    return this.service.create(body);
  }

  @Get()
  public async findAll(): Promise<Measurements[]> {
    return this.service.findAll();
  }

  @Get(":id")
  public async findOne(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Measurements> {
    return this.service.findOne(id);
  }

  @Put(":id")
  public async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateMeasurementsDto
  ): Promise<Measurements> {
    return this.service.update(id, body);
  }

  @Delete(":id")
  public async delete(@Param("id", ParseIntPipe) id: number): Promise<string> {
    return this.service.delete(id);
  }
}
