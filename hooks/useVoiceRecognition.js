import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import { useCallback, useEffect, useState } from "react";

export const useVoiceRecognation = () => {
  const [state, setState] = useState({
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    result: [],
    patialResult: [],
    isRecording: false,
  });

  const resetState = useCallback(() => {
    setState({
      recognized: "",
      pitch: "",
      error: "",
      end: "",
      started: "",
      result: [],
      patialResult: [],
      isRecording: false,
    });
  }, [setState]);

  const startRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.start("en-US");
    } catch (error) {
      console.log(error);
    }
  }, [resetState]);

  const stopRecognizing = useCallback(async () => {
    // resetState();
    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  }, [resetState]);

  const cancelRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.cancel();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const detroyRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.destroy();
    } catch (error) {
      console.log(error);
    }
    resetState();
  }, [resetState]);

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setState((prevState) => ({
        ...prevState,
        started: "starting",
        isRecording: true,
      }));
    };

    Voice.onSpeechRecognized = () => {
      setState((prevState) => ({
        ...prevState,
        started: "starting",
      }));
    };

    Voice.onSpeechEnd = () => {
      setState((prevState) => ({
        ...prevState,
        end: "ending",
        isRecording: false,
      }));
    };

    Voice.onSpeechError = (e) => {
      setState((prevState) => ({
        ...prevState,
        error: JSON.stringify(e.error),
        isRecording: false,
      }));
    };

    Voice.onSpeechResults = (e) => {
      setState((prevState) => ({
        ...prevState,
        result: e.value,
        isRecording: false,
      }));
    };

    Voice.onSpeechPartialResults = (e) => {
      setState((prevState) => ({
        ...prevState,
        patialResult: e.value,
        isRecording: false,
      }));
    };
    
    Voice.onSpeechVolumeChanged = (e) => {
      setState((prevState) => ({
        ...prevState,
        pitch: e.value,
        isRecording: false,
      }));
    };

    return () => {
      return () => {
        Voice.destroy()
          .then(() => {
            Voice.removeAllListeners();
          })
          .catch((error) => {
            console.error("Error destroying Voice:", error);
          });
      };
    };
  }, []);

  return {
    state,
    setState,
    resetState,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    detroyRecognizing,
  };
};
