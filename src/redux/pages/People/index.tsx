import React, { useEffect } from 'react';
import { IPerson } from '../../../model';
import CharacterSummaryCard from '../../../components/CharacterSummaryCard';
import { Grid, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCharacters,
  filterCharacters,
  selectFilteredCharacters,
  selectIsLoadingCharacters,
  selectSearchTerm,
} from '../../state/sw.slice';

const People = () => {
  const isLoading: boolean = useSelector(selectIsLoadingCharacters);
  const filteredCharacters: IPerson[] = useSelector(selectFilteredCharacters);
  const searchTerm: string = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!filteredCharacters.length && !searchTerm?.length) {
      dispatch(fetchAllCharacters());
    }
  }, []);

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    dispatch(filterCharacters(value));
  };

  return (
    <>
      <Input value={searchTerm} onChange={onInputChange} />
      {isLoading && <div>Loading...</div>}
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {!isLoading && filteredCharacters?.map((person: IPerson) => <CharacterSummaryCard key={person.id} character={person} />)}
      </Grid>
    </>
  );
};

export default People;
