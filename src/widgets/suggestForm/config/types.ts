import type { IComponent } from '@shared/types/component.ts';

export interface ISuggestForm extends IComponent {
    id?: string;
}

export type SuggestParticipants = 'alone' | 'team';

export type SuggestTeamMember = {
    fullName: string;
};

export type SuggestFormData = {
    name: string;
    suggestion: string;
    duration: string;
    requirements: string;
    participants: SuggestParticipants | undefined;
    teamMembers: SuggestTeamMember[];
};

export interface SuggestResponse {
    success: boolean;
}

export interface SuggestFormTeamMembersProps {
    fields: import('react-hook-form').FieldArrayWithId<SuggestFormData, 'teamMembers'>[];
    register: import('react-hook-form').UseFormRegister<SuggestFormData>;
    errors: import('react-hook-form').FieldErrors<SuggestFormData>;
    addTeamMember: () => void;
    deleteTeamMember: (index: number) => void;
}
