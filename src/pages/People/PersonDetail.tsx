import React, {useEffect} from 'react';
import { IPerson, ISpecies } from '../../model';
import { useParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { selectedCharacterState } from '../../selectors';
import { selectedCharacterIdState } from '../../atoms';
import { Box, Image, Badge } from '@chakra-ui/react';


const PersonDetails: React.FC = () => {
  const { id } = useParams<{ id: string;}>();
  const setPersonId = useSetRecoilState(selectedCharacterIdState);
  const person = useRecoilValue<IPerson | undefined>(selectedCharacterState);

  useEffect(() => {
    setPersonId(id);
  }, [id])

  return (!!person ?
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src={person.image} alt={person.name} />

        <Box p='6'>
          <Box d='flex' alignItems='baseline'>
            {
              person.species.map((specie: ISpecies) => {
                return (<Badge borderRadius='full' px='2' colorScheme='teal'>
                  specie.name
                </Badge>);
              })
            }
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {person.gender}
            </Box>
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            {person.name}
          </Box>

          <Box>
            {person.homeworld}
          </Box>
        </Box>
      </Box> : <div>Empty</div>
  );
}

export default PersonDetails;