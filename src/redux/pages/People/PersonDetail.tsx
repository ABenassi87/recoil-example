import React, { useEffect } from 'react';
import { IPerson, ISpecies } from '../../../model';
import { useParams } from 'react-router-dom';
import { Badge, Box, Image, Center } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter, selectCharacter, selectIsLoadingCharacter } from '../../state/sw.slice';

const PersonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const personData: IPerson | undefined = useSelector(selectCharacter);
  const isLoading = useSelector(selectIsLoadingCharacter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacter(id));
  }, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!!personData && (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Center h='300px'>
            <Image src={personData.image} height={300} alt={personData.name} />
          </Center>

          <Box p='6'>
            <Box d='flex' alignItems='baseline'>
              {personData.species.map((specie: ISpecies) => {
                return (
                  <Badge borderRadius='full' px='2' colorScheme='teal' key={specie.id}>
                    {specie.name}
                  </Badge>
                );
              })}
              <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' ml='2'>
                {personData.gender}
              </Box>
            </Box>

            <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
              {personData.name}
            </Box>

            <Box>{personData.birthYear}</Box>
            <Box>{personData.homeworld?.name}</Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PersonDetails;
