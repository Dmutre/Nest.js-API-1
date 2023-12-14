import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePostDTO } from "./dto/CreatePostDTO";
import { PostsService } from "./posts.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('posts')
@ApiTags('posts')
export class PostsController {

  constructor(
    private postService: PostsService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Body() dto: CreatePostDTO,
    @UploadedFile() image
    ) {
    return await this.postService.create(dto, image);
  }
}