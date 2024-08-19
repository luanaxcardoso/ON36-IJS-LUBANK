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


@Injectable()
export class ClienteService {
  
  private clientes: CreateClienteDto[] = [];

  constructor(
    private readonly contaService: ContaService,
    private readonly viaCepService: ViaCepService,
  ) {}

  async adicionarCliente(
    clienteDto: CreateClienteDto,
  ): Promise<CreateClienteDto> {
    const cliente = new CreateClienteDto();
    Object.assign(cliente, clienteDto);

    const erros = await validate(cliente);
    if (erros.length > 0) {
      throw new BadRequestException(
        `Dados inválidos: ${JSON.stringify(erros)}`,
      );
    }

    const clienteExistente = this.clientes.find(
      (c) => c.cpf === clienteDto.cpf,
    );
    if (clienteExistente) {
      throw new ConflictException(
        `Cliente com CPF ${clienteDto.cpf} já existe.`,
      );
    }

    clienteDto['id'] =
      this.clientes.length > 0
        ? this.clientes[this.clientes.length - 1]['id'] + 1
        : 1;

    this.clientes.push(clienteDto);
    return clienteDto;
  }

  buscarCliente(id: number): CreateClienteDto | undefined {
    const cliente = this.clientes.find((cliente) => cliente['id'] === id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  buscarClientes(): CreateClienteDto[] {
    return this.clientes;
  }

  async atualizarCliente(
    id: number,
    clienteDto: UpdateClienteDto,
  ): Promise<CreateClienteDto> {
    const cliente = this.clientes.find((c) => c['id'] === id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    const clienteAtualizado = { ...cliente, ...clienteDto };
    const erros = await validate(clienteAtualizado);
    if (erros.length > 0) {
      throw new BadRequestException(
        `Dados inválidos: ${JSON.stringify(erros)}`,
      );
    }

    this.clientes = this.clientes.map((c) =>
      c['id'] === id ? clienteAtualizado : c,
    );
    return clienteAtualizado;
  }

  
  deletarCliente(id: number): { message: string } {
    const cliente = this.clientes.find((g) => g['id'] === id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    this.clientes = this.clientes.filter((g) => g['id'] !== id);
    return { message: `Cliente com ID ${id} removido com sucesso.` };
  }

  async associarConta(clienteId: number, contaId: number): Promise<boolean> {
    const cliente = this.clientes.find((c) => c['id'] === clienteId);
    const conta = await this.contaService.obterConta(contaId); // Assuma que obterConta é assíncrono
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
    }
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${contaId} não encontrada.`);
    }
    cliente.conta.push(conta);
    return true;
  }

  async consultarCep(clienteId: number): Promise<any> {
    const cliente = await this.buscarCliente(clienteId); 
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
    }

    if (!cliente.cep || cliente.cep.trim() === '') {
      throw new BadRequestException(`Cliente com ID ${clienteId} não possui um CEP válido.`);
    }

    const endereco = await this.viaCepService.consultarCep(cliente.cep);
    
    
    if (!endereco || !endereco.cep || endereco.cep !== cliente.cep) {
      throw new BadRequestException(`Não foi possível encontrar o endereço para o CEP ${cliente.cep}.`);
    }
    
    return endereco;
  }
}
