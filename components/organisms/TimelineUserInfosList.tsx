import React from "react";
import { Box, HStack, Text } from "native-base";
import { CountryList, GenderList, Languages } from "../../Info";
import { useUserInfo } from "../../hooks/useUserInfo";

type TimelineUserInfosListProps = {
  user_gender: string;
  user_country: string;
  user_language: string;
};

export const TimelineUserInfosList: React.FC<TimelineUserInfosListProps> = ({
  user_gender,
  user_country,
  user_language,
}) => {
  const InfoSelectList = [
    {
      title: "性別",
      state: "gender",
      setState: "setGender",
      minWidth: "90",
      map: GenderList,
      res: user_gender,
    },
    {
      title: "国",
      state: "country",
      setState: "setCountry",
      minWidth: "140",
      map: CountryList,
      res: user_country,
    },
    {
      title: "言語",
      state: "language",
      setState: "setLanguage",
      minWidth: "120",
      map: Languages,
      res: user_language,
    },
  ];

  return (
    <Box w={"2xs"}>
      <Box mt={4} ml={4} mr={5}>
        <Box mb={5}>
          {InfoSelectList.map((e, idx) => (
            <HStack
              key={idx}
              mt={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text opacity={0.5} fontWeight="thin">
                {e.title}
              </Text>
              <Text opacity={0.5} fontWeight="thin">
                {e.res}
              </Text>
            </HStack>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
