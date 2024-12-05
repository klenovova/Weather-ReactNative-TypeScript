import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Text, IconButton, Icon, Pressable } from "@gluestack-ui/themed-native-base";
import { StyleSheet } from "react-native";

const WeatherLoadError = ({
  error,
  handleRefresh,
  handleBackToSearch,
}: {
  error: any;
  handleRefresh: () => void;
  handleBackToSearch: () => void;
}) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <LinearGradient
      colors={["#4287f5", "#42a1f5"]}
      style={StyleSheet.absoluteFillObject}
    />
    <MaterialCommunityIcons
      name="cloud-off-outline"
      size={50}
      color="white"
      style={{ marginBottom: 16 }}
    />
    <Text color="white" fontSize="lg" textAlign="center" px={4} mb={4}>
      {error || "Unable to load weather data"}
    </Text>
    <IconButton
      icon={
        <Icon
          as={MaterialCommunityIcons}
          name="refresh"
          size={6}
          color="white"
        />
      }
      onPress={handleRefresh}
    />
    <Pressable onPress={handleBackToSearch}>
      <Text color="white" fontSize="md">
        Go back to search
      </Text>
    </Pressable>
  </Box>
);

export default WeatherLoadError;
