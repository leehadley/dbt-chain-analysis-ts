const STORAGE_KEY = 'dbt_chain_analyses_v1';
const CURRENT_ACTIVE_KEY = 'dbt_current_active_id_v1';

export const getSavedChains = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading saved chains:', err);
    return [];
  }
};

export const saveChainToStorage = (chain) => {
  try {
    const chains = getSavedChains();
    const existingIndex = chains.findIndex((c) => c.id === chain.id);
    const updatedChain = { ...chain, updatedAt: new Date().toISOString() };
    
    if (existingIndex >= 0) {
      chains[existingIndex] = updatedChain;
    } else {
      chains.unshift(updatedChain);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chains));
    localStorage.setItem(CURRENT_ACTIVE_KEY, chain.id);
    return updatedChain;
  } catch (err) {
    console.error('Error saving chain to storage:', err);
    return chain;
  }
};

export const deleteChainFromStorage = (id) => {
  try {
    const chains = getSavedChains().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chains));
  } catch (err) {
    console.error('Error deleting chain from storage:', err);
  }
};

export const getActiveChainId = () => {
  return localStorage.getItem(CURRENT_ACTIVE_KEY) || null;
};

export const generateId = (prefix = 'chain') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
};

export const downloadJSON = (data, filename = 'dbt-chain-analysis.json') => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
