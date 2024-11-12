export class CalculateFineUseCase {
    async execute(expectedReturnDate: Date, actualReturnDate: Date): Promise<number> {
      const diff = (actualReturnDate.getTime() - expectedReturnDate.getTime()) / (1000 * 60 * 60 * 24);
      const finePerDay = 5;
  
      return diff > 0 ? diff * finePerDay : 0;
    }
  }
  