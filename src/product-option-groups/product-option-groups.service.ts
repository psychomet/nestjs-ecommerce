import { Injectable } from '@nestjs/common';
import { CreateProductOptionGroupDto } from './dto/create-product-option-group.dto';
import { UpdateProductOptionGroupDto } from './dto/update-product-option-group.dto';

@Injectable()
export class ProductOptionGroupsService {
  create(createProductOptionGroupDto: CreateProductOptionGroupDto) {
    return 'This action adds a new productOptionGroup';
  }

  findAll() {
    return `This action returns all productOptionGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productOptionGroup`;
  }

  update(id: number, updateProductOptionGroupDto: UpdateProductOptionGroupDto) {
    return `This action updates a #${id} productOptionGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOptionGroup`;
  }
}
