"use server"

import {Layout} from "@ui/layout";
import {Section} from "@ui/section";
import {Banner} from "@ui/banner";
import {
  communitySection,
  dressCodeSection, dressExamplesSection, feedbackSection,
  giftsSection,
  heroSection,
  inviteSection,
  programSection,
  timePlaceSection
} from "./store.tsx";
import {Image} from "@ui/image";
import {Grid, GridItem} from "@ui/grid";
import {Swiper, SwiperSlide} from "swiper/react";
import {Icon} from "@ui/icon";
import {Button} from "@ui/button";
import {FeedbackForm} from "@widgets/feedbackForm";
import {Popover} from "@ui/popover";
import {POPOVER} from "@shared/const";

export const HomePage = () => {
  return (
     <Layout>
       {/* Hero Banner */}
       <Section extraCN={{ isLarge: true }}>
         <Banner {...heroSection.banner} />
       </Section>

       {/* Invite guests */}
       <Section>
         <Grid extraCN={{ isVariant1: true }}>
           <GridItem utilCN={["p-32 p-mob-0"]}>
             <h2 className={"h2"}>{inviteSection.heading}</h2>
             <p>{inviteSection.content}</p>
           </GridItem>
           <GridItem>
             <Image {...inviteSection.image} />
           </GridItem>
         </Grid>
       </Section>

       {/* Time & Place */}
       <Section>
         <Grid>
           <Grid extraCN={{isVariant2: true}}>
             <h2 className={"h2"}>{timePlaceSection.heading}</h2>
             <div className={"flex-column place-end"}>
               {timePlaceSection.info}
             </div>
           </Grid>

           <a target={"_blank"} href={"https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_savushkina_21/Z0kYdA9lQUYAQFtjfXV5d3xkbQ==/?ll=30.286220%2C59.986136&z=17.6"}>
             <Image {...timePlaceSection.image} />
           </a>

           {/*<div className={"flex-column gap-32 place-end"}>*/}
           {/*  {timePlaceSection.extraInfo}*/}
           {/*</div>*/}
         </Grid>
       </Section>

       {/* Program/Timing */}
       <Section >
         <Grid extraCN={{isOffset: true}}>
           <GridItem
              extraCN={{
                "isArea-1": true,
                isBorderRad32: true,
                isContent: true
              }}
              utilCN={["align-right colorWhite bgBlackout gap-32 flex-column fullWidth fitContent"]}
           >
             <h2 className={"h2"}>{programSection.heading}</h2>
             <Grid extraCN={{ isMinAuto: true }} utilCN={["fullWidth"]}>
               {programSection.program}
             </Grid>
           </GridItem>

           <GridItem
              extraCN={{
                "isArea-2": true,
                isBorderRad32: true,
                isContent: true
              }}
              utilCN={["bgBlackout colorWhite"]}
           >
             <div>
               <span>{programSection.content}</span>
             </div>
           </GridItem>

           <GridItem
              extraCN={{"isArea-3": true, isBorderRad32: true }}
              utilCN={["colorBlackout colorWhite"]}
           >
             <Image extraCN={{isHeight280: true}} src={programSection.image.src}/>
           </GridItem>

         </Grid>
       </Section>

       <Section>
         <Grid extraCN={{ isVariant2: true }}>
           <GridItem>
             <Image {...giftsSection.image} />
           </GridItem>

           <GridItem utilCN={["p-32 p-mob-0 flex-column gap-32 align-right"]}>
             <h2 className={"h2"}>{giftsSection.heading}</h2>
             {giftsSection.content}
           </GridItem>
         </Grid>
       </Section>

       {/* Dress code */}
       <Section>
         <h2 className={"h2"}>{dressCodeSection.heading}</h2>

         <div className={"flex-column gap-32"}>
           <h4 className={"h4"}>{dressCodeSection.subTitle}</h4>

           <div className={"flex-column gap-16 text"}>
             <p className={"bold"}>{dressCodeSection.ladies.title}</p>
             <p>{dressCodeSection.ladies.content}</p>
           </div>

           <div className={"flex-column gap-16 text"}>
             <p className={"bold"}>{dressCodeSection.gentlemen.title}</p>
             <p>{dressCodeSection.gentlemen.content}</p>
           </div>

           <Grid extraCN={{ isPalette: true }}>
             {dressCodeSection.palette.map(({ color },  idx) => (
                <GridItem
                   extraCN={{ isPaletteColor: true }}
                   style={{ "background": color, "color": color }}
                   key={`dressCode-color-${idx}`}
                >
                  <span>{color}</span>
                </GridItem>
             ))}
           </Grid>
         </div>
       </Section>

       <Section
          extraCN={{ isFullBleed: true }}
          heading={<h4>{dressExamplesSection.heading}</h4>}
       >
         <div className="slider-clip">
           <Swiper {...dressExamplesSection.swiperCfg}>
             {dressExamplesSection.images.map((image, idx) => (
                <SwiperSlide key={`dress-example-${idx}`}>
                  <Image extraCN={{ "isAspect[300/470]": true }} src={image} />
                </SwiperSlide>
             ))}
           </Swiper>
         </div>
       </Section>

       <Section
          extraCN={{ isSweetGreyBg: true, isWideVerticalPad: true }}
       >
         <Grid extraCN={{isAutoMin: true}}>
           <div className={"flex-column gap-32"}>
             <h2>{communitySection.heading}</h2>
             <div className={"text"}>Присоединяйтесь к нашему телеграмм-каналу - будем делиться фото и видео с праздника</div>
           </div>

           <Button
              extraCN={{ isQr: true }}
              href={communitySection.qrCode.link}
              type={"link"}
              extraAttrs={{ target: "_blank" }}
           >
             <Icon {...communitySection.qrCode} />
           </Button>
         </Grid>
       </Section>

       <Section>
         <Grid extraCN={{ isVariant2: true }} utilCN={["align-right"]}>
           <Image src={feedbackSection.image} />
           <GridItem utilCN={["flex-column gap-32"]}>
             <h2>{feedbackSection.heading}</h2>
             {feedbackSection.content}
             <Button
                extraCN={{ isFit: true }}
                extraAttrs={{ [POPOVER.SHOW]: feedbackSection.popoverId }}
             >
               Пройти опрос
             </Button>

             <FeedbackForm id={feedbackSection.popoverId} />
           </GridItem>
         </Grid>
       </Section>
     </Layout>
  )
}
