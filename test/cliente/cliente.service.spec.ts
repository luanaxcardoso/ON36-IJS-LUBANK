import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../../src/application/services/cliente.service';
import { ContaService } from '../../src/application/services/conta.service';
import { ViaCepService } from '../../src/application/services/viacep.service';
import { CreateClienteDto } from '../../src/application/dto/cliente/create-cliente.dto';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';

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

  it('Deve adicionar um cliente com CEP 12246001', async () => {
    const cliente: CreateClienteDto = {
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

    await service.adicionarCliente(cliente);
    const clientes = await service.buscarClientes();
    expect(clientes).toContainEqual(cliente);
  });

  it('Deve lançar uma exceção ao adicionar um cliente com CPF já existente', async () => {
    const cliente: CreateClienteDto = {
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

    await service.adicionarCliente(cliente);
    await expect(service.adicionarCliente(cliente)).rejects.toThrow(ConflictException);
  });

  it('Deve buscar um cliente pelo ID', async () => {
    const cliente: CreateClienteDto = {
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

    await service.adicionarCliente(cliente);
    const encontrado = await service.buscarCliente(1);
    expect(encontrado).toEqual(cliente);
  });

  it('Deve atualizar um cliente com CEP', async () => {
    const cliente: CreateClienteDto = {
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

    await service.adicionarCliente(cliente);
    const atualizado = await service.atualizarCliente(1, {
      nome: 'Luana Aparecida Cardoso',
      cep: '12345678',
    });
    expect(atualizado?.nome).toBe('Luana Aparecida Cardoso');
    expect(atualizado?.cep).toBe('12345678');
  });

  it('Deve deletar um cliente', async () => {
    const cliente: CreateClienteDto = {
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

    await service.adicionarCliente(cliente);
    const mensagem = await service.deletarCliente(1);
    expect(mensagem).toEqual({
      message: 'Cliente com ID 1 removido com sucesso.',
    });
    const clientes = await service.buscarClientes();
    expect(clientes).not.toContainEqual(cliente);
  });

  it('Deve consultar o CEP do cliente', async () => {
    const cliente: CreateClienteDto = {
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
    
    const endereco = {
      logradouro: 'Rua Exemplo',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP',
      cep: '12246001',
    };
  
    mockViaCepService.consultarCep.mockResolvedValue(endereco);
  
    const clienteAdicionado = await service.adicionarCliente(cliente);
  
    const resultado = await service.consultarCep(clienteAdicionado.id);
  
    expect(resultado).toEqual(endereco);
  });
  
  
});
