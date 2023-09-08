import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Arbitration, ArbitrationSchema } from "./schema";
import { ArbitrationRepository } from "./arbitration.repository";
import { ArbitrationService } from "./arbitration.service";
import { ArbitrationController } from "./arbitration.controller";
import { ArticleModule } from "@Components/article/article.module";
import { UserModule } from "@Components/user/user.module";

@Module({
    imports: [ MongooseModule.forFeature([{ name: Arbitration.name, schema: ArbitrationSchema }]),ArticleModule,UserModule],
    providers: [ArbitrationRepository,ArbitrationService],
    controllers: [ArbitrationController],
    exports: [],
})
export class ArbitrationModule {}