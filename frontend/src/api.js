import axios from "axios";
import { logout } from "./shared/utils/auth";

const apiClient = axios.create({
  baseURL: "http://localhost:5002/api",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// public routes

export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await apiClient.get(`/profile/${userId}`);
    return response.data;
  } catch (exception) {
    return { error: true, exception };
  }
};


// secure routes

export const updatePreferences = async (id, updates, token) => {
  try {
    const response = await fetch(`http://localhost:5002/api/profile/${id}/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Update failed");
    return data;
  } catch (error) {
    return { error: error.message };
  }
};


export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/invite", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/accept", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/reject", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const logoutUser = async (username) => {
  try {
    return await apiClient.post("/auth/logout", { username });
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const updateUserProfile = async (userId, updatedProfile, token) => {
  try {
    const response = await fetch(`http://localhost:5002/api/profile/${userId}`, { 
      method: 'PATCH',
      body: JSON.stringify(updatedProfile),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update profile');
    }
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    return { error: error.message };
  }
};


const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};


export const checkFriendStatus = async (userId, friendId) => {
  try {
    const response = await apiClient.get(`/friends/status/${userId}/${friendId}`);
    return response.data;
  } catch (exception) {
    return { error: true, exception };
  }
};

export const addFriend = async (userId, friendId) => {
  try {
    const response = await apiClient.post("/friends/add", { userId, friendId });
    return response.data;
  } catch (exception) {
    return { error: true, exception };
  }
};

export const savePersonalityTestResults = async (userId, testResults) => {
  try {
    const response = await apiClient.post(`/profile/${userId}/personality-test`, { 
      extraversion: testResults.Extraversion,
      agreeableness: testResults.Agreeableness,
      conscientiousness: testResults.Conscientiousness,
      neuroticism: testResults.Neuroticism,
      openness: testResults.Openness
    });
    return response.data;
  } catch (exception) {
    console.error("Error saving test results:", exception);
    return { error: true, exception };
  }
};

export const removeFriend = async (userId, friendId) => {
  try {
    return await apiClient.post("/friends/remove", { userId, friendId });
  } catch (exception) {
    return { error: true, exception };
  }
};

export const leaveReview = async (userId, profileId, reviewData) => {
  try {
    const response = await apiClient.post(`/profile/${profileId}/review`, {
      senderId: userId,
      rating: reviewData.rating,
      description: reviewData.description,
    });

    return response.data;
  } catch (exception) {
    console.error("Error leaving review:", exception);
    return { error: true, exception };
  }
};
