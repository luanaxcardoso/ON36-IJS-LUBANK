import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from '../../src/application/services/gerente.service';
import { Gerente } from '../../src/domain/entities/gerente.entity';
import { CreateGerenteDto } from '../../src/application/dto/gerente/create-gerente.dto';
import { UpdateGerenteDto } from '../../src/application/dto/gerente/update-gerente.dto';

describe('GerenteService', () => {
  let service: GerenteService;
  let gerenteId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenteService],
    }).compile();

    service = module.get<GerenteService>(GerenteService);
  });

  it('Deve criar e atualizar um gerente', async () => {
    const createGerenteDto: CreateGerenteDto = {
      nome: 'Bernadete Alves',
      dataNascimento: '1956-05-17',
      email: 'bernadete@gmail.com',
      telefone: '12 98765-4321',
      endereco: 'Rua das Flores, 1232',
      cidade: 'São Paulo',
      estado: 'SP',
      cpf: '12345678900',
      cep: '12246001',
      rendaSalarial: 5000,
      statusAtivo: true,
    };

    const criado = await service.criarGerente(createGerenteDto);
    gerenteId = criado.id;

    const updateGerenteDto: UpdateGerenteDto = {
      nome: 'Bernadete Serafim Alves',
    };

    const atualizado = await service.atualizarGerente(
      gerenteId,
      updateGerenteDto,
    );
    expect(atualizado?.nome).toBe('Bernadete Serafim Alves');
  });

  it('Deve deletar um gerente', async () => {
    const createGerenteDto: CreateGerenteDto = {
      nome: 'Bernadete Alves',
      dataNascimento: '1956-05-17',
      email: 'bernadete@gmail.com',
      telefone: '12 98765-4321',
      endereco: 'Rua das Flores, 1232',
      cidade: 'São Paulo',
      estado: 'SP',
      cpf: '12345678900',
      cep: '12246001',
      rendaSalarial: 5000,
      statusAtivo: true,
    };

    const criado = await service.criarGerente(createGerenteDto);
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
