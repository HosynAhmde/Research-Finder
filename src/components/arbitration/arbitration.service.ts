import { Service } from '@Common/core/service.core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { type CreateArbitrationDto, type UpdateArbitrationDto,  } from './dto';
import { Arbitration } from './schema';
import { ArbitrationRepository } from './arbitration.repository';
import type{ Document } from 'mongoose';
import { ArticleService } from '@Components/article/article.service';
import { UserService } from '@Components/user/user.service';

@Injectable()
export class ArbitrationService extends Service<Arbitration, CreateArbitrationDto, UpdateArbitrationDto> {
  constructor(readonly repository: ArbitrationRepository,readonly articleService: ArticleService,readonly userService: UserService) {
    super(repository);
  }

  override async create(arbitrationDto: CreateArbitrationDto): Promise<Document&Arbitration> {
    
    const article=await this.articleService.findOne({query:{id:arbitrationDto.articleId}});
    if(!article)
      throw new BadRequestException('Article not found');
    
    arbitrationDto.article={...article};
    return this.repository.create(arbitrationDto);
  }
}
