import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
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
import { Feather } from "@expo/vector-icons";
import { Company } from "~/lib/types/prisma";
import { CompanyModal } from "~/components/home/CompanyModal";

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
const TITLE_MAX_HEIGHT = SCREEN_HEIGHT * 0.15;
const BUTTON_HEIGHT = 50;
const CONTENT_MAX_HEIGHT = SCREEN_HEIGHT * 0.45 - BUTTON_HEIGHT;

export function CompanyCard({
  company,
  onSwipe,
  style,
  isLoadingMore,
}: CompanyCardProps) {
  if (!company.description || company.description.trim() === "") {
    return null;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
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

  const handleTextLayout = (event: any) => {
    const lineHeight = 20;
    const maxLines = Math.floor(CONTENT_MAX_HEIGHT / lineHeight);
    setIsTextTruncated(event.nativeEvent.lines.length > maxLines);
  };

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
            style,
            animatedStyle,
          ]}
          className="bg-white rounded-xl shadow-xl"
        >
          <View className="flex-1">
            <View style={{ maxHeight: TITLE_MAX_HEIGHT }} className="mb-4">
              <Text
                className="text-2xl font-bold text-gray-800"
                adjustsFontSizeToFit
                minimumFontScale={0.5}
              >
                {company.name}
              </Text>
              {company.valuation && (
                <Text className="text-sm text-gray-600 mt-1">
                  Valuation: {company.valuation}
                </Text>
              )}
            </View>

            <View className="flex-1" style={{ marginBottom: BUTTON_HEIGHT }}>
              <Text className="font-semibold text-gray-700 mb-2">Description</Text>
              <Text
                className="text-gray-600 leading-relaxed"
                style={{ maxHeight: CONTENT_MAX_HEIGHT }}
                numberOfLines={Math.floor(CONTENT_MAX_HEIGHT / 20)}
                ellipsizeMode="tail"
                onTextLayout={handleTextLayout}
              >
                {company.description}
              </Text>

              {(company.mission || company.vision) && (
                <View className="mt-4">
                  {company.mission && (
                    <View className="mb-2">
                      <Text className="font-semibold text-gray-700">Mission</Text>
                      <Text className="text-gray-600">{company.mission}</Text>
                    </View>
                  )}
                  {company.vision && (
                    <View>
                      <Text className="font-semibold text-gray-700">Vision</Text>
                      <Text className="text-gray-600">{company.vision}</Text>
                    </View>
                  )}
                </View>
              )}

              {isTextTruncated && (
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  className="mt-2"
                >
                  <View className="flex-row items-center">
                    <Text className="text-slate-900 font-medium mr-1">
                      Read more
                    </Text>
                    <Feather name="chevron-right" size={16} color="#2563EB" />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{ height: BUTTON_HEIGHT, bottom: CARD_PADDING }}
            className="absolute left-5 right-5 flex-row justify-between items-center"
          >
            {isLoadingMore && (
              <ActivityIndicator size="small" color="#4B5563" />
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
              className="ml-auto bg-slate-600 rounded-full p-3"
            >
              <Feather name="maximize-2" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>

      <CompanyModal
        company={company}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
} 