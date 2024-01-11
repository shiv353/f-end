import axios from "axios";

const ServerRequest = async ({
    method = "get",
    url,
    data,

}) => {
    try {
        const result = await axios({
            method,
            url,
            data,
        });
        return result.data;
    } catch (error) {
        return {
            server_error: true,
            message: error.response.data.message || error.message
        };
    }
};

export default ServerRequest;
