import type {IFeedbackForm} from "@widgets/feedbackForm/types.ts";
import {type FC, useId} from "react";
import {useBEM} from "@lib/bem";
import {Form, FormStep} from "@ui/form";
import {Input} from "@ui/input";
import {CheckerGroup} from "@ui/checkerGroup";
import {Button} from "@ui/button";

export const FeedbackForm: FC<IFeedbackForm> = ({
  extraCN,
  utilCN,
}) => {
  const { bem } = useBEM("feedback");
  const id = useId();

  return (
     <div className={bem("", { extraCN, utilCN })}>
       <Form>
         <FormStep key={`${id}-0`} id={0}>
           <Input label={"Фамилия Имя"} />
           <Input label={"Забавно представьтесь в 1-2 предложениях."} />
           <CheckerGroup
              label={"Вы придёте?"}
              type={"radio"}
              options={[
                { name: "visit", label: "Да", value: "yes" },
                { name: "visit", label: "Нет", value: "no" }
              ]}
           />
           <Button>
             Отправить
           </Button>
         </FormStep>

       </Form>
     </div>
  )
}
