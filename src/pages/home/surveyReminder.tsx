'use client';

import { useState } from 'react';

import { POPOVER } from '@shared/const';
import { Button } from '@ui/button';
import { DialogBox } from '@ui/dialogBox';
import { feedbackSection } from './store.tsx';

type SurveyReminderProps = {
    isOpen?: boolean;
};

export const SurveyReminder = ({ isOpen = true }: SurveyReminderProps) => {
    const [dismissed, setDismissed] = useState(false);
    const visible = isOpen && !dismissed;

    return (
        <DialogBox
            isOpen={visible}
            actions={
                <>
                    <Button
                        type={'button'}
                        extraCN={{ isDialogGhost: true }}
                        extraAttrs={{ [POPOVER.SHOW]: feedbackSection.popoverId }}
                        onClick={() => setDismissed(true)}
                    >
                        Анкета
                    </Button>
                    <Button type={'button'} extraCN={{ isDialogOutline: true }} onClick={() => setDismissed(true)}>
                        Уже да
                    </Button>
                </>
            }
        >
            <p className={'text'}>Вы уже заполнили анкету?</p>
        </DialogBox>
    );
};
