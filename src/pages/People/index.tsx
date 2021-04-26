import React from 'react';
import { Loadable, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { IPerson } from '../../model';
import CharacterSummaryCard from '../../components/CharacterSummaryCard';
import { Grid, Input } from '@chakra-ui/react';
import { charactersFilteredQuery } from '../../state/api';
import { characterFilter } from '../../state';

const People = () => {
  const [searchTerm, setSearchTerm] = useRecoilState<string>(characterFilter);
  const characters: Loadable<IPerson[]> = useRecoilValueLoadable<IPerson[]>(charactersFilteredQuery(searchTerm));

  const isLoading = characters.state === 'loading';

  const data = !isLoading
    ? characters.getValue().map((person: IPerson) => <CharacterSummaryCard key={person.id} character={person} />)
    : [];

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    setSearchTerm(value);
  };

  return (
    <>
      <Input value={searchTerm} onChange={onInputChange} />
      {isLoading && <div>Loading...</div>}
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {data}
      </Grid>
    </>
  );
};

export default People;
