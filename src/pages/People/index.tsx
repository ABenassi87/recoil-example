import React from 'react';
import { Loadable, useRecoilValueLoadable } from 'recoil';
import { IPerson } from '../../model';
import CharacterSummaryCard from '../../components/CharacterSummaryCard';
import { Grid } from '@chakra-ui/react';
import { allCharactersQuery } from '../../state/api';

const People = () => {
  const characters: Loadable<IPerson[]> = useRecoilValueLoadable<IPerson[]>(allCharactersQuery);

  const isLoading = characters.state === 'loading';

  const data = !isLoading
    ? characters.getValue().map((person: IPerson) => <CharacterSummaryCard key={person.id} character={person} />)
    : [];

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {data}
      </Grid>
    </>
  );
};

export default People;
