import logoLight from '@assets/logo/logo-light.webp';

import { Illustration, Logo, SidePanelRoot } from './sidePanel.style';

export const SidePanel = () => (
    <SidePanelRoot>
        <Illustration
            component={'img'}
            src="/images/project-illustration.webp"
            alt=""
        />
        <Logo component={'img'} src={logoLight} alt="Logo" />
    </SidePanelRoot>
);
