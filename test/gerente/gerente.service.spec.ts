import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from '../../src/services/gerente.service';
import { Gerente } from '../../src/models/gerente.model';

describe('GerenteService', () => {
  let service: GerenteService;
  let gerenteId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenteService],
    }).compile();

    service = module.get<GerenteService>(GerenteService);
  });

  it('Deve criar um gerente', async () => {
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
      '12246001',
      5000,
      true,
    );

    const criado = await service.criarGerente(gerente);
    gerenteId = criado.id;

    const atualizado = await service.atualizarGerente(gerenteId, {
      nome: 'Bernadete Serafim Alves',
    });
    expect(atualizado?.nome).toBe('Bernadete Serafim Alves');
  });

  it('Deve deletar um gerente', async () => {
    const gerente: Gerente = new Gerente(
      2,
      'Bernadete Alves',
      '1956-05-17',
      'bernadete@gmail.com',
      '12 98765-4321',
      'Rua das Flores, 1232',
      'São Paulo',
      'SP',
      '123.456.789-00',
      '12246001', 
      5000,
      true,
    );

    const criado = await service.criarGerente(gerente);
    const idGerente = criado.id;
    const gerenteExistente = await service.buscarGerente(idGerente);
    expect(gerenteExistente).toBeDefined();
    expect(gerenteExistente.id).toBe(idGerente);

    const resultado = await service.deletarGerente(idGerente);
    expect(resultado.message).toBe(
      `Gerente com ID ${idGerente} removido com sucesso.`,
    );

    await expect(service.buscarGerente(idGerente)).rejects.toThrowError(
      `Gerente com ID ${idGerente} não encontrado.`,
    );
  });
});
