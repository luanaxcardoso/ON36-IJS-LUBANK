import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../../src/services/cliente.service';
import { ContaService } from '../../src/services/conta.service';
import { ViaCepService } from '../../src/services/viacep.service'; 
import { InterfacePessoa } from '../../src/interfaces/pessoa.interface';
import { ConflictException } from '@nestjs/common';

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

  it('Deve adicionar um cliente com CEP 12246001', () => {
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
      cep: '12246001',
      cpf: '',
       
    };

    const resultado = service.adicionarCliente(cliente);
    expect(resultado).toBe(cliente);
    expect(service.buscarClientes()).toContain(cliente);
  });

  it('Deve lançar uma exceção ao adicionar um cliente com ID já existente', () => {
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
      cep: '12246001',
      cpf: '',
       
    };

    service.adicionarCliente(cliente);
    expect(() => service.adicionarCliente(cliente)).toThrow(ConflictException);
  });

  it('Deve buscar um cliente pelo ID', () => {
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
      cep: '12246001',
      cpf: '',
       
    };

    service.adicionarCliente(cliente);
    const encontrado = service.buscarCliente(1);
    expect(encontrado).toBe(cliente);
  });

  it('deve atualizar um cliente com CEP', () => {
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
      cep: '12246001', 
      cpf: '',
      
    };

    service.adicionarCliente(cliente);
    const atualizado = service.atualizarCliente(1, { nome: 'Luana Aparecida Cardoso', cep: '12345678' });
    expect(atualizado?.nome).toBe('Luana Aparecida Cardoso');
    expect(atualizado?.cep).toBe('12345678');
  });

  it('deve associar uma conta a um cliente', () => {
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
      cep: '12246001', 
      cpf: '',
      
    };

    const conta = { id: 1, saldo: 1000 };
    mockContaService.obterConta.mockReturnValue(conta);

    service.adicionarCliente(cliente);
    const associado = service.associarConta(1, 1);
    expect(associado).toBe(true);
    expect(cliente.conta).toContain(conta);
  });

  it('Deve deletar um cliente', () => {
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
      cep: '12246001',
      cpf: '',
       
    };

    service.adicionarCliente(cliente);
    const mensagem = service.deletarCliente(1);
    expect(mensagem).toEqual({
      message: 'Cliente com ID 1 removido com sucesso.',
    });
    expect(service.buscarClientes()).not.toContain(cliente);
  });

  it('Deve consultar o CEP do cliente', async () => {
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
      cep: '12246001', 
      cpf: '',
      
    };

    const endereco = { logradouro: 'Rua Exemplo', bairro: 'Centro', cidade: 'São Paulo', uf: 'SP' };
    mockViaCepService.consultarCep.mockReturnValue(endereco);

    service.adicionarCliente(cliente);
    const resultado = await service.consultarCep(1);
    expect(resultado).toBe(endereco);
  });

  it('Deve lançar exceção ao consultar CEP de cliente sem CEP', async () => {
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
      cep: '',
      cpf: '',
    };

    service.adicionarCliente(cliente);
    await expect(service.consultarCep(1)).rejects.toThrow('Cliente com ID 1 não possui CEP.');
  });

  it('Deve lançar exceção ao consultar CEP de cliente inexistente', async () => {
    await expect(service.consultarCep(999)).rejects.toThrow('Cliente com ID 999 não encontrado.');
  });
});
