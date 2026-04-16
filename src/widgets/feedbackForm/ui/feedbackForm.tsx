"use client";

import type { FC } from "react";
import { useEffect, useId, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@ui/button";
import { CheckerGroup } from "@ui/checkerGroup";
import { Form, FormControls, FormStep } from "@ui/form";
import { Input } from "@ui/input";
import { Popover, usePopover } from "@ui/popover";

import { useCountdown } from "@lib/countdown";
import { request } from "@lib/request";
import { API, API_ENDPOINTS } from "@shared/const";
import { Locale } from "@shared/const/locale";
import { toBoolean } from "@shared/lib";

import type { FeedbackFormData, IFeedbackForm } from '../config/types';
import { filterObject } from '@lib/object/filterObject.ts';

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

  const { start: startCountdown, reset: resetCountdown, time, isEnd } = useCountdown(5);
  const { close: closePopover } = usePopover(id);

  const onSubmit: SubmitHandler<FeedbackFormData> = async (data) => {
    // Валидируем только поля, относящиеся к текущему шагу перед отправкой
    const fieldsToValidate = activeStep === "0"
        ? ["name", "visit"]
        : ["introduction", "alcohol"];

    const isValid = await trigger(fieldsToValidate as never);
    if (!isValid) return;

    const payload = {
      ...data,
      step: activeStep,
      alcohol: toBoolean(data.alcohol),
      visit: toBoolean(data.visit),
    };

    const filteredPayload = filterObject(payload, ({ value }) => value !== "")

    try {
      const response = await request(filteredPayload, {
        url: `${API}${API_ENDPOINTS.feedback}`,
        method: "post"
      });

      const nextStep = response.step;
      setActiveStep(nextStep);

      if (nextStep === "2" && response.success) {
        startCountdown();
      }
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  useEffect(() => {
    if (isEnd) {
      closePopover();
      resetForm();
      resetCountdown();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveStep("0");
    }
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
                    {...register("name", { required: Locale.form.invalid.requiredField })}
                />
                <CheckerGroup
                    label={"Вы придёте?"}
                    type={"radio"}
                    error={errors.visit?.message}
                    options={[
                      {
                        label: "Да",
                        value: "yes",
                        ...register("visit", { required: Locale.form.invalid.requiredChoice }),
                      },
                      {
                        label: "Нет",
                        value: "no",
                        ...register("visit", { required: Locale.form.invalid.requiredChoice }),
                      },
                    ]}
                />
                <FormControls>
                  <Button type="submit">Далее</Button>
                </FormControls>
              </FormStep>
          )}

          {/* Шаг 1: Подробности */}
          {activeStep === "1" && (
              <FormStep key={`${uid}-1`} id={"1"}>
                <Input
                    label={"Забавно представьтесь в 1-2 предложениях."}
                    error={errors.introduction?.message}
                    {...register("introduction", { required: Locale.form.invalid.requiredField })}
                />
                <Input label={"Аллергия на продукты?"} {...register("allergy")} />
                <Input label={"Факт о паре?"} {...register("fact")} />
                <Input label={"Песня-ассоциация?"} {...register("song")} />
                <Input label={"История из жизни?"} {...register("history")} />

                <CheckerGroup
                    label={"Будете ли алкоголь?"}
                    type={"radio"}
                    error={errors.alcohol?.message}
                    options={[
                      {
                        label: "Да",
                        value: "yes",
                        ...register("alcohol", { required: Locale.form.invalid.requiredChoice }),
                      },
                      {
                        label: "Нет",
                        value: "no",
                        ...register("alcohol", { required: Locale.form.invalid.requiredChoice }),
                      },
                    ]}
                />
                <FormControls>
                  <Button type="submit">Отправить</Button>
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

