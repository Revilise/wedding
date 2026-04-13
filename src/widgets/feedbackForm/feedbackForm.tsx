import type {FeedbackFormData, IFeedbackForm} from "@widgets/feedbackForm/types.ts";
import {type FC, useEffect, useId, useState} from "react";
import {Form, FormControls, FormStep} from "@ui/form";
import {Input} from "@ui/input";
import {CheckerGroup} from "@ui/checkerGroup";
import {Button} from "@ui/button";
import {type SubmitHandler, useForm} from "react-hook-form";
import {Locale} from "@shared/const/locale.ts";
import {API, API_ENDPOINTS} from "@shared/const";
import {request} from "@lib/request";
import {Popover} from "@ui/popover";
import {usePopover} from "@ui/popover/lib/usePopover.tsx";
import {useCountdown} from "@lib/countdown";
import {toBoolean} from "@shared/lib";

const defaultValues: FeedbackFormData = {
  alcohol: undefined,
  allergy: "",
  introduction: "",
  name: "",
  step: "",
  visit: undefined
}

export const FeedbackForm: FC<IFeedbackForm> = ({
  id,
  extraCN,
  utilCN,
}) => {
  const uid = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({ defaultValues });

  const [ activeStep, setActiveStep ] = useState("0");
  const { start: startCountdown, reset: resetCountdown, time, isEnd } = useCountdown(5);
  const { close: closePopover } = usePopover(id);

  const onSubmit: SubmitHandler<FeedbackFormData> = async (data) => {
    const payload = {
      ...data,
      step: activeStep,
      alcohol: toBoolean(data.alcohol),
      visit: toBoolean(data.visit)
    }

    const { step, success } = await request(payload, { url: `${API}${API_ENDPOINTS.feedback}`, method: "post" });
    setActiveStep(step);

    if (step === "2" && success) {
      startCountdown();
    }
  }

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
         <FormStep
            key={`${uid}-0`}
            id={"0"}
         >
           <Input
              label={"Фамилия Имя"}
              error={errors.name?.message as string}
              {...register("name", { required: Locale.form.invalid.requiredField })}
           />
           <Input
              label={"Забавно представьтесь в 1-2 предложениях."}
              error={errors.introduction?.message as string}
              {...register("introduction", { required: Locale.form.invalid.requiredField })}
           />
           <CheckerGroup
              label={"Вы придёте?"}
              type={"radio"}
              error={errors.visit?.message as string}
              options={[
                { label: "Да", value: "yes", ...register("visit", { required: Locale.form.invalid.requiredChoice }) },
                { label: "Нет", value: "no", ...register("visit", { required: Locale.form.invalid.requiredChoice }) },
              ]}
           />

           <FormControls>
             <Button>
               Отправить
             </Button>
           </FormControls>
         </FormStep>

         <FormStep key={`${uid}-1`} id={"1"}>
           <Input name={"allergy"} label={"Есть ли у вас аллергия на какие-либо продукты? Если да, то на какие?"} />
           <CheckerGroup
              label={"Собираетесь ли вы употреблять алкоголь?"}
              type={"radio"}
              error={errors.alcohol?.message as string}
              options={[
                { label: "Да", value: "yes", ...register("alcohol", { required: activeStep === "1" && Locale.form.invalid.requiredChoice }) },
                { label: "Нет", value: "no", ...register("alcohol", { required: activeStep === "1" && Locale.form.invalid.requiredChoice }) },
              ]}
           />

           <FormControls>
             <Button>
               Отправить
             </Button>
           </FormControls>
         </FormStep>

         <FormStep extraCN={{ isSuccess: true }} key={`${uid}-2`} id={"2"}>
           <p className={"h4"}>Анкета успешно отправлена!</p>
           <span>Форма сама закроется через {time} сек...</span>
         </FormStep>
       </Form>
     </Popover>
  )
}
