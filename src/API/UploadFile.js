import axiosInstance from "./Axios/AxiosConfig";
import URLS from "./Axios/URLS";


export default function UploadFile(file) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        axiosInstance.post(URLS.UploadFile, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);

        });
    });
}