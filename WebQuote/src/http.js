export async function getQuoteData() {
    try {
      const response = await fetch("http://localhost:3000/api/orcamento");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return [];
    }
  }