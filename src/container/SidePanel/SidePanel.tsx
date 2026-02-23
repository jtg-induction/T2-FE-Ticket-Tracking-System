import { Illustration, Logo, SidePanelRoot } from './sidePanel.style';

export const SidePanel = () => (
    <SidePanelRoot>
        <Illustration
            component={'img'}
            src="/images/project-illustration.webp"
            alt=""
        />
        <Logo component={'img'} src="/src/assets/logo/logo-light.webp" alt="" />
    </SidePanelRoot>
);
