import { Test, TestingModule } from '@nestjs/testing';
import {
  Transaction,
  TransactionReason,
  TransactionStatus,
  TransactionType,
} from '../../transactions/domain/entities/transaction.entity';
import { MemoryTransactionRepository } from './MemoryTransactionRepository';
import { TransactionRepository } from './TransactionRepository';

describe('TransactionRepository', () => {
  let transactionRepository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionRepository,
          useClass: MemoryTransactionRepository,
        },
      ],
    }).compile();

    transactionRepository = module.get<TransactionRepository>(
      TransactionRepository,
    );
  });

  it('should be defined', () => {
    expect(transactionRepository).toBeDefined();
  });

  it('should increment the id', () => {
    const body = {
      accountId: 1,
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    const transaction1 = transactionRepository.create(body);
    const transaction2 = transactionRepository.create(body);

    expect(transaction1.id).toBe(1);
    expect(transaction2.id).toBe(2);

    transactionRepository.remove(1);
    transactionRepository.remove(2);

    const user3 = transactionRepository.create(body);
    const user4 = transactionRepository.create(body);

    expect(user3.id).toBe(3);
    expect(user4.id).toBe(4);
  });

  it('should create a transaction', () => {
    const body = {
      accountId: 1,
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    const transaction = transactionRepository.create(body);

    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.id).toBe(1);
    expect(transaction.accountId).toBe(body.accountId);
    expect(transaction.amount).toBe(body.amount);
    expect(transaction.type).toBe(body.type);
    expect(transaction.status).toBe(body.status);
    expect(transaction.reason).toBe(body.reason);
    expect(transaction.createdAt).toBeDefined();
    expect(transaction.updatedAt).toBeDefined();
    expect(transaction.createdAt).toBe(transaction.updatedAt);

    transactionRepository.remove(1);
  });

  it('should return an array of transactions', () => {
    const body = {
      accountId: 1,
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    transactionRepository.create(body);

    const users = transactionRepository.findAll();

    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBe(1);
    expect(users[0]).toBeInstanceOf(Transaction);
    expect(users[0].id).toBe(1);
    expect(users[0].accountId).toBe(body.accountId);
    expect(users[0].amount).toBe(body.amount);
    expect(users[0].type).toBe(body.type);
    expect(users[0].status).toBe(body.status);
    expect(users[0].reason).toBe(body.reason);
    expect(users[0].createdAt).toBeDefined();
    expect(users[0].updatedAt).toBeDefined();
    expect(users[0].createdAt).toBe(users[0].updatedAt);
  });

  it('should return a transaction', () => {
    const body = {
      accountId: 1,
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    transactionRepository.create(body);

    const transaction = transactionRepository.findOne(1);

    expect(transaction).toBeInstanceOf(Transaction);
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

  it('should return undefined if transaction not found', () => {
    const body = {
      amount: 1234,
      type: TransactionType.CREDIT,
      status: TransactionStatus.PENDING,
      reason: TransactionReason.TRANSFER,
    };

    expect(transactionRepository.update(1, body)).toBeNull();
    expect(transactionRepository.findOne(1)).toBeNull();
    expect(transactionRepository.remove(1)).toBeNull();
  });
});
