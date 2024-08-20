import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../../src/application/services/cliente.service';
import { ContaService } from '../../src/application/services/conta.service';
import { ViaCepService } from '../../src/application/services/viacep.service';
import { ViaCepModule } from '../../src/modules/viacep.module'; 

const mockContaService = {
  obterConta: jest.fn(),
};

const mockViaCepService = {
  consultarCep: jest.fn().mockResolvedValue({
    logradouro: 'Rua das Flores, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '12246001',
  }),
};

describe('ClienteService', () => {
  let clienteService: ClienteService;
  let contaService: ContaService;
  let viaCepService: ViaCepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ViaCepModule], 
      providers: [
        ClienteService,
        { provide: ContaService, useValue: mockContaService },
        { provide: ViaCepService, useValue: mockViaCepService }, 
      ],
    }).compile();

    clienteService = module.get<ClienteService>(ClienteService);
    viaCepService = module.get<ViaCepService>(ViaCepService);
    contaService = module.get<ContaService>(ContaService);
  });

  it('Deve adicionar um cliente com CEP 12246001', async () => {
    const cliente = {
      nome: 'Luana Cardoso',
      dataNascimento: '1987-08-06',
      email: 'luana@gmail.com',
      telefone: '12997999979',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '12246001',
      cpf: '12345678901',
      rendaSalarial: 5000,
      statusAtivo: true,
      conta: [],
    };

    await clienteService.adicionarCliente(cliente);
    const clientes = await clienteService.buscarClientes();
    expect(clientes).toContainEqual(cliente);
  });

});
