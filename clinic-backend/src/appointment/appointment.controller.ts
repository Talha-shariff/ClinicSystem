import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private svc: AppointmentService) {}

  @Get()
  all() {
    return this.svc.findAll();
  }

  @Post()
  create(@Body() body: { patientName: string; doctorId: number; timeSlot: string }) {
    return this.svc.create(body.patientName, body.doctorId, body.timeSlot);
  }

  @Delete(':id')
  cancel(@Param('id') id: string) {
    return this.svc.cancel(Number(id));
  }
}
