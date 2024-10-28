import fetch from 'node-fetch';

const lithicApiKey = process.env.LITHIC_API_KEY;
const lithicBaseUrl = 'https://sandbox.lithic.com/v1/cards'; // Use sandbox environment

export class LithicCardModel {
  static async createCard() {
    try {
      const response = await fetch(lithicBaseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lithicApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'UNLOCKED' }) // Request a dummy card
      });

      if (!response.ok) {
        throw new Error(`Error creating card: ${response.statusText}`);
      }

      const newCard = await response.json();
      return newCard;
    } catch (error) {
      throw new Error(`Error creating card: ${(error as Error).message}`);
    }
  }

  static async getCard(uuid: string) {
    try {
      const response = await fetch(`${lithicBaseUrl}/${uuid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${lithicApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Card not found: ${response.statusText}`);
      }

      const card = await response.json();
      return card;
    } catch (error) {
      throw new Error(`Error fetching card: ${(error as Error).message}`);
    }
  }

  static async getAllCards() {
    try {
      const response = await fetch(lithicBaseUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${lithicApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching cards: ${response.statusText}`);
      }

      const allCards = await response.json();
      return allCards;
    } catch (error) {
      throw new Error(`Error fetching cards: ${(error as Error).message}`);
    }
  }

  static async deleteCard(uuid: string) {
    try {
      const response = await fetch(`${lithicBaseUrl}/${uuid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${lithicApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Card not found: ${response.statusText}`);
      }

      return { message: 'Card deleted' };
    } catch (error) {
      throw new Error(`Error deleting card: ${(error as Error).message}`);
    }
  }
}

export default LithicCardModel;