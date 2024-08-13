import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ViaCepService {
  constructor(private readonly httpService: HttpService) {}

  async consultarCep(cep: string): Promise<any> {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new BadRequestException('Erro ao consultar o CEP');
    }
  }
}
