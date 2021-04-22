import { atom } from 'recoil';
import { IFilm, IPerson, IStarship, IVehicle } from './model';

export const characterMapState = atom<Map<string, IPerson>>({
  key: 'characterMapState',
  default: new Map<string, IPerson>(),
});

export const selectedCharacterIdState = atom<string | undefined>({
  key: 'selectedCharacterIdState',
  default: undefined,
});

export const moviesMapState = atom<Map<string, IFilm>>({
  key: 'moviesMapState',
  default: new Map<string, IFilm>(),
});

export const selectedMovieIdState = atom<string | undefined>({
  key: 'selectedMovieIdState',
  default: undefined,
});

export const starshipsMapState = atom<Map<string, IStarship>>({
  key: 'starshipsMapState',
  default: new Map<string, IStarship>(),
});

export const selectedStarshipIdState = atom<string | undefined>({
  key: 'selectedStarshipIdState',
  default: undefined,
});

export const vehiclesMapState = atom<Map<string, IVehicle>>({
  key: 'vehiclesMapState',
  default: new Map<string, IVehicle>(),
});

export const selectedVehicleIdState = atom<string | undefined>({
  key: 'selectedVehicleIdState',
  default: undefined,
});
