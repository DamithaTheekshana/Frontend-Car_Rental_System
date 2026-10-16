const BASE_URL = "http://localhost:8080";

export const getAllVehicles = async () => {
    const response = await fetch(`${BASE_URL}/vehicle/allVehicles`);

    if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
    }

    return await response.json();
};