import axiosInstance from "./axiosInstance";

// 로그인 API >> ✅ 완료
export const loginApi = async (email, password, autoLogin) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
      autoLogin,
    });

    // 헤더에서 토큰 추출 (Bearer 제거)
    const authHeader = response.headers["authorization"];
    const token = authHeader?.replace("Bearer ", "");

    if (token) {
      localStorage.setItem("accessToken", token);
      // 사용자 정보가 response.data.data에 있다고 가정
      if (response.data.data) {
        const { accessToken, ...userInfo } = response.data.data;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    } else {
      console.error("No token received in response headers");
    }

    return response.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new Error("서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
    }
    console.error("로그인 에러:", error);
    throw error;
  }
};

// 이메일 인증요청 API
export const sendVerificationEmailApi = async (email, verificationType) => {
  // 요청 데이터 로깅
  console.log('Sending verification request:', {
    email,
    verificationType
  });

  try {
    const response = await axiosInstance.post(
      "/api/auth/send-verification-email",
      {
        email,
        verificationType
      },
      {
        withCredentials: true,
      }
    );

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      console.error('Server error details:', error.response.data);
    }
    throw error;
  }
};

// 이메일 인증 확인 API
export const verifyEmailApi = async (email, code, verificationType) => {
  try {
    const response = await axiosInstance.post("/api/auth/verify-email", {
      email,
      code,
      verificationType
    });

    return response.data;
  } catch (error) {
    console.error("이메일 인증 에러:", error);
    throw error;
  }
};

// 회원가입 API >> ✅ 완료
export const signupApi = async (
  email,
  password,
  firstName,
  lastName,
  companyName
) => {
  try {
    const response = await axiosInstance.post("/api/auth/signup", {
      email,
      password,
      firstName,
      lastName,
      companyName,
    });
    return response.data;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};

// 비밀번호 재설정 API >> ✅ 완료
export const resetPasswordApi = async (email, code, password) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/reset-password",
      {
        email,
        code,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("비밀번호 재설정 에러:", error);
    throw error;
  }
};

// 프로필조회 API >> ✅ 완료
export const getProfileApi = async () => {
  try {
    const response = await axiosInstance.get("/api/profile");
    // console.log("프로필 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("프로필 조회 에러:", error);
    throw error;
  }
};

// 프로필 수정 API >> ✅ 완료
export const updateProfileApi = async (profileData) => {
  try {
    const response = await axiosInstance.put("/api/profile", profileData);
    console.log("프로필 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("프로필 수정 에러:", error);
    throw error;
  }
};

// 구글 로그인 API
export const googleLoginApi = () => {
  window.location.href =
    "https://hoteltest.mygalleryshop.co.kr/oauth2/authorization/google";
};
