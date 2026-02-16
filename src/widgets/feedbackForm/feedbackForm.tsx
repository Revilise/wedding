import type {IFeedbackForm} from "@widgets/feedbackForm/types.ts";
import {type FC, useId} from "react";
import {useBEM} from "@lib/bem";
import {Form, FormStep} from "@ui/form";
import {Input} from "@ui/input";
import {CheckerGroup} from "@ui/checkerGroup";
import {Button} from "@ui/button";
import {Grid} from "@ui/grid";
import {API, API_ENDPOINTS} from "@shared/const";

export const FeedbackForm: FC<IFeedbackForm> = ({
  extraCN,
  utilCN,
}) => {
  const { bem } = useBEM("feedback");
  const id = useId();

  return (
     <div className={bem("", { extraCN, utilCN })}>
       <Form url={`${API}${API_ENDPOINTS}`}>

         <FormStep key={`${id}-0`} id={"0"}>
           <Grid extraCN={{ isGap8: true }} utilCN={["mb-24"]}>
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
           </Grid>

           <Button>
             Отправить
           </Button>
         </FormStep>

         <FormStep key={`${id}-1`} id={"1"}>
           <Grid extraCN={{ isGap8: true }} utilCN={["mb-24"]}>
             <Input label={"Есть ли у вас аллергия на какие-либо продукты? Если да, то на какие?"} />
             <Input label={"Собираетесь ли вы употреблять алкоголь?"} />
           </Grid>
           <Button>
             Отправить
           </Button>
         </FormStep>

         <FormStep key={`${id}-2`} id={"success"}>
           <p>Спасибо, мы получили</p>
         </FormStep>
         <FormStep key={`${id}-3`} id={"error"}>
           <p>Произошла ошибка, попробуйте позже</p>
         </FormStep>
       </Form>
     </div>
  )
}
