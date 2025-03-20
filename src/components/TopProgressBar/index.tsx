import { useEffect } from 'react';
import NProgress from 'nprogress';
import { useLocation } from 'react-router-dom';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
});

export const TopProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, [location]);

  return null;
};

export default TopProgressBar; 