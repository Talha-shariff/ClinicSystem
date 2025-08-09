import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService {
  constructor(@InjectRepository(Patient) private repo: Repository<Patient>) {}

  create(payload: Partial<Patient>) {
    const p = this.repo.create(payload);
    return this.repo.save(p);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findAll() {
    return this.repo.find();
  }
}
