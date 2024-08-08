import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from '../../src/services/gerente.service';
import { Gerente } from '../../src/models/gerente.model';
import { Cliente } from '../../src/models/cliente.model';

describe('GerenteService', () => {
  let service: GerenteService;
  let gerenteId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenteService],
    }).compile();

    service = module.get<GerenteService>(GerenteService);
  });

  it('deve adicionar um cliente a um gerente', async () => {
    const gerente: Gerente = new Gerente(
      1,
      'Bernadete Alves',
      '1956-05-17',
      'bernadete@gmail.com',
      '12 98765-4321',
      'Rua das Flores, 1232',
      'São Paulo',
      'SP',
      '123.456.789-00',
      5000,
      true,
    );

    const cliente: Cliente = {
      id: 1,
      nome: 'Juliano Martins',
      dataNascimento: '1990-04-03',
      email: 'juli@gmail.com',
      telefone: '12 91234-5698',
      endereco: 'Avenida Paulista, 1010',
      cidade: 'São Paulo',
      estado: 'SP',
      cpf: '985.653.321-02',
      rendaSalarial: 3000,
      statusAtivo: false,
      conta: [],
    };

    await service.criarGerente(gerente);
    gerenteId = gerente.id;

    const atualizado = await service.adicionarClienteAoGerente(
      gerenteId,
      cliente,
    );

    expect(atualizado).toBeDefined();
    expect(atualizado.clientes).toContainEqual(cliente);
  });
});
