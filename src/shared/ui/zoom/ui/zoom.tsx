import type { FC } from 'react';
import { usePanzoom } from "../lib";
import { PanzoomAction } from "@fancyapps/ui/dist/panzoom/";
import { useBEM } from '@lib/bem';
import type { IZoom } from "../config/types.ts";

export const Zoom: FC<IZoom> = ({
    extraCN,
    utilCN,
    image,
    width,
    height,
    showControls = false,
}) => {
    const { bem } = useBEM("zoom");

    const [panzoomRef, panzoomInstance] = usePanzoom({});

    return (
        <div className={bem("", { extraCN, utilCN })}>
            <div className={bem("container")} ref={panzoomRef}>
                <img
                    className={`${bem("image")} f-panzoom__content`}
                    src={image.src}
                    alt={image.alt}
                    height={height}
                    width={width}
                />
            </div>
            {showControls && (
                <div className={bem("controls")}>
                    <button
                        className={bem("btn")}
                        type="button"
                        onClick={() => panzoomInstance?.execute(PanzoomAction.ZoomIn)}
                        aria-label="Zoom in"
                    >
                        +
                    </button>
                    <button
                        className={bem("btn")}
                        type="button"
                        onClick={() => panzoomInstance?.execute(PanzoomAction.ZoomOut)}
                        aria-label="Zoom out"
                    >
                        −
                    </button>
                </div>
            )}
        </div>
    );
};
