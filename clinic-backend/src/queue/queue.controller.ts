import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private svc: QueueService) {}

  @Get()
  list() {
    return this.svc.list();
  }

  @Post()
  async add(@Body() body: { patientId: number }) {
    return this.svc.add(body.patientId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.svc.updateStatus(Number(id), body.status);
  }
}
