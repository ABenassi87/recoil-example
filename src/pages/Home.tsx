import React from 'react';
import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageNavItem } from '../model';
import { Route, Switch } from 'react-router-dom';
import People from './People';
import PersonDetails from './People/PersonDetail';
import Movies from './Movies';
import Starships from './Starships';
import Vehicles from './Vehicles';
import PageTab from '../components/PageTab';

const navItems: PageNavItem[] = [
  {
    id: 1,
    label: 'Characters',
    url: '/characters',
  },
  {
    id: 2,
    label: 'Movies',
    url: '/movies',
  },
  {
    id: 3,
    label: 'Starships',
    url: '/starships',
  },
  {
    id: 4,
    label: 'Vehicles',
    url: '/vehicles',
  },
];

const generateTabs = () => {
  return navItems.map((item) => <PageTab key={item.id} navItem={item} />);
};

const Home: React.FC = () => {
  return (
    <Tabs>
      <TabList>
        {generateTabs()}
      </TabList>
      <Switch>
        <TabPanels>
          <TabPanel>
            <Route path='/characters' exact>
              <People />
            </Route>
            <Route path='/characters/:id' exact>
              <PersonDetails />
            </Route>
          </TabPanel>
          <TabPanel>
            <Route path='/movies' exact>
              <Movies />
            </Route>
          </TabPanel>
          <TabPanel>
            <Route path='/starships' exact>
              <Starships />
            </Route>
          </TabPanel>
          <TabPanel>
            <Route path='/vehicles' exact>
              <Vehicles />
            </Route>
          </TabPanel>
        </TabPanels>
      </Switch>
    </Tabs>
  );
};

export default Home;
