import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";


@Controller('posts')
@ApiTags('posts')
export class PostsController {

}