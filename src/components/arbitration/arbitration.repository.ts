import { Repository } from '@Common/core';
import { Injectable } from '@nestjs/common';
import { type CreateArbitrationDto,type UpdateArbitrationDto,  } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArbitrationDocument,  Arbitration } from './schema';
@Injectable()
export class ArbitrationRepository extends Repository<Arbitration, CreateArbitrationDto, UpdateArbitrationDto> {
  constructor(@InjectModel(Arbitration.name) readonly model: Model<ArbitrationDocument>) {
    super(model);
  }
}
