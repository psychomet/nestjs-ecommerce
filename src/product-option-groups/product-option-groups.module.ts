import { Module } from '@nestjs/common';
import { ProductOptionGroupsService } from './product-option-groups.service';
import { ProductOptionGroupsController } from './product-option-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from '../languages/entities/language.entity';
import { ProductOptionGroup } from './entities/product-option-group.entity';
import { ProductOptionGroupTranslation } from './entities/product-option-group-translation.entity';
import { ProductOption } from '../product-options/entities/product-option.entity';
import { ProductOptionTranslation } from '../product-options/entities/product-option-translation.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Language,
      ProductOptionGroup,
      ProductOptionGroupTranslation,
      ProductOption,
      ProductOptionTranslation,
      Product,
    ]),
  ],
  controllers: [ProductOptionGroupsController],
  providers: [ProductOptionGroupsService],
  exports: [ProductOptionGroupsService],
})
export class ProductOptionGroupsModule {}
