import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./index";
import Motos from "./motos";
import AddYard from "@/components/add-yard";

const Tabs = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="index" component={Home} 
      options={{headerRight: () => <AddYard />,
      headerTitle: "MottuSpot"
      }}
      />
      <Tabs.Screen name="motos" component={Motos} />
    </Tabs.Navigator>
  )
}
