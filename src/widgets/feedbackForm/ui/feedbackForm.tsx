"use client";

import { type FC, useEffect, useId, useState } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@ui/button";
import { CheckerGroup } from "@ui/checkerGroup";
import { Form, FormControls, FormStep } from "@ui/form";
import { Input } from "@ui/input";
import { Textbox } from "@ui/textbox";
import { Popover, usePopover } from "@ui/popover";

import { useCountdown } from "@lib/countdown";
import { request } from "@lib/request";
import { API, API_ENDPOINTS } from "@shared/const";
import { toBoolean } from "@shared/lib";

import type { FeedbackFormData, IFeedbackForm } from '../config/types';
import { filterObject } from '@lib/object/filterObject.ts';
import { useFeedback } from '@widgets/feedbackForm/lib/useFeedback.tsx';
import { VALIDATION_RULES } from '@ui/form/config/const.ts';

const defaultValues: FeedbackFormData = {
  visit: undefined,
  name: "",

  introduction: "",
  allergy: "",
  alcohol: undefined,
  step: "",
  fact: "",
  song: "",
  history: "",
  comment: ""
}

const validation: Record<string, (keyof FeedbackFormData)[]> = {
  "0": ["name", "visit"],
  "1": ["introduction", "alcohol"]
}

export const FeedbackForm: FC<IFeedbackForm> = ({
  id = "feedback-form",
  extraCN,
  utilCN
}) => {
  const uid = useId();
  const [activeStep, setActiveStep] = useState("0");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset: resetForm,
  } = useForm<FeedbackFormData>({ defaultValues });

  const { start: startCountdown, reset: resetCountdown, time, isEnd } = useCountdown(2);
  const { close: closePopover } = usePopover(id);
  const { updateFeedback } = useFeedback();

  const onSubmit: SubmitHandler<FeedbackFormData> = async (data) => {
    if (!await trigger(validation[activeStep])) return;

    const payload = filterObject({
      ...data,
      step: activeStep,
      alcohol: toBoolean(data.alcohol),
      visit: toBoolean(data.visit),
    }, ({ value }) => value !== "")

    request(payload, { url: `${API}${API_ENDPOINTS.feedback}`, method: "post" })
        .then(onSuccess)
        .catch(onFail);
  };

  const onSuccess = (resp: { step: string, success: boolean }) => {
    const nextStep = resp.step;
    setActiveStep(nextStep);

    if (nextStep === "2" && resp.success) {
      startCountdown();
      updateFeedback(true);
    }
  }

  const onFail = (error: Error) => {
    console.error("Submission error", error);
  }

  useEffect(() => {
    if (!isEnd) return;

    closePopover();
    resetForm();
    resetCountdown();
    setActiveStep("0");

  }, [isEnd]);

  return (
      <Popover id={id}>
        <Form
            extraCN={{ isFeedback: true, ...extraCN }}
            utilCN={utilCN}
            activeStepId={activeStep}
            // Оборачиваем весь Form в onSubmit, чтобы обрабатывать Enter и кнопки
            onSubmit={handleSubmit(onSubmit)}
        >
          {/* Шаг 0: Основная информация */}
          {activeStep === "0" && (
              <FormStep key={`${uid}-0`} id={"0"}>
                <Input
                    label={"Фамилия Имя"}
                    error={errors.name?.message}
                    {...register("name",
                        {
                          ...VALIDATION_RULES.requiredField,
                          ...VALIDATION_RULES.maxLength(50)
                        }
                    )}
                />
                <CheckerGroup
                    label={"Вы придёте?"}
                    type={"radio"}
                    error={errors.visit?.message}
                    options={[
                      {
                        label: "Да",
                        value: "yes",
                        ...register("visit", {
                          ...VALIDATION_RULES.requiredChoice
                        }),
                      },
                      {
                        label: "Нет",
                        value: "no",
                        ...register("visit", {
                          ...VALIDATION_RULES.requiredChoice
                        }),
                      },
                    ]}
                />
                <FormControls>
                  <Button extraCN={{ isOutline: true }} type="submit">Далее</Button>
                </FormControls>
              </FormStep>
          )}

          {/* Шаг 1: Подробности */}
          {activeStep === "1" && (
              <FormStep key={`${uid}-1`} id={"1"}>
                <Textbox
                    label={"Забавно представьтесь в 1-2 предложениях."}
                    error={errors.introduction?.message}
                    {...register("introduction", {
                      ...VALIDATION_RULES.requiredField,
                      ...VALIDATION_RULES.maxLength(250)
                    })}
                />
                <Input
                    label={"У вас есть аллергия на продукты?"}
                    error={errors.allergy?.message}
                    { ...register("allergy", {
                      ...VALIDATION_RULES.maxLength(160)
                    })}
                />
                <Input
                    label={"Факт о паре?"}
                    error={errors.fact?.message}
                    { ...register("fact", {
                      ...VALIDATION_RULES.maxLength(250)
                    })}
                />
                <Input
                    label={"Песня-ассоциация с парой?"}
                    error={errors.song?.message}
                    {...register("song", {
                      ...VALIDATION_RULES.maxLength(100)
                    })}
                />
                <Textbox
                    label={"История, связанная с женихом или невестой?"}
                    error={errors.history?.message}
                    {...register("history", {
                      ...VALIDATION_RULES.maxLength(500)
                    })}
                />

                <CheckerGroup
                    label={"Будете ли алкоголь?"}
                    type={"radio"}
                    error={errors.alcohol?.message}
                    options={[
                      {
                        label: "Да",
                        value: "yes",
                        ...register("alcohol", {
                          ...VALIDATION_RULES.requiredChoice
                        }),
                      },
                      {
                        label: "Нет",
                        value: "no",
                        ...register("alcohol", {
                          ...VALIDATION_RULES.requiredChoice
                        }),
                      },
                    ]}
                />

                <Textbox
                    label={"Комментарии"}
                    error={errors.comment?.message}
                    {...register("comment", {
                      ...VALIDATION_RULES.maxLength(250)
                    })}
                />

                <FormControls>
                  <Button extraCN={{ isOutline: true }} type="submit">Отправить</Button>
                </FormControls>
              </FormStep>
          )}

          {/* Шаг 2: Успех */}
          {activeStep === "2" && (
              <FormStep extraCN={{ isSuccess: true }} key={`${uid}-2`} id={"2"}>
                <p className={"h4"}>Анкета успешно отправлена!</p>
                <span>Форма закроется через {time} сек...</span>
              </FormStep>
          )}
        </Form>
      </Popover>
  );
};

