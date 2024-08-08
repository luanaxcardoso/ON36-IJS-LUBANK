import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ClienteService } from '../../src/services/cliente.service';
import { ClienteController } from '../../src/controllers/cliente.controller';

const mockClienteService = {
  associarConta: jest.fn(),
};

describe('ClienteController (e2e)', () => {
  let app;
  let clienteService = mockClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ClienteController],
      providers: [
        { provide: ClienteService, useValue: clienteService },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('deve associar uma conta a um cliente', async () => {
    const clienteId = 1;
    const contaId = 1;

    
    clienteService.associarConta.mockResolvedValue(true);

    const response = await request(app.getHttpServer())
      .post('/cliente/associarconta')
      .send({ clienteId, contaId })
      .expect(201);  

    expect(response.text).toBe('true');
    expect(clienteService.associarConta).toHaveBeenCalledWith(clienteId, contaId);
  });

  afterAll(async () => {
    await app.close();
  });
});
