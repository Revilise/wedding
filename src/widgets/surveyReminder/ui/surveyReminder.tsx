"use client";

import { type FC, useEffect, useState } from 'react';

import { POPOVER } from "@shared/const";
import { Button } from "@ui/button";
import { DialogBox } from "@ui/dialogBox";
import PopoverObserver from '@ui/popover/model/observer.ts';

import type { ISurveyReminder } from "../config/types";
import { useFeedback } from '@widgets/feedbackForm/lib/useFeedback.tsx';

export const SurveyReminder: FC<ISurveyReminder> = ({
    id,
    extraCN,
    utilCN,
    extraAttrs,
    style,
}) => {
    const { isFeedbackSent } = useFeedback();

    const [dismissed, setDismissed] = useState(false);
    const [isSurveyPopoverOpen, setIsSurveyPopoverOpen] = useState(false);

    useEffect(() => {
        PopoverObserver.subscribe(id, setIsSurveyPopoverOpen);
        return () => PopoverObserver.unsubscribe(id, setIsSurveyPopoverOpen);
    }, [id]);

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
                        type={"button"}
                        extraCN={{ isDialogGhost: true }}
                        extraAttrs={{ [POPOVER.SHOW]: id }}
                        onClick={() => setDismissed(true)}
                    >
                        Анкета
                    </Button>
                    <Button type={"button"} extraCN={{ isDialogOutline: true }} onClick={() => setDismissed(true)}>
                        Уже да
                    </Button>
                </>
            }
        >
            <p className={"text"}>Вы уже заполнили анкету?</p>
        </DialogBox>
    );
};
