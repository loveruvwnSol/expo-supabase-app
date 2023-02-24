import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Image } from "native-base";
import { TimelineParamList } from "../../types";

type TimelineStackscreenProps = NativeStackScreenProps<
  TimelineParamList,
  "PostImage"
>;

export const PostImage = ({ route }: TimelineStackscreenProps) => {
  return (
    <Box bg="black">
      {route.params.post_image && (
        <Image
          w={"full"}
          h={"full"}
          source={{ uri: route.params.post_image ?? "" }}
          alt=""
        />
      )}
    </Box>
  );
};
