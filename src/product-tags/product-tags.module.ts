import { Module } from '@nestjs/common';
import { ProductTagsService } from './product-tags.service';
import { ProductTagsController } from './product-tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from './entities/product-tag.entity';
import { ProductTagTranslate } from './entities/product-tag-translate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTag, ProductTagTranslate])],
  controllers: [ProductTagsController],
  providers: [ProductTagsService],
  exports: [ProductTagsService],
})
export class ProductTagsModule {}
