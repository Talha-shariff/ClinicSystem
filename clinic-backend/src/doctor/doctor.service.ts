import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private repo: Repository<Doctor>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(payload: Partial<Doctor>) {
    const d = this.repo.create(payload);
    return this.repo.save(d);
  }

  update(id: number, payload: Partial<Doctor>) {
    return this.repo.update(id, payload);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
