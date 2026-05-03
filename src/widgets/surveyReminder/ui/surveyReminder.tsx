"use client";

import type { FC } from "react";
import { useState } from "react";

import { POPOVER } from "@shared/const";
import { Button } from "@ui/button";
import { DialogBox } from "@ui/dialogBox";

import type { ISurveyReminder } from "../config/types";

export const SurveyReminder: FC<ISurveyReminder> = ({
    isOpen = true,
    id,
    extraCN,
    utilCN,
    extraAttrs,
    style,
}) => {
    const [dismissed, setDismissed] = useState(false);
    const visible = isOpen && !dismissed;

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
