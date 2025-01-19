import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './components/Layout/Loader'; // Import your Loader component

const LoaderProvider = () => {
  const { isLoading, message } = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return <Loader message={message} />;
};

export default LoaderProvider;
