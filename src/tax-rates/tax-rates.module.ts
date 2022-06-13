import { Module } from '@nestjs/common';
import { TaxRatesService } from './tax-rates.service';
import { TaxRatesController } from './tax-rates.controller';
import { TaxCategoriesModule } from '../tax-categories/tax-categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxRate } from './entities/tax-rate.entity';

@Module({
  imports: [TaxCategoriesModule, TypeOrmModule.forFeature([TaxRate])],
  controllers: [TaxRatesController],
  providers: [TaxRatesService],
  exports: [TaxRatesService],
})
export class TaxRatesModule {}
