import { useMemo } from 'react';
import { calcFacture } from '../utils/calculations';

export const useFactureCalcul = (lines, methode, remise_globale, categories) => {
  return useMemo(() =>
    calcFacture(lines, methode, remise_globale, categories),
    [lines, methode, remise_globale, categories]
  );
};
