import { Module } from '@nestjs/common';
import { ProductBrandsService } from './product-brands.service';
import { ProductBrandsController } from './product-brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrand } from './entities/product-brand.entity';
import { ProductBrandTranslate } from './entities/product-brand-translate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductBrand, ProductBrandTranslate])],
  controllers: [ProductBrandsController],
  providers: [ProductBrandsService],
  exports: [ProductBrandsService],
})
export class ProductBrandsModule {}
