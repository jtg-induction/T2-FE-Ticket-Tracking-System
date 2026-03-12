import logoLight from '@assets/logo/logo-light.webp';

import { Illustration, Logo, SidePanelRoot } from './SidePanel.style';

export const SidePanel = () => (
    <SidePanelRoot>
        <Illustration
            component="img"
            src="/images/project-illustration.webp"
            alt="Project illustration"
        />
        <Logo component="img" src={logoLight} alt="Logo" />
    </SidePanelRoot>
);
