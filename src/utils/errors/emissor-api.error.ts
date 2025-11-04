export class EmissorApiError {

  constructor(public apiResponse: any) { }

  get message(): string | null {
    const { unit, message, error } = this.apiResponse;
    return unit ?? message ?? error;
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