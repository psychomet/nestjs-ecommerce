import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsController } from './product-variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Language } from '../languages/entities/language.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductVariantPrice } from './entities/product-variant-price.entity';
import { ProductVariantTranslation } from './entities/product-variant-translation.entity';
import { ProductOption } from '../product-options/entities/product-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductVariant,
      ProductVariantPrice,
      ProductVariantTranslation,
      ProductOption,
      Language,
    ]),
  ],
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
