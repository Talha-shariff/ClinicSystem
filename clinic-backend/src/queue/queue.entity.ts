import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, { eager: true })
  @JoinColumn()
  patient: Patient;

  @Column()
  queueNumber: number;

  @Column()
  status: string;

  @Column({ default: false })
  priority: boolean;
}
