import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { IPerson } from '../../model';
import api from '../../swapi';

export interface SWState {
  characterFilter: string;
  characters: IPerson[];
  filteredCharacters: IPerson[];
  selectedCharacter: IPerson | undefined;
  loading: boolean;
  loadingCharacter: boolean;
}

const initialState: SWState = {
  characterFilter: '',
  characters: [],
  filteredCharacters: [],
  selectedCharacter: undefined,
  loading: false,
  loadingCharacter: false,
};

// ASYNC ACTIONS
export const fetchAllCharacters = createAsyncThunk('sw/fetchAllCharacters', async () => {
  try {
    const characters: IPerson[] = await api.listAllCharacters();

    return characters;
  } catch (e) {
    return [];
  }
});

export const fetchCharacter = createAsyncThunk('sw/fetchCharacter', async (id: string) => {
  try {
    let character: IPerson = await api.getPerson(parseInt(id), ['films', 'vehicles', 'homeworld', 'starships']);
    const images: any[] = await api.makeImagesApiCall();
    const image = images.find((img) => img.name.toLowerCase() === character.name.toLowerCase());
    character.image = image.image;

    return character;
  } catch (e) {
    return undefined;
  }
});

const swSlice = createSlice({
  name: 'sw',
  initialState,
  reducers: {
    filterCharacters: (state, action) => {
      const searchTerm = action.payload;
      state.characterFilter = searchTerm;
      state.filteredCharacters = state.characters.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },
  },
  extraReducers: {
    [fetchAllCharacters.fulfilled.type]: (state, action) => {
      console.log(action)
      state.characters.push(...action.payload);
      state.filteredCharacters.push(...action.payload);
      state.loading = false;
    },
    [fetchAllCharacters.pending.type]: (state) => {
      state.characters = initialState.characters;
      state.filteredCharacters = initialState.filteredCharacters;
      state.characterFilter = initialState.characterFilter;
      state.selectedCharacter = initialState.selectedCharacter;
      state.loading = true;
    },
    [fetchAllCharacters.rejected.type]: (state) => {
      state.loading = false;
    },
    [fetchCharacter.fulfilled.type]: (state, action) => {
      state.selectedCharacter = action.payload;
      state.loadingCharacter = false;
    },
    [fetchCharacter.pending.type]: (state) => {
      state.selectedCharacter = undefined;
      state.loadingCharacter = true;
    },
    [fetchCharacter.rejected.type]: (state) => {
      state.loadingCharacter = false;
    },
  },
});

// ACTIONS
export const { filterCharacters } = swSlice.actions;

// SELECTORS
export const selectSW = (state: RootState) => state.sw;
export const selectFilteredCharacters = createSelector(selectSW, (swState: SWState) => swState.filteredCharacters);
export const selectIsLoadingCharacters = createSelector(selectSW, (swState: SWState) => swState.loading);
export const selectIsLoadingCharacter = createSelector(selectSW, (swState: SWState) => swState.loadingCharacter);
export const selectSearchTerm = createSelector(selectSW, (swState: SWState) => swState.characterFilter);
export const selectCharacter = createSelector(selectSW, (swState: SWState) => swState.selectedCharacter);

// REDUCER
export default swSlice.reducer;
