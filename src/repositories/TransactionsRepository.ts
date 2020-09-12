import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const incomeValue = transactions.reduce((acumulator,transaction)=>transaction.type==='income'?acumulator+transaction.value:acumulator+0,0);
    const outcomeValue = transactions.reduce((acumulator,transaction)=>transaction.type==='outcome'?acumulator+transaction.value:acumulator+0,0);

    return {income: incomeValue, outcome: outcomeValue, total: incomeValue-outcomeValue};
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;

  }
}

export default TransactionsRepository;
