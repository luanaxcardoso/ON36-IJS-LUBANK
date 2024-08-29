import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateClienteDto } from '../dto/cliente/create-cliente.dto';
import { ContaService } from '../services/conta.service';
import { ViaCepService } from '../services/viacep.service';
import { UpdateClienteDto } from '../dto/cliente/update-cliente.dto';
import { ClienteRepository } from '../../db/repositories/cliente.repository';
import { Cliente } from 'src/db/entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly contaService: ContaService,
    private readonly viaCepService: ViaCepService,
  ) {}

  async adicionarCliente(clienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(clienteDto);

    const erros = await validate(cliente);
    if (erros.length > 0) {
      throw new BadRequestException(
        `Dados inválidos: ${JSON.stringify(erros)}`,
      );
    }

    const clienteExistente = await this.clienteRepository.encontrarPorCpf(
      clienteDto.cpf,
    );
    if (clienteExistente) {
      throw new ConflictException(
        `Cliente com CPF ${clienteDto.cpf} já existe.`,
      );
    }

    return this.clienteRepository.adicionarCliente(cliente);
  }

  async buscarCliente(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.encontrarPorId(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async buscarClientes(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async atualizarCliente(
    id: number,
    clienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.buscarCliente(id);
    Object.assign(cliente, clienteDto);

    const erros = await validate(cliente);
    if (erros.length > 0) {
      throw new BadRequestException(
        `Dados inválidos: ${JSON.stringify(erros)}`,
      );
    }

    return this.clienteRepository.save(cliente);
  }

  async deletarCliente(id: number): Promise<{ message: string }> {
    const cliente = await this.buscarCliente(id);
    await this.clienteRepository.remove(cliente);
    return { message: `Cliente com ID ${id} removido com sucesso.` };
  }

  async associarConta(clienteId: number, contaId: number): Promise<boolean> {
    const cliente = await this.buscarCliente(clienteId);
    const conta = await this.contaService.obterConta(contaId); 
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
    }
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${contaId} não encontrada.`);
    }
    cliente.contas.push(conta);
    await this.clienteRepository.save(cliente);
    return true;
  }

  async consultarCep(clienteId: number): Promise<any> {
    const cliente = await this.buscarCliente(clienteId);
    
    if (!cliente.cep || cliente.cep.trim() === '') {
      throw new BadRequestException(`Cliente com ID ${clienteId} não possui um CEP válido.`);
    }
  
    const endereco = await this.viaCepService.consultarCep(cliente.cep);
  
    if (!endereco || !endereco.cep || endereco.cep !== cliente.cep) {
      throw new BadRequestException(`Não foi possível encontrar o endereço para o CEP ${cliente.cep}.`);
    }
  
    return endereco;
  }

  async encontrarPorStatus(): Promise<Cliente[]> {
    return this.clienteRepository.encontrarPorStatus();
  }

  async encontrarPorCidade(cidade: string): Promise<Cliente[]> {
    return this.clienteRepository.encontrarPorCidade(cidade);
  }

  async encontrarPorEstado(estado: string): Promise<Cliente[]> {
    return this.clienteRepository.encontrarPorEstado(estado);
  }

 

  async desativarCliente(id: number): Promise<void> {
    return this.clienteRepository.desativarCliente(id);
  }

  async ativarCliente(id: number): Promise<void> {
    return this.clienteRepository.alterarrCliente(id);
  }

  async atualizarRenda(id: number, rendaSalarial: number): Promise<void> {
    return this.clienteRepository.atualizarRenda(id, rendaSalarial);
  }

  async encontrarPorFaixaDeRenda(minRenda: number, maxRenda: number): Promise<Cliente[]> {
    return this.clienteRepository.encontrarPorFaixaDeRenda(minRenda, maxRenda);
  }

  async encontrarPorContas(): Promise<Cliente[]> {
    return this.clienteRepository.encontrarPorContas();
  }

  async clienteAtivo(id: number): Promise<boolean> {
    return this.clienteRepository.clienteAtivo(id);
  }

  async encontrarPorCep(cep: string): Promise<Cliente[]> {
    return this.clienteRepository.encontrarPorCep(cep);
  }
}
