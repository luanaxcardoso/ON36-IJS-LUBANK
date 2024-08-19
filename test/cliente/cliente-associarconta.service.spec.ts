import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../../src/application/services/cliente.service';
import { ContaService } from '../../src/application/services/conta.service';
import { ViaCepService } from '../../src/application/services/viacep.service';
import { CreateClienteDto } from '../../src/application/dto/cliente/create-cliente.dto';


const mockContaService = {
  obterConta: jest.fn(),
};

const mockClienteService = {
  adicionarCliente: jest.fn(),
  obterCliente: jest.fn(),
  associarConta: jest.fn(),
};

const mockViaCepService = {
  consultarCep: jest.fn(),
};

describe('ClienteService', () => {
  let clienteService: ClienteService;
  let contaService: ContaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        { provide: ContaService, useValue: mockContaService },
        { provide: ViaCepService, useValue: mockViaCepService },
      ],
    }).compile();

    clienteService = module.get<ClienteService>(ClienteService);
    contaService = module.get<ContaService>(ContaService);
  });

  it('deve associar uma conta a um cliente existente', async () => {
    const cliente: CreateClienteDto = {
      id: 1,
      nome: 'Luana Cardoso',
      dataNascimento: '1987-08-06',
      email: 'luana@example.com',
      telefone: '11999999999',
      endereco: 'Rua Exemplo',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '12246001',
      cpf: '12345678901',
      rendaSalarial: 5000,
      statusAtivo: true,
      conta: [],
    };

    const conta = { id: 1, saldo: 1000 };

    mockClienteService.adicionarCliente.mockResolvedValue(cliente);
    mockClienteService.obterCliente.mockResolvedValue(cliente);
    mockContaService.obterConta.mockResolvedValue(conta);

    await clienteService.adicionarCliente(cliente);

    const resultado = await clienteService.associarConta(cliente.id, conta.id);

    expect(resultado).toBe(true);
    expect(cliente.conta).toContain(conta);
  });
});
