import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function fetchUserInfo(setLoading, setUserInfo) {
  setLoading(true);
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch("http://localhost:5000/users/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Server Error:", errorResponse);
      throw new Error(
        errorResponse.message || "Failed to fetch user information"
      );
    }

    const user = await response.json();
    setUserInfo(user);
  } catch (error) {
    console.error("Error fetching user information:", error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
