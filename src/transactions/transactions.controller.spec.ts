import { Test, TestingModule } from '@nestjs/testing';
import {
  TransactionReason,
  TransactionStatus,
  TransactionType,
} from './entities/transaction.entity';
import { MemoryTransactionRepository } from '../repository/TransactionRepository/MemoryTransactionRepository';
import { TransactionRepository } from '../repository/TransactionRepository/TransactionRepository';
import { TransactionsController } from './transactions.controller';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionRepository,
          useClass: MemoryTransactionRepository,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a transaction', () => {
    const body = {
      accountId: 1,
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    const transaction = controller.create(body);

    expect(transaction.id).toBe(1);
    expect(transaction.accountId).toBe(body.accountId);
    expect(transaction.amount).toBe(body.amount);
    expect(transaction.type).toBe(body.type);
    expect(transaction.status).toBe(body.status);
    expect(transaction.reason).toBe(body.reason);
    expect(transaction.createdAt).toBeDefined();
    expect(transaction.updatedAt).toBeDefined();
    expect(transaction.createdAt).toBe(transaction.updatedAt);
  });

  it('should return a transaction', () => {
    const body = {
      accountId: 1,
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    const transaction = controller.create(body);

    expect(controller.findOne('1')).toEqual(transaction);
  });

  it('should return all transactions', () => {
    const body = {
      accountId: 1,
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    const transaction1 = controller.create(body);
    const transaction2 = controller.create(body);

    expect(controller.findAll()).toEqual([transaction1, transaction2]);
  });

  it('should update a transaction', () => {
    const body = {
      accountId: 1,
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    const transaction = controller.create(body);

    const update = {
      accountId: 1,
      amount: 4321,
      type: TransactionType.DEBIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    expect(controller.update('1', update)).toEqual({
      ...transaction,
      ...update,
      updatedAt: expect.any(Date),
    });
  });

  it('should remove a transaction', () => {
    const body = {
      accountId: 1,
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    const transaction = controller.create(body);

    expect(controller.remove('1')).toEqual({
      ...transaction,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
