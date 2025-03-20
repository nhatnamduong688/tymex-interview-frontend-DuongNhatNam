import { Grid } from 'antd'

export const useBreakpoint = () => {
  const breakpoints = Grid.useBreakpoint()

  return {
    ...breakpoints,
    isCollapsed: !breakpoints.xl,
  }
} 