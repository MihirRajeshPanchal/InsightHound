import { Stack } from "expo-router";
import { View } from "react-native";
import { useState } from "react";
import { InterestSlider } from "~/components/home/InterestSlider";
import { CompanyCard } from "~/components/home/CompanyCard";
import { DOMAINS } from "~/lib/constants";
import { Company } from "~/lib/types/prisma";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  const [selectedInterest, setSelectedInterest] = useState(DOMAINS[0]);
  const [currentCompany, setCurrentCompany] = useState<Company>({
    name: 'Sample Company',
    description: 'This is a sample company that focuses on innovative solutions in the technology sector. We are dedicated to creating cutting-edge products that solve real-world problems.',
    vision: 'To become the leading innovator in sustainable technology solutions.',
    mission: 'To develop and deliver innovative products that improve people\'s lives while maintaining environmental responsibility.',
    valuation: '$10M - $50M',
    domain: DOMAINS[0],
  });

  const handleInterestChange = (interest: string) => {
    setSelectedInterest(interest);
  };

  const handleSwipe = (direction: "left" | "right") => {
    console.log(`Swiped ${direction}`);
  };

  return (
    <GestureHandlerRootView className="flex-1">

    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: "AppHound" }} />
      
      <InterestSlider
        interests={DOMAINS}
        selectedInterest={selectedInterest}
        onInterestChange={handleInterestChange}
        />

      <View className="flex-1 items-center justify-center px-4">
        <CompanyCard
          company={currentCompany}
          onSwipe={handleSwipe}
          isLoadingMore={false}
          />
      </View>
    </View>
    </GestureHandlerRootView>
  );
}