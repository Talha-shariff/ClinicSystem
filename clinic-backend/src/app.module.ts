import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './user/user.entity';
import { Doctor } from './doctor/doctor.entity';
import { Patient } from './patient/patient.entity';
import { Queue } from './queue/queue.entity';
import { Appointment } from './appointment/appointment.entity';

import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { DoctorService } from './doctor/doctor.service';
import { DoctorController } from './doctor/doctor.controller';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { QueueController } from './queue/queue.controller';
import { QueueService } from './queue/queue.service';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentService } from './appointment/appointment.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'clinicdb',
      entities: [User, Doctor, Patient, Queue, Appointment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Doctor, Patient, Queue, Appointment]),
    AuthModule,
  ],
  controllers: [DoctorController, PatientController, QueueController, AppointmentController],
  providers: [UserService, DoctorService, PatientService, QueueService, AppointmentService],
})
export class AppModule {}
