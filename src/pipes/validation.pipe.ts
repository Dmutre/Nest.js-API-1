import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/utils/exceptions/ValidationException";


@Injectable()
export class VlidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const error = await validate(obj);

    if(error.length) {
      let message = error.map(err => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`
      });
      throw new ValidationException(message);
    }
  }
}