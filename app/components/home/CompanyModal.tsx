import React from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Company } from "~/lib/types/prisma";

interface CompanyModalProps {
  company: Company;
  visible: boolean;
  onClose: () => void;
}

export const CompanyModal = ({ company, visible, onClose }: CompanyModalProps) => {
  const copyToClipboard = async (text: string, label: string) => {
    const title = label.charAt(0).toUpperCase() + label.slice(1);
    await Clipboard.setStringAsync(text);
    ToastAndroid.show(`${title} copied to clipboard`, ToastAndroid.SHORT);
    console.log(`${title} copied to clipboard`);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-2xl max-h-[92%] min-h-[92%]">
          <View className="absolute top-0 left-0 right-0 z-10 bg-white rounded-t-2xl border-b border-gray-200">
            <View className="flex-row justify-between items-center py-4 px-5">
              <TouchableOpacity onPress={onClose} className="p-2">
                <Feather name="x" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView className="px-5 pt-3" style={{ marginTop: 65 }}>
            <TouchableOpacity
              onPress={() => copyToClipboard(company.name, "Company Name")}
              className="mb-3"
            >
              <Text className="text-lg font-bold">{company.name}</Text>
            </TouchableOpacity>

            {company.valuation && (
              <View className="mb-5">
                <Text className="text-base font-semibold text-gray-600">
                  Valuation
                </Text>
                <Text className="text-base leading-6">{company.valuation}</Text>
              </View>
            )}

            {company.domain && (
              <View className="mb-5">
                <Text className="text-base font-semibold text-gray-600">
                  Domain
                </Text>
                <Text className="text-base leading-6">{company.domain}</Text>
              </View>
            )}

            {company.description && (
              <TouchableOpacity
                onPress={() => copyToClipboard(company.description, "Description")}
                className="mb-5"
              >
                <Text className="text-base font-semibold text-gray-600">
                  Description
                </Text>
                <Text className="text-base leading-6">{company.description}</Text>
              </TouchableOpacity>
            )}

            {company.mission && (
              <TouchableOpacity
                onPress={() => copyToClipboard(company.mission ?? '', "Mission")}
                className="mb-5"
              >
                <Text className="text-base font-semibold text-gray-600">
                  Mission
                </Text>
                <Text className="text-base leading-6">{company.mission}</Text>
              </TouchableOpacity>
            )}

            {company.vision && (
              <TouchableOpacity
                onPress={() => copyToClipboard(company.vision ?? '', "Vision")}
                className="mb-5"
              >
                <Text className="text-base font-semibold text-gray-600">
                  Vision
                </Text>
                <Text className="text-base leading-6">{company.vision}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};