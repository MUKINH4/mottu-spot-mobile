import { default as AddButton, default as AddYard } from "@/components/add-btn";
import { Feather, Fontisto } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigate } from "expo-router/build/global-state/routing";
import AddMotoScreen from "./add-moto";
import AddYardScreen from "./add-yard";
import HomeScreen from "./index";
import MotosScreem from "./motos";
import MotosByPatioScreen from "./motos-patio";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tabs como contêiner principal
function BottomTabs() {
  return (
    <Tabs.Navigator screenOptions={{
      tabBarActiveTintColor: "#008C30",
      tabBarInactiveTintColor: "#000"
    }}>
      <Tabs.Screen
        name="index"
        component={HomeScreen}
        options={{
          headerRight: () => <AddYard onPress={() => {
            navigate("/add-yard")
          }} />,
          headerTitle: "MottuSpot",
          title: "Tela inicial",
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="motos"
        component={MotosScreem}
        options={{
          headerTitle: "Todas as Motos",
          title: "Motos",
          tabBarIcon: ({ color, size }) => <Fontisto name="motorcycle" size={size} color={color} />
        }}
      />
    </Tabs.Navigator>
  );
}

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="main" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="motos-patio"
        component={MotosByPatioScreen}
        options={({ navigation, route }: any) => ({
          headerShown: true,
          headerTitle: "Motos por Pátio",
          headerRight: () => (
            <AddButton onPress={() => navigation.navigate("add-moto", {
              patioId: route.params?.patioId,
              patioName: route.params?.patioNome,
            })} />
          ),
        })}
      />
      <Stack.Screen name="add-yard" component={AddYardScreen} options={{ headerTitle: "Adicionar Pátio" }} />
      <Stack.Screen name="add-moto" component={AddMotoScreen} options={{ headerTitle: "Adicionar Moto" }} />
    </Stack.Navigator>
  );
}