import React from 'react';
import { Box, Stack, Text, Button, Image, Center } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { IPerson } from '../model';

interface Props {
  character: IPerson;
}

const CharacterSummaryCard: React.FunctionComponent<Props> = ({ character }) => {
  const history = useHistory();
  const handleClick = () => history.push(`/characters/${character.id}`);

  return (
    <Box p={4} display={{ md: 'flex' }} maxWidth='32rem' borderWidth={1} margin={2}>
      <Center>
        <Stack align={{ base: 'center', md: 'stretch' }} textAlign={{ base: 'center', md: 'left' }} mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Image align={'center'} src={character.image} height={150} alt={character.name} />
          <Text fontWeight='bold' textTransform='uppercase' fontSize='lg' letterSpacing='wide' color='teal.600' align='center'>
            {character.name}
          </Text>
          <Button maxWidth='100px' my={2} onClick={() => handleClick()}>
            View Details
          </Button>
        </Stack>
      </Center>
    </Box>
  );
};

export default CharacterSummaryCard;
