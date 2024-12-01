import { Stack } from "expo-router";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { InterestSlider } from "~/components/home/InterestSlider";
import { CompanyCard } from "~/components/home/CompanyCard";
import { DOMAINS, BACKEND_URL, FASTAPI_URL } from "~/lib/constants";
import { Company } from "~/lib/types/prisma";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  const [selectedInterest, setSelectedInterest] = useState(DOMAINS[0]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${FASTAPI_URL}/getObjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: "company",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const textResponse = await response.text();
      console.log("Response Body:", textResponse);

      const data = JSON.parse(textResponse);
      setCompanies(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleInterestChange = (interest: string) => {
    setSelectedInterest(interest);
  };

  const handleSwipe = (direction: "left" | "right") => {
    console.log(`Swiped ${direction}`);
    if (currentCompanyIndex < companies.length - 1) {
      setCurrentCompanyIndex(prev => prev + 1);
    } else {
      setCurrentCompanyIndex(0);
    }
  };

  const currentCompany = companies[currentCompanyIndex] || null;

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
          {currentCompany && (
            <CompanyCard
              company={currentCompany}
              onSwipe={handleSwipe}
              isLoadingMore={isLoading}
            />
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}