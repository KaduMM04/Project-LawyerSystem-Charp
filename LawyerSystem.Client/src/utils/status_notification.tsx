import { toast } from 'react-toastify';

const showError = (message) => {
        toast.error(
            message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,

        });
}

const showSuccess = (message) => {
    toast.success(
        message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}

const statusNotification = {
    showError,
    showSuccess
}

export type StatusNotificationType = typeof statusNotification;
export default statusNotification;