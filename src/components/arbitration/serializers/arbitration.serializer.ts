import { Serializer } from "@Common/serializers";
import { ArbitrationDocument } from "../schema";
import { Exclude, Expose, Type } from "class-transformer";
import { ArticleSerializer } from "@Components/article/serializers";

@Exclude()
export class ArbitrationSerializer extends Serializer<ArbitrationSerializer> {

    @Expose()
    articleId:string

    @Expose()
    refereeId:string[]

    @Expose()
    @Type(()=>ArticleSerializer)
    article: Record<string,any>

    @Expose()
    feedback:string

    static build(data: ArbitrationDocument): ArbitrationSerializer {
        return new ArbitrationSerializer(data);
    }
}