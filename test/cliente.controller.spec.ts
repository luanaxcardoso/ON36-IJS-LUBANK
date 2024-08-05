import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from '../src/controllers/cliente.controller';
import { ClienteService } from '../src/services/cliente.service';
import { Cliente } from '../src/models/cliente.model';

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
    const cliente: Cliente = {
      id: 1,
      nome: 'Luana Cardoso',
      dataNascimento: '1986-08-12',
      email: 'luana.cardoso@example.com',
      telefone: '+55 11 99856-1234',
      endereco: 'Rua Machado de Assis, 123, Apto 45',
      cidade: 'São Paulo',
      estado: 'SP',
      cpf: '365.968.456-00',
      rendaSalarial: 3000,
      statusAtivo: true,
      conta: [] 
    };
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
    const cliente: Cliente = {
      id: 1,
      nome: 'Luana Cardoso',
      dataNascimento: '1986-08-12',
      email: 'luana.cardoso@example.com',
      telefone: '+55 11 99856-1234',
      endereco: 'Rua Machado de Assis, 123, Apto 45',
      cidade: 'São Paulo',
      estado: 'SP',
      cpf: '365.968.456-00',
      rendaSalarial: 3000,
      statusAtivo: true,
      conta: []
    };
    (service.buscarCliente as jest.Mock).mockResolvedValue(cliente); 

    const result = await controller.buscarCliente(id);
    expect(service.buscarCliente).toHaveBeenCalledWith(id);
    expect(result).toEqual(cliente); 
  });
});
