import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../../src/services/cliente.service';
import { ContaService } from '../../src/services/conta.service';
import { ViaCepService } from '../../src/services/viacep.service'; 
import { InterfacePessoa } from '../../src/interfaces/pessoa.interface';

const mockContaService = {
  obterConta: jest.fn(),
};

const mockViaCepService = {
  consultarCep: jest.fn(), 
};

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        { provide: ContaService, useValue: mockContaService },
        { provide: ViaCepService, useValue: mockViaCepService }, 
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('deve associar uma conta a um cliente existente', () => {
    const cliente: InterfacePessoa = {
      id: 1,
      nome: 'Luana Cardoso',
      conta: [],
      dataNascimento: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '12246-001',
      cpf: '',
    };

    const conta = { id: 1, saldo: 1000 };
    mockContaService.obterConta.mockReturnValue(conta);

    service.adicionarCliente(cliente);
    service.associarConta(1, 1);

    console.log('Contas do cliente:', cliente.conta);

    expect(cliente.conta).toContain(conta);
  });
});
