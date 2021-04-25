import React from 'react';
import { IPerson, ISpecies } from '../../model';
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { Badge, Box, Image } from '@chakra-ui/react';
import { characterQuery } from '../../state/api';

const PersonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const person = useRecoilValueLoadable<IPerson | undefined>(characterQuery(parseInt(id)));

  const isLoading = person.state === 'loading';

  const personData: IPerson | undefined = person.getValue();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!!personData && (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Image src={personData.image} alt={personData.name} />

          <Box p='6'>
            <Box d='flex' alignItems='baseline'>
              {personData.species.map((specie: ISpecies) => {
                return (
                  <Badge borderRadius='full' px='2' colorScheme='teal'>
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

            <Box>{personData.homeworld?.name}</Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PersonDetails;
