import { Box, Stack } from "@mui/material";
import { SliderItem } from "../types";
import { useCallback, useEffect, useRef, useState } from "react";
import "./ImgCarousel.css";

interface IImgCarousel {
  sliderData: SliderItem[];
  ItemElement: (props: SliderItem) => JSX.Element;
  gap: string;
  innerWidth: number;
  outerWidth: string;
}

export function ImgCarousel({
  sliderData,
  ItemElement,
  gap,
  innerWidth,
  outerWidth,
}: IImgCarousel) {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const ANIMATION_STEP = 250;
  const [swipeDirection, setSwipeDirection] = useState("left");
  const [keyFrames, setKeyFrames] = useState(`
        @-webkit-keyframes slide-left {
            from {
                -webkit-transform: translateX(0px)
            }
            to {
                -webkit-transform: translateX(-250px)
            }
        }

    `);
  const [visibleArea, setVisibleArea] = useState(0);
  const [isMouseDown, setMouseDown] = useState(false);
  const [initDragablePosition, setInitDragablePosition] = useState(0);

  const onSwipeLeft = useCallback(() => {
    if (sliderRef) {
      const slider = sliderRef?.current as unknown as HTMLElement;
      const container = containerRef.current as unknown as HTMLElement;
      if (slider?.classList && container) {
        if (slider?.classList.contains("activeSwipe")) {
          slider?.classList.remove("activeSwipe");
        } else {
          const containerWidth = container.getBoundingClientRect().width;
          if (containerWidth + -visibleArea < innerWidth) {
            setSwipeDirection("left");
            setVisibleArea(visibleArea - ANIMATION_STEP);
            slider?.classList.add("activeSwipe");
            addStylesheetRules(keyFrames);
          }
        }
      }
    }
  }, [innerWidth, keyFrames, visibleArea]);

  const onSwipeRight = useCallback(() => {
    if (sliderRef) {
      const slider = sliderRef?.current as unknown as HTMLElement;
      const container = containerRef.current as unknown as HTMLElement;
      if (slider?.classList && container) {
        if (slider?.classList.contains("activeSwipe")) {
          slider?.classList.remove("activeSwipe");
        } else {
          if (visibleArea + ANIMATION_STEP <= 0) {
            setSwipeDirection("right");
            setVisibleArea(visibleArea + ANIMATION_STEP);
            slider?.classList.add("activeSwipe");
            addStylesheetRules(keyFrames);
          }
        }
      }
    }
  }, [keyFrames, visibleArea]);
  useEffect(() => {
    let finalVisibleArea = 0;
    if (swipeDirection === "left") {
      finalVisibleArea = visibleArea - ANIMATION_STEP;
    } else {
      finalVisibleArea = visibleArea + ANIMATION_STEP;
    }

    setKeyFrames(`
            @-webkit-keyframes slide-left {
                from {
                    -webkit-transform: translateX(${visibleArea.toString()}px)
                }
                to {
                    -webkit-transform: translateX(${finalVisibleArea.toString()}px)
                }
            }
    `);
  }, [swipeDirection, visibleArea]);
  const TouchStartEvent = useCallback((touchStartEvent: any) => {
    setMouseDown(true);
    setInitDragablePosition(touchStartEvent.touches[0].clientX);
  }, []);
  const onTouchMove = useCallback(
    (touchStartEvent: any) => {
      if (isMouseDown) {
        if (initDragablePosition - touchStartEvent.touches[0].clientX > 100) {
          onSwipeLeft();
          setMouseDown(false);
        } else if (
          touchStartEvent.touches[0].clientX > initDragablePosition &&
          initDragablePosition - touchStartEvent.touches[0].clientX > -100
        ) {
          onSwipeRight();
          setMouseDown(false);
        }
      }
    },
    [initDragablePosition, isMouseDown, onSwipeLeft, onSwipeRight],
  );
  const onTouchEnd = useCallback((touchStartEvent: any) => {
    setMouseDown(false);
  }, []);

  const addStylesheetRules = (rules: string) => {
    const styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
    const styleSheet = styleEl.sheet;
    styleSheet?.insertRule(rules, 0);
  };
  return (
    <Box
      ref={containerRef}
      overflow="hidden"
      width={outerWidth}
      onTouchStart={TouchStartEvent}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      display="flex"
      flexDirection="row"
    >
      <Stack
        direction="row"
        gap={gap}
        ref={sliderRef}
        width={`${innerWidth.toString()}px`}
        style={{
          transform: `translateX(${visibleArea.toString()}px)`,
        }}
        sx={{
          marginTop: "-1px",
        }}
      >
        {sliderData.map((item, i) => (
          <ItemElement
            key={i}
            imgSource={item.imgSource}
            description={item.description}
            hoverDescription={item.hoverDescription}
          />
        ))}
      </Stack>
    </Box>
  );
}
