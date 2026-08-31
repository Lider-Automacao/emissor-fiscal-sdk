// Campos crus da resposta de erro da API (ver EHorseException.ToJSONObject /
// TCustomError.ToJSONObject no lado Delphi). `unit` é o nome da unit/classe
// Delphi que lançou o erro - serve só pra rastreio/debug, nunca é mensagem
// pro usuário final.
export class EmissorApiError {

  constructor(public apiResponse: any) { }

  get error(): string | undefined {
    return this.apiResponse?.error;
  }

  get title(): string | undefined {
    return this.apiResponse?.title;
  }

  get unit(): string | undefined {
    return this.apiResponse?.unit;
  }

  get hint(): string | undefined {
    return this.apiResponse?.hint;
  }

  get code(): number | undefined {
    return this.apiResponse?.code;
  }

  get type(): string | undefined {
    return this.apiResponse?.type;
  }

  get detail(): string | undefined {
    return this.apiResponse?.detail;
  }

  // Mensagem legível: `error` é o campo que o ErrorClassifier (server) garante
  // populado (Error > Detail > Title, nunca vazio) no shape do EHorseException.
  // `title`/`message` cobrem payload fora desse shape (ex.: erro genérico do
  // Axios/proxy, sem passar pelo Horse). `unit` é last-resort - só serve como
  // texto quando nem isso existe.
  get message(): string | null {
    const { error, title, message, unit } = this.apiResponse ?? {};
    return error ?? title ?? message ?? unit ?? null;
  }

  get description(): string | undefined {
    const { detail } = this.apiResponse;

    if (typeof detail !== 'string') {
      return undefined;
    }

    try {
      const errorData = JSON.parse(detail);
      if (!Array.isArray(errorData)) {
        return detail;
      }
      const formattedMessages: string[] = [];
      const processErrors = (errors: any[], currentPath: string = '') => {
        if (!Array.isArray(errors)) return;

        for (const item of errors) {
          if (item.field && item.error && typeof item.error === 'string') {
            const fullPath = currentPath ? `${currentPath}.${item.field}` : item.field;
            formattedMessages.push(`${fullPath}: ${item.error}`);
          }
          else if (item.field && Array.isArray(item.error)) {
            const newPath = currentPath ? `${currentPath}.${item.field}` : item.field;
            processErrors(item.error, newPath);
          }
          else if (Array.isArray(item)) {
            processErrors(item, currentPath);
          }
          else if (item.message && item.field) {
            const fullPath = currentPath ? `${currentPath}.${item.field}` : item.field;
            formattedMessages.push(`${fullPath}: ${item.message}`);
          }
        }
      };

      processErrors(errorData);

      if (formattedMessages.length > 0) {
        return `Erros de Validação Encontrados:\n- ${formattedMessages.join('\n- ')}`;
      }

    } catch (e) {
      return detail;
    }

    return detail;
  }

}