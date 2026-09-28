'use client';

import { type FC, useState } from 'react';

import { POPOVER } from '@shared/const';
import { Button } from '@ui/button';
import { DialogBox } from '@ui/dialogBox';
import { usePopoverState } from '@ui/popover';

import type { ISurveyReminder } from '../config/types';
import { useFeedback } from '@entities/feedback';

export const SurveyReminder: FC<ISurveyReminder> = ({ id, extraCN, utilCN, extraAttrs, style }) => {
    const { isFeedbackSent } = useFeedback();

    const [dismissed, setDismissed] = useState(false);
    const isSurveyPopoverOpen = usePopoverState(id);

    const visible = !isFeedbackSent && !isSurveyPopoverOpen && !dismissed;

    return (
        <DialogBox
            isOpen={visible}
            extraCN={extraCN}
            utilCN={utilCN}
            extraAttrs={extraAttrs}
            style={style}
            actions={
                <>
                    <Button
                        type={'button'}
                        extraCN={{ isRoundedGhost: true }}
                        extraAttrs={{ [POPOVER.SHOW]: id }}
                        onClick={() => setDismissed(true)}
                    >
                        Анкета
                    </Button>
                    <Button type={'button'} extraCN={{ isRoundedOutline: true }} onClick={() => setDismissed(true)}>
                        Уже да
                    </Button>
                </>
            }
        >
            <p className={'text'}>Вы уже заполнили анкету?</p>
        </DialogBox>
    );
};
