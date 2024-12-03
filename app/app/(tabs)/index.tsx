import { Stack } from "expo-router";
import { Image, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { InterestSlider } from "~/components/home/InterestSlider";
import { CompanyCard } from "~/components/home/CompanyCard";
import { DOMAINS, FASTAPI_URL, font } from "~/lib/constants";
import { Company } from "~/lib/types/prisma";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { sampleCompanies } from "~/lib/data/sample";
import Loader from "~/components/loader";
import Loading from "~/components/loading";

export default function Home() {
  const [selectedInterest, setSelectedInterest] = useState(DOMAINS[0]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      // setCompanies(sampleCompanies);
      // return;
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

  console.log("Current Company:", currentCompany);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-zinc-950">
        <Stack.Screen options={{
          title: "AppHound", headerTitleStyle: { fontFamily: font.semiBold.fontFamily }, header: () => (
            <View className="flex flex-row items-center justify-center gap-4 bg-zinc-950 py-2 px-4">
              <Image source={require("../../assets/logo.png")} style={{ height: 20, width: 20, objectFit: "contain" }} />
              <Text style={font.semiBold} className="text-2xl font-semibold text-slate-50 text-center">HoundMe</Text>
            </View>
          )
        }} />

        <InterestSlider
          interests={DOMAINS}
          selectedInterest={selectedInterest}
          onInterestChange={handleInterestChange}
        />

        {currentCompany ? (
          <View className="flex-1 items-center justify-center px-4">
            <CompanyCard
              company={currentCompany}
              onSwipe={handleSwipe}
              isLoadingMore={isLoading}
            />
          </View>
        ) : <Loader />}
        {/* <Loader /> */}
      </View>
    </GestureHandlerRootView>
  );
}