import get from 'lodash/get';
import { AxiosError } from 'axios';

interface IStatusErrors {
  [key: number]: string;
}

interface IMessageErrors {
  [key: string]: string;
}

interface INormalizeError {
  (error: AxiosError, genericMessage: string): INormalizedError;
}

interface INormalizedError {
  message: string;
  status: number;
  isTimeout: boolean;
}

const statusErrors: IStatusErrors = {
  100: 'Continuar',
  101: 'Mudando protocolos',
  102: 'Processamento',
  122: 'Pedido URI muito longo',
  201: 'Criado',
  202: 'Aceito',
  203: 'Não autorizado',
  204: 'Nenhum conteúdo',
  205: 'Reset',
  206: 'Conteúdo parcial',
  207: 'Status Multi',
  300: 'Múltipla escolha',
  301: 'Movido',
  302: 'Encontrado',
  303: 'Consulte Outros',
  304: 'Não modificado',
  305: 'Use Proxy',
  306: 'Proxy Switch',
  307: 'Redirecionamento temporário',
  308: 'Redirecionamento permanente',
  400: 'Requisição inválida',
  401: 'Não autorizado',
  402: 'Pagamento necessário',
  403: 'Proibido',
  404: 'Não encontrado',
  405: 'Método não permitido',
  406: 'Não Aceitável',
  407: 'Autenticação de proxy necessária',
  408: 'Tempo de requisição esgotou',
  409: 'Conflito geral',
  410: 'Se foi',
  411: 'Comprimento necessário',
  412: 'Pré-condição falhou',
  413: 'Entidade de solicitação muito grande',
  414: 'Pedido-URI muito longo',
  415: 'Tipo de mídia não suportado',
  416: 'Solicitação de Faixa Não Satisfatória',
  417: 'Falha na expectativa',
  418: 'Eu sou um bule de chá',
  422: 'Entidade improcessável',
  423: 'Fechado',
  424: 'Falha de Dependência',
  425: 'Coleção não ordenada',
  426: 'Upgrade Obrigatório',
  450: 'Bloqueado pelo Controle de Pais do Windows',
  499: 'Cliente fechou Pedido',
  500: 'Erro interno do servidor',
  501: 'Não implementado',
  502: 'Gateway Ruim',
  503: 'Serviço indisponível',
  504: 'Tempo de Gateway esgotado',
  505: 'Versão HTTP não suportada',
};

const messageErrors: IMessageErrors = {
  'Network Errors': 'Erro de rede',
};

const timeoutErrorStatuses: number[] = [408, 503, 504];

export const normalizeError: INormalizeError = (error, genericMessage) => {
  const errorMessage = get(error, 'response.data.error');
  const status = get(error, 'response.status');

  const message = messageErrors[errorMessage] || statusErrors[status] || genericMessage;

  const isTimeout = timeoutErrorStatuses.includes(status);

  return { message, status, isTimeout };
};
