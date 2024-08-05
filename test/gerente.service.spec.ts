import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from '../src/services/gerente.service';
import { Cliente } from '../src/models/cliente.model';
import { Gerente } from '../src/models/gerente.model';

describe('GerenteService', () => {
  let service: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenteService],
    }).compile();

    service = module.get<GerenteService>(GerenteService);
  });

  it('Deve criar um gerente', () => {
    const gerente: Gerente = {
      id: 1,
      nome: 'Bernadete Alves',
      clientes: [],
      dataNascimento: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cpf: '',
      statusAtivo: false,
      contas: [],
      adicionarCliente: function (cliente: Cliente): void {
        throw new Error('Função não implementada.');
      }
    };

    const resultado = service.criarGerente(gerente);
    expect(resultado).toBe(gerente);
    expect(service.buscarGerentes()).toContain(gerente);
  });

  it('Deve buscar um gerente pelo ID', () => {
    const gerente: Gerente = {
      id: 1,
      nome: 'Bernadete Alves',
      clientes: [],
      dataNascimento: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cpf: '',
      statusAtivo: false,
      contas: [],
      adicionarCliente: function (cliente: Cliente): void {
        throw new Error('Função não implementada.');
      }
    };

    service.criarGerente(gerente);
    const encontrado = service.buscarGerente(1);
    expect(encontrado).toBe(gerente);
  });

  it('Deve atualizar um gerente', () => {
    const gerente: Gerente = {
      id: 1,
      nome: 'Bernadete Alves',
      clientes: [],
      dataNascimento: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cpf: '',
      statusAtivo: false,
      contas: [],
      adicionarCliente: function (cliente: Cliente): void {
        throw new Error('Função não implementada.');
      }
    };

    service.criarGerente(gerente);
    const atualizado = service.atualizarGerente(1, { nome: 'Bernadete Alves' });
    expect(atualizado?.nome).toBe('Bernadete Alves');
  });

  it('Deve deletar um gerente', () => {
    const gerente: Gerente = {
      id: 1,
      nome: 'Bernadete Alves',
      clientes: [],
      dataNascimento: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cpf: '',
      statusAtivo: false,
      contas: [],
      adicionarCliente: function (cliente: Cliente): void {
        throw new Error('Função não implementada.');
      }
    };

    service.criarGerente(gerente);
    const mensagem = service.deletarGerente(1);
    expect(mensagem).toEqual({ message: 'Gerente com ID 1 removido com sucesso.' });
    expect(service.buscarGerentes()).not.toContain(gerente);
  });

  it('Deve adicionar um cliente a um gerente', () => {
    const gerente: Gerente = {
      id: 1,
      nome: 'Bernadete Alves',
      clientes: [],
      dataNascimento: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cpf: '',
      statusAtivo: false,
      contas: [],
      adicionarCliente: function (cliente: Cliente): void {
        throw new Error('Função não implementada.');
      }
    };

    const cliente: Cliente = {
      id: 1,
      nome: 'Luana Cardoso',
      conta: [],
      dataNascimento: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cpf: '',
      rendaSalarial: 3000,
      statusAtivo: true,
    };

    service.criarGerente(gerente);
    const gerenteAtualizado = service.adicionarClienteAoGerente(1, cliente);
    expect(gerenteAtualizado.clientes).toContain(cliente);
  });
});
