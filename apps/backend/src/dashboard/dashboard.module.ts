import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [AnalyticsModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
