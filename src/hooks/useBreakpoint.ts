import { useEffect, useState } from 'react';
import { Grid } from 'antd';

const { useBreakpoint: useAntBreakpoint } = Grid;

export const useBreakpoint = () => {
  const screens = useAntBreakpoint();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Check if screen size is below lg breakpoint (992px)
    setIsCollapsed(!screens.lg);
  }, [screens]);

  return {
    screens,
    isCollapsed,
  };
}; 