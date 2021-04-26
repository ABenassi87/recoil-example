import { IFilm, IPerson, IPlanet, IEntity } from './model';
import mapEntity, { IMapEntityOptions, extractIdFromEntityUrl } from './map-entity';

export class SwApi {
  apiUrl: string;

  constructor(url = 'https://swapi.dev/api') {
    this.apiUrl = url;
  }

  private async makeApiCall(apiPath: string): Promise<any> {
    const resp = await fetch(`${this.apiUrl}${apiPath}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!resp.ok) {
      throw new Error(`Error from api call ${apiPath}: status=${resp.status} ${await resp.text()}`);
    }

    return resp.json();
  }

  private async makeImagesApiCall(): Promise<any> {
    const apiPath = `https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json`;
    const resp = await fetch(apiPath, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!resp.ok) {
      throw new Error(`Error from api call ${apiPath}: status=${resp.status} ${await resp.text()}`);
    }

    return resp.json();
  }

  private async fetchArray<T extends IEntity>(apiPath: string, options?: IMapEntityOptions): Promise<T[]> {
    let data = await this.makeApiCall(apiPath);
    let results: any[] = data?.results ?? [];
    let nextUrl: string = data?.next ?? undefined;
    while (!!nextUrl) {
      const apiPath = nextUrl.replace(this.apiUrl, '');
      data = await this.makeApiCall(apiPath);
      results.push(...(data?.results ?? []));
      nextUrl = data.next;
    }

    if (!Array.isArray(results)) {
      throw new Error('The results is not a valid array');
    }

    return results.map<T>((result) => mapEntity<T>(result, options));
  }

  private async fetchOne<T extends IEntity>(apiPath: string): Promise<T> {
    const data = await this.makeApiCall(apiPath);
    return mapEntity<T>(data);
  }

  public async listAllFilms(): Promise<IFilm[]> {
    return this.fetchArray<IFilm>('/films');
  }

  public async listAllCharacters(): Promise<IPerson[]> {
    let people = await this.fetchArray<IPerson>('/people');
    const images: any[] = await this.makeImagesApiCall();
    const imageMap = images.reduce((map, imageData) => {
      map[imageData.name.toLowerCase()] = imageData.image;
      return map;
    }, {});
    people = people.map((person) => ({ ...person, image: imageMap[person.name.toLowerCase()] }));
    return people;
  }

  public async getPerson(id: number, expand?: ('films' | 'vehicles' | 'homeworld' | 'starships')[]): Promise<IPerson> {
    const data: IPerson = await this.makeApiCall(`/people/${id}/`);
    const person = mapEntity<IPerson>(data, {
      numberFields: ['mass'],
    });

    const filmsIds: number[] | undefined = data.films?.map(extractIdFromEntityUrl);
    const planetIds: number[] | undefined = [extractIdFromEntityUrl(data.homeworld)];

    if (expand) {
      if (expand.includes('films')) {
        const films: IFilm[] = filmsIds ? await Promise.all(filmsIds.map((id) => this.getFilm(id))) : [];

        person.films = films;
      }

      if (expand.includes('homeworld')) {
        const homeword: IPlanet[] = planetIds ? await Promise.all(planetIds.map((id) => this.getPlanet(id))) : [];

        person.homeworld = homeword[0];
      }
    }

    return person;
  }

  public async getPlanet(id: number, expand?: ('residents' | 'films')[]): Promise<IPlanet> {
    const data = await this.makeApiCall(`/planets/${id}/`);
    return mapEntity<IPlanet>(data, {
      numberFields: ['surface_water', 'diameter', 'rotation_period', 'orbital_period', 'population'],
    });
  }

  public async getFilm(id: number, expand?: ('planets' | 'characters' | 'starships' | 'species')[]): Promise<IFilm> {
    const data = await this.makeApiCall(`/films/${id}`);

    const film = mapEntity<IFilm>(data);
    const characterIds: number[] = data.characters.map(extractIdFromEntityUrl);
    const planetIds: number[] = data.planets.map(extractIdFromEntityUrl);

    if (expand) {
      if (expand.includes('characters')) {
        const characters: IPerson[] = await Promise.all(characterIds.map((id) => this.getPerson(id)));

        film.characters = characters;
      }

      if (expand.includes('planets')) {
        const planets: IPlanet[] = await Promise.all(planetIds.map((id) => this.getPlanet(id)));

        film.planets = planets;
      }
    }

    return film;
  }
}

const swAPI: SwApi = new SwApi();

export default swAPI;
