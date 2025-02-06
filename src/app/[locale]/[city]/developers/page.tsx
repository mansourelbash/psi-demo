import React from 'react';
import HeroDeveloper from '@/components/app/HeroDeveloper';
// import { getDevelopers } from '@/services/developers';

interface DevelopersPageProps {
  searchParams: {
    page?: string;
    size?: string;
  };
}

const DevelopersPage = async () => {


  return (
    <div>
      <HeroDeveloper />
    </div>
  );
};

export default DevelopersPage;