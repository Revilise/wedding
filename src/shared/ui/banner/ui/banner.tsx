"use client";

import "swiper/swiper.css";

import type { FC } from "react";
import { useId } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useBEM } from "@lib/bem";
import type { IBanner } from "../config/types";

export const Banner: FC<IBanner> = ({ slides = [] }) => {
  const { bem } = useBEM("banner");
  const id = useId();

  return (
    <div className={bem("")}>
      <Swiper>
        {slides.map(({ extraCN, utilCN, image, video, title, description, corner, children }, idx) => (
          <SwiperSlide className={bem("slide", { extraCN, utilCN })} key={`${id}-${idx}`}>
            {image && (
              <picture>
                {image.srcMobile && <source srcSet={image.srcMobile} />}
                <img src={image.src} alt={image.alt} />
              </picture>
            )}

            {video && <video src={video.src} autoPlay={video.autoplay} poster={video.poster} />}

            <div className={bem("slideContent")}>
              {title && <div className={bem("title")}>{title}</div>}
              {description && <div className={bem("description")}>{description}</div>}
              {corner && <div className={bem("corner")}>{corner?.content}</div>}
              {children}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

