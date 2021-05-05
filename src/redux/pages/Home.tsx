import React from 'react';
import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageNavItem } from '../../model';
import { Route, Switch } from 'react-router-dom';
import People from './People';
import PersonDetails from './People/PersonDetail';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import PageTab from '../../components/PageTab';

const navItems: PageNavItem[] = [
  {
    id: 1,
    label: 'Characters',
    url: '/redux/characters',
  },
];

const generateTabs = () => {
  return navItems.map((item) => <PageTab key={item.id} navItem={item} />);
};

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <Tabs>
        <TabList>{generateTabs()}</TabList>
        <Switch>
          <TabPanels>
            <TabPanel>
              <Route path='/redux/characters/:id' exact>
                <PersonDetails />
              </Route>
              <Route path='/redux/characters' exact>
                <People />
              </Route>
            </TabPanel>
          </TabPanels>
        </Switch>
      </Tabs>
    </Provider>
  );
};

export default Home;
