'use client';

import React, { memo, useEffect, useState } from 'react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import type { Artist } from '@/types/Spotify.dto';
import { API_ROUTES } from '@/utils/routes';

interface UserDescriptionProps {
  artists: Artist[];
}

const UserDescription = ({ artists }: UserDescriptionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDescription, setUserDescription] = useState('');
  useEffect(() => {
    fetch(
      API_ROUTES.user_description,
      {
        method: 'POST',
        body: JSON.stringify(artists)
      }
    )
      .then((res) => res.json())
      .then((data: string) => setUserDescription(data))
      .finally(() => setIsLoading(false));
  // * Note: only call one time
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Skeleton count={5} />
      </SkeletonTheme>
    );
  }

  return (
    <h3>
      { userDescription }
    </h3>
  );
};

UserDescription.propTypes = {

};

export default memo(UserDescription);
