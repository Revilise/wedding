import { useLocalStorage } from '@lib/useLocalStorage';


export function useFeedback() {
    const { value, setValue } = useLocalStorage("feedback", false);

    return {
        isFeedbackSent: value,
        updateFeedback: setValue
    };
}
