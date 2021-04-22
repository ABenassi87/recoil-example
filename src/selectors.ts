import { RecoilState, RecoilValueReadOnly, selector } from 'recoil';
import {
  characterMapState,
  moviesMapState,
  selectedCharacterIdState,
  selectedMovieIdState,
  selectedStarshipIdState,
  selectedVehicleIdState,
  starshipsMapState,
  vehiclesMapState,
} from './atoms';
import { IEntity, IFilm, IPerson, IStarship, IVehicle } from './model';

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
