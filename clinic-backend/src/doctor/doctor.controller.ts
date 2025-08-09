import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctors')
export class DoctorController {
  constructor(private svc: DoctorService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.svc.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.svc.delete(Number(id));
  }
}
