import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Gerente } from '../../domain/entities/gerente.entity';
import { Cliente } from '../../domain/entities/cliente.entity';
import { CreateGerenteDto } from '../dto/gerente/create-gerente.dto';
import { UpdateGerenteDto } from '../dto/gerente/update-gerente.dto';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  async criarGerente(createGerenteDto: CreateGerenteDto): Promise<Gerente> {
    const gerenteExistente = this.gerentes.find(
      (g) => g.email === createGerenteDto.email,
    );
    if (gerenteExistente) {
      throw new ConflictException(
        `Gerente com email ${createGerenteDto.email} já existe.`,
      );
    }

    const novoGerente: Gerente = {
      ...createGerenteDto,
      id:
        this.gerentes.length > 0
          ? this.gerentes[this.gerentes.length - 1].id + 1
          : 1,
      clientes: [],
      contas: [],
      adicionarCliente: function (cliente: Cliente): void {
        throw new Error('Function not implemented.');
      },
    };

    console.log('Criando gerente:', novoGerente);
    this.gerentes.push(novoGerente);
    console.log('Gerente após criação:', this.gerentes);
    return novoGerente;
  }

  async buscarGerente(id: number): Promise<Gerente> {
    const gerente = this.gerentes.find((g) => g.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    return gerente;
  }

  async buscarGerentes(): Promise<Gerente[]> {
    return this.gerentes;
  }

  async atualizarGerente(
    id: number,
    updateGerenteDto: UpdateGerenteDto,
  ): Promise<Gerente> {
    const gerenteIndex = this.gerentes.findIndex((g) => g.id === id);
    if (gerenteIndex === -1) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }

    const gerente = this.gerentes[gerenteIndex];

    Object.assign(gerente, updateGerenteDto);

    this.gerentes[gerenteIndex] = gerente;
    return gerente;
  }

  async deletarGerente(id: number): Promise<{ message: string }> {
    console.log('Deletando gerente com id:', id);
    const gerente = this.gerentes.find((g) => g.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    this.gerentes = this.gerentes.filter((g) => g.id !== id);
    console.log('Gerente deletado com sucesso.');
    return { message: `Gerente com ID ${id} removido com sucesso.` };
  }

  async adicionarClienteAoGerente(
    gerenteId: number,
    cliente: Cliente,
  ): Promise<Gerente> {
    console.log('Associando cliente ao gerente:', gerenteId, cliente);

    const gerente = this.gerentes.find((g) => g.id === gerenteId);
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }

    if (!gerente.clientes) {
      gerente.clientes = [];
    }

    gerente.clientes.push(cliente);

    return gerente;
  }
}
