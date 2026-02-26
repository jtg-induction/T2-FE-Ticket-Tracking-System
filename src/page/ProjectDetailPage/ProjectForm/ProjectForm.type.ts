import { Project, ProjectRequest } from '@type';

export type ProjectFormProps = {
    isNew: boolean;
    isEditing: boolean;
    project?: Project;
    tempProject: ProjectRequest;
    isInputDisabled: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
