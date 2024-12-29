import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from 'src/session/schemas/session.schema';
import { UpdateSessionDto } from 'src/session/dto/updatesession.dto';
import { CreateSessionDto } from 'src/session/dto/createsession.dto';
import { Branch } from 'src/branch/schemas/branch.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('Session') private sessionModel: Model<Session>,
    @InjectModel('branch') private branchModel: Model<Branch>,
  ) {}

  async findAll(): Promise<Session[]> {
    const sessions = await this.sessionModel.find();
    return sessions;
  }

  async create(session: CreateSessionDto): Promise<Session> {
    const branch = await this.sessionModel.findById(session.branch_id);
    if (!branch) {
      throw new NotFoundException('Branch not found.');
    }
    session.school_id = branch.school_id;
    const newSession = await this.sessionModel.create(session);
    await this.branchModel.updateOne(
      { _id: branch._id },
      { $push: { session_id: newSession._id } }
    );
    return newSession;
  }

  async findById(id: string): Promise<Session> {
    const session = await this.sessionModel.findById(id);
    if (!session) {
      throw new NotFoundException('Session not found.');
    }
    return session;
  }

  async updateById(id: string, Session: UpdateSessionDto): Promise<Session> {
    return await this.sessionModel.findByIdAndUpdate(id, Session, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Session> {
    return await this.sessionModel.findByIdAndDelete(id);
  }
}