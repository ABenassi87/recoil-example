import React, { useEffect, useState } from 'react';
import api from '../../swapi';
import { useRecoilState } from 'recoil';
import { characterMapState } from '../../atoms';
import { IPerson } from '../../model';
import { arrayToMap } from '../../utils';
import CharacterSummaryCard from '../../components/CharacterSummaryCard';

const People: React.FC = () => {
  const [map, setMap] = useRecoilState(characterMapState);

  const getPeople = async () => {
    try {
      if (!map.size) {
        const people: IPerson[] = await api.listAllPeople();
        setMap(arrayToMap(people));
      }
    } catch (e) {
      setMap(new Map());
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div>
      {Array.from(map.values()).map((person: IPerson) => (
        <CharacterSummaryCard key={person.id} character={person} />
      ))}
    </div>
  );
};

export default People;
