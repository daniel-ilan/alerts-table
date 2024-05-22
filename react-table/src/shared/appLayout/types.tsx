import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface AppLayoutProps {
    children: React.ReactNode;
}

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }