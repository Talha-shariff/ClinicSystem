import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Patient } from '../patient/patient.entity';
import { Doctor } from '../doctor/doctor.entity';

@Injectable()
export class AppointmentService {
  constructor(@InjectRepository(Appointment) private repo: Repository<Appointment>) {}

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async create(patientName: string, doctorId: number, timeSlot: string) {
    // create or find patient by name (simple logic)
    const patient = { name: patientName } as Patient;
    const doctor = { id: doctorId } as Doctor;
    const a = this.repo.create({ patient, doctor, timeSlot, status: 'booked' });
    return this.repo.save(a);
  }

  async cancel(id: number) {
    await this.repo.update(id, { status: 'canceled' });
    return this.repo.findOneBy({ id });
  }
}
