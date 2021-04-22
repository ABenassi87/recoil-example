import React from 'react';
import { PageNavItem } from '../model';
import PageCard from '../components/PageCard';
import { Route, Switch } from 'react-router-dom';
import People from './People';
import Movies from './Movies';
import Starships from './Starships';
import Vehicles from './Vehicles';

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

const generateCards = () => {
  return navItems.map((item) => <PageCard key={item.id} navItem={item} />);
};

const Home: React.FC = () => {
  return (
    <div>
      {generateCards()}
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path='/characters' exact>
          <People />
        </Route>
        <Route path='/movies' exact>
          <Movies />
        </Route>
        <Route path='/starships' exact>
          <Starships />
        </Route>
        <Route path='/vehicles' exact>
          <Vehicles />
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
