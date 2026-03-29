import {
    StyledLayoutRoot,
    StyledMainSlot,
    StyledSidebarSlot,
} from './DashboardLayout.style';
import { DashboardLayoutProps } from './DashboardLayout.types';

export const DashboardLayout = ({ main, sidebar }: DashboardLayoutProps) => (
    <StyledLayoutRoot>
        <StyledMainSlot>{main}</StyledMainSlot>
        <StyledSidebarSlot>{sidebar}</StyledSidebarSlot>
    </StyledLayoutRoot>
);
