import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { VALIDATION_RULES } from '@ui/form';
import type { SuggestFormTeamMembersProps } from '../config';
export const SuggestFormTeamMembers = ({
    fields,
    register,
    errors,
    addTeamMember,
    deleteTeamMember,
}: SuggestFormTeamMembersProps) => (
    <>
        {fields.length > 0 && <p>Участники команды</p>}
        {fields.map((field, index) => (
            <div className='suggestForm__member' key={field.id}>
                <Input
                    key={field.id}
                    error={errors.teamMembers?.[index]?.fullName?.message}
                    {...register(`teamMembers.${index}.fullName`, {
                        ...VALIDATION_RULES.requiredField,
                        ...VALIDATION_RULES.maxLength(50),
                    })}
                />
                <Button onClick={() => deleteTeamMember(index)}>-</Button>
            </div>
        ))}
        {errors.teamMembers?.message && <span className='suggestForm__error'>{errors.teamMembers.message}</span>}
        <Button type='button' extraCN={{ isOutline: true }} onClick={addTeamMember}>
            + добавить участников
        </Button>
    </>
);
