interface FetchDataParams<T> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
  useToken?: boolean;
}

async function fetchData<TResponse, TData = any>({
  url,
  method,
  data,
  useToken = false,
}: FetchDataParams<TData>): Promise<TResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (useToken) {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("Token no encontrado");
    }
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "GET" && data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result: TResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}
