import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Company } from "~/lib/types/prisma";
import CompanyInfo from "./company-info";

interface CompanyCardProps {
  company: Company;
  onSwipe: (direction: "left" | "right") => void;
  style?: any;
  isLoadingMore?: boolean;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;

const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;
const CARD_PADDING = SCREEN_WIDTH * 0.05;
const BUTTON_HEIGHT = 50;

export function CompanyCard({
  company,
  onSwipe,
}: CompanyCardProps) {
  if (!company.description || company.description.trim() === "") {
    return null;
  }

  const translateX = useSharedValue(0);

  const springConfig = {
    damping: 20,
    stiffness: 400,
    mass: 1,
  };

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      translateX.value = withSpring(0, springConfig);
    },
    onActive: (event) => {
      const resistance = 0.5;
      translateX.value = event.translationX * resistance;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        translateX.value = withSpring(
          event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          springConfig,
        );
        runOnJS(onSwipe)(event.translationX > 0 ? "right" : "left");
      } else {
        translateX.value = withSpring(0, springConfig);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    translateX.value = withSpring(0, springConfig);
  }, [company])
  return (
    <>
      <PanGestureHandler onGestureEvent={panGesture} activeOffsetX={[-10, 10]}>
        <Animated.View
          style={[
            {
              height: CARD_HEIGHT,
              width: "100%",
              padding: CARD_PADDING,
            },
            animatedStyle,
          ]}
          className="rounded-xl shadow-xl"
        >
          <CompanyInfo company={company} />
          <View
            style={{ height: BUTTON_HEIGHT, bottom: CARD_PADDING }}
            className="absolute left-5 right-5 flex-row justify-between items-center"
          >
          </View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
} 