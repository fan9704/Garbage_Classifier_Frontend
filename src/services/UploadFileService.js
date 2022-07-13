import axios from "axios";
class UploadFilesService {
    upload(path,file) {
        let formData = new FormData();
        formData.append("machinePictureDTO", file,"upload.png");
        let config = {
            method: 'patch',
            url: `http://127.0.0.1:8080/api/machine/picture/${path}`,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data : formData
        };
        return axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export default new UploadFilesService();