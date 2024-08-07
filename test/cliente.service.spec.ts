import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../src/services/cliente.service';
import { ContaService } from '../src/services/conta.service';
import { InterfacePessoa } from '../src/interfaces/pessoa.interface';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockContaService = {
  obterConta: jest.fn(),
};

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        { provide: ContaService, useValue: mockContaService },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('Deve adicionar um cliente', () => {
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
      cpf: ''
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
      cpf: ''
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
      cpf: ''
    };

    service.adicionarCliente(cliente);
    const encontrado = service.buscarCliente(1);
    expect(encontrado).toBe(cliente);
  });

  it('deve atualizar um cliente', () => {
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
      cpf: ''
    };

    service.adicionarCliente(cliente);
    const atualizado = service.atualizarCliente(1, { nome: 'Marta Silva' });
    expect(atualizado?.nome).toBe('Marta Silva');
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
      cpf: ''
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
      cpf: ''
    };

    service.adicionarCliente(cliente);
    const mensagem = service.deletarCliente(1);
    expect(mensagem).toEqual({ message: 'Cliente com ID 1 removido com sucesso.' });
    expect(service.buscarClientes()).not.toContain(cliente);
  });
});