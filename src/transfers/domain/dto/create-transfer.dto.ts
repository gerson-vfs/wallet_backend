export class CreateTransferDto {
  origin: {
    id: number;
  };
  destination: {
    id: number;
  };
  amount: number;
}
