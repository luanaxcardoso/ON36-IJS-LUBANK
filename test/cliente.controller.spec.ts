import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from '../src/controllers/cliente.controller';
import { ClienteService } from '../src/services/cliente.service';
import { Cliente } from '../src/models/cliente.model';
import { NotFoundException } from '@nestjs/common';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  beforeEach(async () => {
    const mockClienteService = {
      adicionarCliente: jest.fn(),
      associarConta: jest.fn(),
      buscarCliente: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClienteService,
          useValue: mockClienteService,
        },
      ],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);
  });

  it('Chama o método adicionarCliente', () => {
    const cliente = new Cliente(
      1,
      'Luana Cardoso',
      '1986-08-12',
      'luana.cardoso@gmail.com',
      '+55 11 99856-1234',
      'Rua Machado de Assis, 123, Apto 45',
      'São Paulo',
      'SP',
      '365.968.456-00',
      3000,
      true
    );

    controller.adicionarCliente(cliente);
    expect(service.adicionarCliente).toHaveBeenCalledWith(cliente);
  });

  it('Chama o método associarConta', () => {
    const clienteId = 1;
    const contaId = 1;
    const body = { clienteId, contaId };
    controller.associarConta(body);
    expect(service.associarConta).toHaveBeenCalledWith(clienteId, contaId);
  });

  it('Chama o método buscarCliente', async () => {
    const id = 1;
    const cliente = new Cliente(
      1,
      'Luana Cardoso',
      '1986-08-12',
      'luana.cardoso@gmail.com',
      '+55 11 99856-1234',
      'Rua Machado de Assis, 123, Apto 45',
      'São Paulo',
      'SP',
      '365.968.456-00',
      3000,
      true
    );

    (service.buscarCliente as jest.Mock).mockResolvedValue(cliente);

    const result = await controller.buscarCliente(id);
    expect(service.buscarCliente).toHaveBeenCalledWith(id);
    expect(result).toEqual(cliente);
  });

  it('Deve lançar uma exceção ao buscar um cliente inexistente', async () => {
    const id = 111;
    (service.buscarCliente as jest.Mock).mockResolvedValue(null);

    await expect(controller.buscarCliente(id)).rejects.toThrowError(new NotFoundException(`Cliente com ID ${id} não encontrado.`));
  });
});
