import projectIllustration from '@assets/illustrations/project-illustration.webp';
import logoLight from '@assets/logo/logo-light.webp';

import {
    StyledBrandingSection,
    StyledIllustration,
    StyledLogo,
} from './HeroSection.style';

export const HeroSection = () => (
    <StyledBrandingSection component="aside">
        <StyledIllustration
            component="img"
            src={projectIllustration}
            alt="Project illustration"
        />
        <StyledLogo component="img" src={logoLight} alt="Logo" />
    </StyledBrandingSection>
);
