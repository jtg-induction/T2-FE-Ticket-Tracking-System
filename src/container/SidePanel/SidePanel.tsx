import logoLight from '@assets/logo/logo-light.webp';

import {
    StyledBrandingSection,
    StyledIllustration,
    StyledLogo,
} from './SidePanel.style';

export const SidePanel = () => (
    <StyledBrandingSection component="aside">
        <StyledIllustration
            component="img"
            src="/images/project-illustration.webp"
            alt="Project illustration"
        />
        <StyledLogo component="img" src={logoLight} alt="Logo" />
    </StyledBrandingSection>
);
