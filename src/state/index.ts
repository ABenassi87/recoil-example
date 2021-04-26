import { atom, RecoilState, RecoilValueReadOnly, selector } from 'recoil';
import { IFilm, IPerson, IStarship, IVehicle } from '../model';

export const characterFilter = atom<string>({ key: 'characterFilter', default: '' });

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

export const selectedCharacterState = getSelectedState<IPerson>('selectedCharacterState', characterMapState, selectedCharacterIdState);
export const selectedMovieState = getSelectedState<IFilm>('selectedMovieState', moviesMapState, selectedMovieIdState);
export const selectedStarshipState = getSelectedState<IStarship>('selectedStarshipState', starshipsMapState, selectedStarshipIdState);
export const selectedVehicleState = getSelectedState<IVehicle>('selectedVehicleState', vehiclesMapState, selectedVehicleIdState);

function getSelectedState<T>(
  key: string,
  mapState: RecoilState<Map<string, T>>,
  idState: RecoilState<string | undefined>,
): RecoilValueReadOnly<T | undefined> {
  return selector<T | undefined>({
    key,
    get: ({ get }) => {
      const id = get(idState);
      const map = get(mapState);

      if (!!id) {
        return map.get(id);
      }

      return undefined;
    },
  });
}

function getArrayState<T>(key: string, mapState: RecoilState<Map<string, T>>): RecoilValueReadOnly<T[] | undefined> {
  return selector<T[] | undefined>({
    key,
    get: ({ get }) => {
      const map = get(mapState);

      return Array.from(map.values());
    },
  });
}
