import { Injectable } from "@nestjs/common";
import { CreatePostDTO } from "./dto/CreatePostDTO";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { FilesService } from "src/files/files.service";


@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService    
  ) {}

  async create(dto: CreatePostDTO, image: any) {
    const fileName = this.fileService.createFile(image);
    const post = await this.postRepository.create({...dto, image: fileName});
    return post;
  }
}