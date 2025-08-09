import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
  constructor(private svc: PatientService) {}

  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.svc.findOne(Number(id));
  }

  @Get()
  getAll() {
    return this.svc.findAll();
  }
}
