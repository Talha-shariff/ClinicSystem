import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Doctor } from '../doctor/doctor.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, { eager: true })
  @JoinColumn()
  patient: Patient;

  @ManyToOne(() => Doctor, { eager: true })
  @JoinColumn()
  doctor: Doctor;

  @Column()
  timeSlot: string;

  @Column({ default: 'booked' })
  status: string;
}
