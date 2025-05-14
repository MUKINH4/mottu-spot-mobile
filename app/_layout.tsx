import { default as AddButton, default as AddYard } from "@/components/add-btn";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./index";
import MotosScreem from "./motos";
import MotosByPatioScreen from "./motos-patio";
import AddYardScreen from "./add-yard";
import { navigate } from "expo-router/build/global-state/routing";
import { Feather, Fontisto } from "@expo/vector-icons";
import AddMotoScreen from "./add-moto";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tabs como contêiner principal
function BottomTabs() {
  return (
    <Tabs.Navigator screenOptions={{ tabBarActiveTintColor: "#008C30",
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
          tabBarIcon: ({color, size}) => <Feather name="home" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="motos"
        component={MotosScreem}
        options={{ headerTitle: "Todas as Motos",
          title: "Motos",
          tabBarIcon: ({color, size}) => <Fontisto name="motorcycle" size={size} color={color} />
         }}
      />
    </Tabs.Navigator>
  );
}

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="main" component={BottomTabs} options={{headerShown: false}}/>
      <Stack.Screen
        name="motos-patio"
        component={MotosByPatioScreen}
        options={{ headerShown: true, headerTitle: "Motos por Pátio",
            headerRight: () => <AddButton onPress={() => {
              navigate("/add-moto")
            }}/>
         }}
      />
      <Stack.Screen name="add-yard" component={AddYardScreen} options={{ headerTitle: "Adicionar Pátio" }} />
      <Stack.Screen name="add-moto" component={AddMotoScreen} options={{ headerTitle: "Adicionar Moto" }} />
    </Stack.Navigator>
  );
}