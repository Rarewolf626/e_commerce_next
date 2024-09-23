/* eslint-disable @typescript-eslint/no-explicit-any */

type ConvertFormDataProps = {
    payload: Record<string, any>
    file?: File
}
export const convertFormData = ({ payload, file }: ConvertFormDataProps) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload))
    if (file) {
        formData.append('photo', file);
    }
    return formData;
};