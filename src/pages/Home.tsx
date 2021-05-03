import React, { useEffect } from 'react';
import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageNavItem } from '../model';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import People from './People';
import PersonDetails from './People/PersonDetail';
import PageTab from '../components/PageTab';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';

const navItems: PageNavItem[] = [
  {
    id: 1,
    label: 'Characters',
    url: '/characters',
  },
];

const generateTabs = () => {
  return navItems.map((item) => <PageTab key={item.id} navItem={item} />);
};

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

const Home: React.FunctionComponent = () => {
  return (
    <RecoilRoot>
      <Router>
        <DebugObserver />
        <Tabs>
          <TabList>{generateTabs()}</TabList>
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
            </TabPanels>
          </Switch>
        </Tabs>
      </Router>
    </RecoilRoot>
  );
};

export default Home;
