import { Module } from '@nestjs/common';
import { ProductOptionGroupsService } from './product-option-groups.service';
import { ProductOptionGroupsController } from './product-option-groups.controller';

@Module({
  controllers: [ProductOptionGroupsController],
  providers: [ProductOptionGroupsService],
})
export class ProductOptionGroupsModule {}
