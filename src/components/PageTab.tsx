import React from 'react';
import { Tab } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PageNavItem } from '../model';

interface Props {
  navItem: PageNavItem;
}

const PageTab: React.FunctionComponent<Props> = ({ navItem }) => {
  const { url, label } = navItem;
  return (
    // @ts-ignore
    <Link to={url}><Tab>{label}</Tab></Link>
  );
}

export default PageTab;
