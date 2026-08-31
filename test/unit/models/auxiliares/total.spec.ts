import { describe, expect, it } from 'vitest';
import { TotalSchema } from '../../../../src/models/auxiliares/total';

describe('TotalSchema', () => {
  it('aplica default 0 em valorIS quando ausente', () => {
    const result = TotalSchema.parse({});
    expect(result.valorIS).toBe(0);
  });

  it('aceita valorIS informado', () => {
    const result = TotalSchema.parse({ valorIS: 12.34 });
    expect(result.valorIS).toBe(12.34);
  });

  it('aceita infoComplementar nullable/optional', () => {
    expect(TotalSchema.parse({}).infoComplementar).toBeUndefined();
    expect(TotalSchema.parse({ infoComplementar: null }).infoComplementar).toBeNull();
    expect(TotalSchema.parse({ infoComplementar: 'obs' }).infoComplementar).toBe('obs');
  });
});
