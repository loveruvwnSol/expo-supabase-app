import React from "react";
import { Box, HStack, Text, Switch, Select } from "native-base";
import { InfoSelectList } from "../../Info";

export const UserInfoList = () => {
  const [theme, setTheme] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [gender, setGender] = React.useState("");
  return (
    <Box background="white" w={"xs"} shadow={0}>
      <Box mt={4} ml={4}>
        <Box mb={5}>
          <Text fontSize={16} fontWeight="thin">
            オプション
          </Text>
          <HStack mt={3} justifyContent="space-between" alignItems="center">
            <Text opacity={0.5} fontWeight="thin">
              通知
            </Text>
            <Switch mr={5} size={"md"} />
          </HStack>
          <HStack mt={3} justifyContent="space-between" alignItems="center">
            <Text opacity={0.5} fontWeight="thin">
              テーマ
            </Text>
            <Select
              borderWidth={0}
              selectedValue={theme}
              minWidth="100"
              fontSize={12}
              accessibilityLabel="Select Theme"
              _selectedItem={{
                bg: "#06b6d4",
              }}
              onValueChange={(itemValue) => setTheme(itemValue)}
            >
              <Select.Item label="Light" value="Light" />
              <Select.Item label="Dark" value="Dark" />
            </Select>
          </HStack>
        </Box>
        <Box mb={5}>
          <Text fontSize={16} fontWeight="thin">
            アカウント
          </Text>
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
              <Select
                borderWidth={0}
                selectedValue={e.state}
                minWidth={e.minWidth}
                fontSize={12}
                accessibilityLabel="Select language"
                _selectedItem={{
                  bg: "#06b6d4",
                }}
                onValueChange={(itemValue) => {
                  {
                    e.setState;
                  }
                  itemValue;
                }}
              >
                {e.map.map((e, idx) => (
                  <Select.Item key={idx} label={e.label} value={e.value} />
                ))}
              </Select>
            </HStack>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
