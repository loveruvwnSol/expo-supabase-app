import React from "react";
import { Box, HStack, Text } from "native-base";
import { CountryList, GenderList, Languages } from "../../Info";
import { useUserInfo } from "../../hooks/useUserInfo";

export const UserDetailList = () => {
  const user = useUserInfo();
  const InfoSelectList = [
    {
      title: "性別",
      state: "gender",
      setState: "setGender",
      minWidth: "90",
      map: GenderList,
      res: user && user.user_gender,
    },
    {
      title: "国",
      state: "country",
      setState: "setCountry",
      minWidth: "140",
      map: CountryList,
      res: user && user.user_country,
    },
    {
      title: "言語",
      state: "language",
      setState: "setLanguage",
      minWidth: "120",
      map: Languages,
      res: user && user.user_language,
    },
  ];

  return (
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
  );
};
