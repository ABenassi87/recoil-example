import { selector, selectorFamily } from 'recoil';
import api from '../swapi';
import { IPerson } from '../model';

export const allCharactersQuery = selector<IPerson[]>({
  key: 'all-characters',
  get: async () => {
    try {
      const characters: IPerson[] = await api.listAllCharacters();

      return characters;
    } catch (e) {
      return [];
    }
  },
});

export const charactersFilteredQuery = selectorFamily<IPerson[], string>({
  key: 'filtered-characters',
  get: (searchTerm: string) => async ({ get }) => {
    try {
      const characters: IPerson[] = get(allCharactersQuery);
      if (!searchTerm) {
        return characters;
      }

      return characters.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));
    } catch (e) {
      return [];
    }
  },
});

export const characterQuery = selectorFamily<IPerson | undefined, number>({
  key: 'character',
  get: (id: number) => async ({ get }) => {
    try {
      let character: IPerson = await api.getPerson(id, ['films', 'vehicles', 'homeworld', 'starships']);
      const allCharacters: IPerson[] = get(allCharactersQuery);
      const image = allCharacters.find((char) => char.id === id)?.image;
      character = { ...character, image };

      return character;
    } catch (e) {
      return undefined;
    }
  },
});
