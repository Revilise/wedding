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

import type { FeedbackFormData, IFeedbackForm } from "../config/types";

const defaultValues: FeedbackFormData = {
  alcohol: undefined,
  allergy: "",
  introduction: "",
  name: "",
  step: "",
  visit: undefined,
  fact: "",
  song: "",
  history: "",
};

export const FeedbackForm: FC<IFeedbackForm> = ({ id, extraCN, utilCN }) => {
  const uid = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({ defaultValues });

  const [activeStep, setActiveStep] = useState("0");
  const { start: startCountdown, reset: resetCountdown, time, isEnd } = useCountdown(5);
  const { close: closePopover } = usePopover(id);

  const onSubmit: SubmitHandler<FeedbackFormData> = async (data) => {
    const payload = {
      ...data,
      step: activeStep,
      alcohol: toBoolean(data.alcohol),
      visit: toBoolean(data.visit),
    };

    const { step, success } = await request(payload, { url: `${API}${API_ENDPOINTS.feedback}`, method: "post" });
    setActiveStep(step);

    if (step === "2" && success) {
      startCountdown();
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormStep key={`${uid}-0`} id={"0"}>
          <Input
            label={"Фамилия Имя"}
            error={errors.name?.message as string}
            {...register("name", { required: Locale.form.invalid.requiredField })}
          />
          <CheckerGroup
            label={"Вы придёте?"}
            type={"radio"}
            error={errors.visit?.message as string}
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
            <Button>Отправить</Button>
          </FormControls>
        </FormStep>

        <FormStep key={`${uid}-1`} id={"1"}>
          <Input
            label={"Забавно представьтесь в 1-2 предложениях."}
            error={errors.introduction?.message as string}
            {...register("introduction", { required: Locale.form.invalid.requiredField })}
          />

          <Input label={"Есть ли у вас аллергия на какие-либо продукты? Если да, то на какие?"} {...register("allergy")} />

          <Input label={"Какой факт вы можете расказать о женихе/невесте?"} {...register("fact")} />

          <Input label={"С какой песней ассоциируется пара?"} {...register("song")} />

          <Input label={"Вспомните историю, связанную с женихом/невестой"} {...register("history")} />

          <CheckerGroup
            label={"Собираетесь ли вы употреблять алкоголь?"}
            type={"radio"}
            error={errors.alcohol?.message as string}
            options={[
              {
                label: "Да",
                value: "yes",
                ...register("alcohol", {
                  required: activeStep === "1" && Locale.form.invalid.requiredChoice,
                }),
              },
              {
                label: "Нет",
                value: "no",
                ...register("alcohol", {
                  required: activeStep === "1" && Locale.form.invalid.requiredChoice,
                }),
              },
            ]}
          />

          <FormControls>
            <Button>Отправить</Button>
          </FormControls>
        </FormStep>

        <FormStep extraCN={{ isSuccess: true }} key={`${uid}-2`} id={"2"}>
          <p className={"h4"}>Анкета успешно отправлена!</p>
          <span>Форма сама закроется через {time} сек...</span>
        </FormStep>
      </Form>
    </Popover>
  );
};

