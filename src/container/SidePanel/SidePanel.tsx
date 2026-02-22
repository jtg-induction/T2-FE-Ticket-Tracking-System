import { Illustration, Logo, SidePanelRoot } from './sidePanel.style';

export const SidePanel = () => (
    <SidePanelRoot>
        <Illustration
            component={'img'}
            src="/images/project-illustration.webp"
            alt=""
        />
        <Logo component={'img'} src="/logo/logo-light.png" alt="" />
    </SidePanelRoot>
);
