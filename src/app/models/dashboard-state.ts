import { StockInfo } from './stock-info';

export interface DashboardState {
    NetLiquidationValue: number;
    CashValue: number;
    Stocks: StockInfo[];
}
