import { Controller, Post, Put, Param, Body, Delete, Get } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/createsession.dto';
import { UpdateSessionDto } from './dto/updatesession.dto';
import { Session } from './schemas/session.schema';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getAllSession(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Post()
  async createSession(@Body() session: CreateSessionDto): Promise<Session> {
    return this.sessionService.create(session);
  }

  @Get(':id')
  async getSession(@Param('id') id: string,): Promise<Session> {
    return this.sessionService.findById(id);
  }
  
  @Put(':id')
  async updateSession(@Param('id') id: string, @Body() Session: UpdateSessionDto): Promise<Session> {
    return this.sessionService.updateById(id, Session);
  }

  @Delete(':id')
  async deleteSession(@Param('id') id: string,): Promise<Session> {
    return this.sessionService.deleteById(id);
  }
}