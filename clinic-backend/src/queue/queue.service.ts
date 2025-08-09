import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from './queue.entity';
import { Patient } from '../patient/patient.entity';

@Injectable()
export class QueueService {
  constructor(@InjectRepository(Queue) private repo: Repository<Queue>) {}

  async list() {
    return this.repo.find({ order: { queueNumber: 'ASC' } });
  }

  async add(patientId: number) {
    // create a queue number as max+1 or timestamp-based
    const last = await this.repo.createQueryBuilder('q').select('MAX(q.queueNumber)', 'max').getRawOne();
    const next = (last && last.max) ? Number(last.max) + 1 : 1;
    const q = this.repo.create({ patient: { id: patientId } as Patient, queueNumber: next, status: 'Waiting' });
    return this.repo.save(q);
  }

  async updateStatus(id: number, status: string) {
    await this.repo.update(id, { status });
    return this.repo.findOneBy({ id });
  }
}
