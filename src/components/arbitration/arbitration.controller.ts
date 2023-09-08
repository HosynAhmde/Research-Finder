import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ArbitrationService } from "./arbitration.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateArbitrationDto } from "./dto";
import { ArbitrationSerializer, ArbitrationsSerializer } from "./serializers";
import { SetPolicy, SetResource } from "@Common/metadata";
import { Action, Resource } from "@Common/enum";
import { AuthGuard,  PolicyGuard } from "@Common/guards";
import { QueryStringParserInterceptor, SetOwnerInterceptor } from "@Common/interceptors";
import { Filter } from "@Common/decorators";
import { FilterDto } from "@Common/dto";

@Controller("arbitration")
@ApiTags("Arbitration")
@ApiBearerAuth()
@SetResource(Resource.Arbitration)
@UseGuards(AuthGuard, PolicyGuard)
@UseInterceptors(QueryStringParserInterceptor, ClassSerializerInterceptor)
export class ArbitrationController {
    constructor(private readonly service: ArbitrationService) {}

    @Post()
    @SetPolicy(Action.Create)
    @UseInterceptors(SetOwnerInterceptor)
    @ApiOperation({summary: "Create arbitration"})
    async create(@Body() dto:CreateArbitrationDto) {
        return ArbitrationSerializer.build(await this.service.create(dto));
    }

    @Get()
    @SetPolicy(Action.Read)
    @ApiOperation({
        summary: "Get all arbitrations",
    })
    async findAll(@Filter() filter: FilterDto) {
        return ArbitrationsSerializer.build(await this.service.find(filter.toObject()));
        
    }
}