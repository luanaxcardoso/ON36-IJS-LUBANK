import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Gerente } from '../models/gerente.model';
import { Cliente } from '../models/cliente.model';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  async criarGerente(gerente: Gerente): Promise<Gerente> {
    const gerenteExistente = this.gerentes.find(g => g.id === gerente.id);
    if (gerenteExistente) {
      throw new ConflictException(`Gerente com ID ${gerente.id} já existe.`);
    }

    gerente.id = this.gerentes.length > 0 ? this.gerentes[this.gerentes.length - 1].id + 1 : 1;
    console.log('Criando gerente:', gerente);
    this.gerentes.push(gerente);
    console.log('Gerente após criação:', this.gerentes);
    return gerente;
  }

  async buscarGerente(id: number): Promise<Gerente> {
    console.log('Buscando gerente com id:', id);
    const gerente = this.gerentes.find(g => g.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    return gerente;
  }

  async buscarGerentes(): Promise<Gerente[]> {
    return this.gerentes;
  }

  async atualizarGerente(id: number, gerenteAtualizado: Partial<Gerente>): Promise<Gerente> {
    const gerenteIndex = this.gerentes.findIndex(g => g.id === id);
    if (gerenteIndex === -1) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    const gerente = this.gerentes[gerenteIndex];
    Object.assign(gerente, gerenteAtualizado);
    this.gerentes[gerenteIndex] = gerente;
    return gerente;
  }

  async deletarGerente(id: number): Promise<{ message: string }> {
    console.log('Deletando gerente com id:', id);
    const gerente = this.gerentes.find(g => g.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    this.gerentes = this.gerentes.filter(g => g.id !== id);
    console.log('Gerente deletado com sucesso.');
    return { message: `Gerente com ID ${id} removido com sucesso.` };
  }

  async adicionarClienteAoGerente(gerenteId: number, cliente: Cliente): Promise<Gerente> {
    const gerente = await this.buscarGerente(gerenteId);
    gerente.adicionarCliente(cliente);
    return gerente;
  }
}
