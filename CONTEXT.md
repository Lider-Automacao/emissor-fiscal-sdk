# Emissor Fiscal SDK

SDK TypeScript cliente da Emissor Fiscal API (Delphi), para emissão de NFe, NFCe e NFSe.

## Language

**Imposto Seletivo (IS)**:
Tributo novo da reforma tributária (Grupo UB, NT 2025.002-RTC), aplicado por CST e classificação próprios — não reaproveita CST/classificação do IBS/CBS. Pode ser cobrado ad valorem (percentual sobre o valor) ou ad rem (valor fixo por unidade).
_Avoid_: "novo imposto", "seletivo" sem qualificar

**Percentual de Redução (interpretação)**:
O campo `percentualReducao` de um item tem duas leituras possíveis, escolhida por `interpretacaoPercentualReducao`: *PercentualAproveitado* (quanto da base de cálculo sobra após a redução) ou *PercentualReduzido* (quanto foi retirado da base). Afeta o cálculo de desoneração do ICMS.
_Avoid_: falar em "redução da base" sem especificar o sentido

**Responsável Técnico**:
Quem gerou o XML da NFe/NFCe (grupo infRespTec) — distinto do Emitente, que é o dono da nota. Configurável por integrador; sem valor informado, usa o fallback histórico da Líder Automação.
_Avoid_: confundir com Emitente

**Carta de Correção (CC-e)**:
Evento pós-emissão da NF-e para corrigir erro que não altera valores, tributos, datas ou as partes envolvidas (Convênio S/N, art. 7º §1º-A). Texto de 15 a 1000 caracteres; até 20 eventos de CC-e por NF-e.
_Avoid_: "correção da nota", "editar NF-e"
