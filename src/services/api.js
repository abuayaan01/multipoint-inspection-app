import axios from "axios";

// const base_url = "http://192.168.1.34:3000/api";
// const base_url = "https://multipoint.adfames.com/api";
const base_url = "https://staging.multinspect.ikshudigital.com/api";
// const base_url = "http://localhost:3000/api";
const headers = {
  "Content-Type": "application/json",
};

export { base_url };

export const RegisterReq = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(
      `${base_url}/register`,
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteContact = async (inspectionId,contactId) => {
  try {
    const response = await axios.delete(`${base_url}/inspection/${inspectionId}/contact/${contactId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function LoginReq(email, password) {
  try {
    const response = await axios.post(
      `${base_url}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export const CreateNewInspection = async (inspectionData) => {
  let data = JSON.stringify(inspectionData);

  let config = {
    method: "post",
    url: `${base_url}/inspection/details`,
    headers: headers,
    data: data,
  };

  return await axios.request(config);
};
export const getInspectionByUserIdReq = async (userId) => {
  try {
    const response = await axios.get(
      `${base_url}/inspection/details/${userId}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return error.message;
  }
};
export const deleteInspectionReq = async (inspectionId) => {
  try {
    const response = await axios.delete(
      `${base_url}/inspection/${inspectionId}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return error.message;
  }
};
export const getInspectionReq = async (inspectionId) => {
  try {
    const response = await axios.get(`${base_url}/property/${inspectionId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateDeatilsReq = async (inspectionId, updatedDeatils) => {
  let data = JSON.stringify(updatedDeatils);
  try {
    const response = await axios.put(
      `${base_url}/inspection/details/${inspectionId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateInvoiceReq = async (inspectionId, invoiceData) => {
  let data = JSON.stringify(invoiceData);

  try {
    const response = await axios.put(
      `${base_url}/inspection/invoice/${inspectionId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateSummaryReq = async (inspectionId, sumData) => {
  let data = JSON.stringify(sumData);

  try {
    const response = await axios.put(
      `${base_url}/inspection/summary/${inspectionId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateOverviewReq = async (inspectionId, sumData) => {
  let data = JSON.stringify(sumData);

  try {
    const response = await axios.put(
      `${base_url}/inspection/overview/${inspectionId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const getAllInspectionReq = async (inspectionId) => {
  try {
    const response = await axios.get(`${base_url}/inspection/${inspectionId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${base_url}/user/${userId}`, headers);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateProfileReq = async (userId, profileData) => {
  try {
    const response = await axios.put(
      `${base_url}/user/${userId}`,
      profileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const createEventsReq = async (userId, eventsData) => {
  try {
    const res = await axios.put(`${base_url}/events/${userId}`, eventsData, {
      headers: headers,
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const getEventsReq = async (userId) => {
  try {
    const res = await axios.get(`${base_url}/events/${userId}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const deleteEventsReq = async (userId, eventId) => {
  try {
    const res = await axios.delete(`${base_url}/events/${userId}/${eventId}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const updateEventReq = async (userId, eventId, updatedData) => {
  try {
    const res = await axios.put(
      `${base_url}/events/${userId}/${eventId}`,
      updatedData,
      {
        headers: headers,
      }
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const updatePropertyReq = async (
  inspectionId,
  propertyId,
  reqData,
  parentProperty,
  property,
  photos
) => {
  const formData = new FormData();
  const appendFormData = (key, value) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else {
      formData.append(key, value);
    }
  };
  if (property) {
    const data = reqData[property];
    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }
    formData.append("comments", data.comments);
    formData.append("other", data.other);
    formData.append("pageName", property);
    for (const key in data) {
      if (data.hasOwnProperty(key) && key !== "extra") {
        appendFormData(`${property}[${key}]`, data[key]);
      } else if (key == "extra") {
        data.extra.forEach((extraObject, index) => {
          formData.append(
            `${property}[${key}][${index}]`,
            JSON.stringify(extraObject)
          );
        });
      }
    }
  } else {
    formData.append("photos", []);
  }

  const url = `${base_url}/inspection/${inspectionId}/${parentProperty}/${propertyId}`;

  try {
    const res = await axios.put(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const deletePropertyReq = async (inspectionId, property, propertyId) => {
  try {
    const res = await axios.delete(
      `${base_url}/inspection/${inspectionId}/${property}/${propertyId}`
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const createPropertyReq = async (inspectionId, property) => {
  try {
    const res = await axios.post(
      `${base_url}/inspection/${inspectionId}/${property}`
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const getCommentsReq = async (section, subSection) => {
  try {
    const res = await axios.get(
      `${base_url}/comments/${section}/${subSection}`
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const updateAdminsReq = async (userId, info, data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  try {
    const res = await axios.put(
      `${base_url}/admin/${userId}/${info}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAdminReq = async (userId) => {
  try {
    const res = await axios.get(`${base_url}/admin/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getPdfDataReq = async (userId, inspectionId) => {
  try {
    const res = await axios.get(
      `${base_url}/${userId}/inspection/${inspectionId}/pdf`
    );
    // console.log(res.data.data)
    return res.data.data;
  } catch (error) {
    return error.message;
  }
};
